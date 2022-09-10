import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Employment from '../Employment'
import SalaryRange from '../SalaryRange'
import EachJobRoute from '../EachJobRoute'

import Header from '../Header'

const sampleData = {
  jobs: [
    {
      companyLogoUrl:
        'https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png',
      employmentType: 'Full Time',
      id: 'd6019453-f864-4a2f-8230-6a9642a59466',
      jobDescription:
        'We’re in search of a Back-End Software Engineer that specializes in server-side components. In this role, you’ll primarily work in NodeJs, SQL Lite, Python, AWS and GO and will bring a depth of knowledge on basic algorithms and data structures. As a Back-End Engineer, you might be architecting new features for our customers.',
      location: 'Bangalore',
      packagePerAnnum: '21 LPA',
      rating: 4,
      title: 'Backend Engineer',
    },
  ],
  total: 25,
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileConstants = {
  success: 'SUCCESS',
  fail: 'FAIL',
  initial: 'INITIAL',
}
const array = []

class Jobs extends Component {
  state = {
    jobsData: [],
    profileDetails: {},

    profileStatus: profileConstants.initial,
    searchInput: '',
    employmentType: '',
    minimumPackage: '',
  }

  componentDidMount() {
    this.getData()
    this.getJobsData()
  }

  getJobsData = async () => {
    const {employmentType, minimumPackage, searchInput, jobsData} = this.state
    const token = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const jobsObj = data.jobs

    const formattedJobsData = jobsObj.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({jobsData: formattedJobsData})

    if (data.status_code === 400) {
      this.onJobsFetchFailure()
    }
  }

  onJobsFetchFailure = () => {
    console.log('fails')
  }

  getData = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const formattedProfile = {
        profileDetails: this.getFormattedDetails(data.profile_details),
      }

      this.setState({
        profileDetails: formattedProfile.profileDetails,
        profileStatus: profileConstants.success,
      })
    }

    if (data.status_code === 400) {
      this.onFailureFetch()
    }
  }

  onFailureFetch = () => {
    this.setState({profileStatus: profileConstants.fail})
  }

  getFormattedDetails = profileDetails => ({
    profileImageUrl: profileDetails.profile_image_url,
    name: profileDetails.name,
    shortBio: profileDetails.short_bio,
  })

  renderLoader = () => (
    <div className="loader">
      <Loader type="TailSpin" color="#2f2f2f" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {profileDetails} = this.state

    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt={name} className="profile-dp" />
        <h1 className="profile-name">{name}</h1>
        <p className="role">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="loader">
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  onClickRetry = () => <Redirect to="/jobs" />

  getProfile = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileConstants.success:
        return this.renderProfile()
      case profileConstants.fail:
        return this.renderProfileFailure()
      case profileConstants.initial:
        return this.renderLoader()

      default:
        return null
    }
  }

  onChangeJobType = typeId => {
    array.push(typeId)

    this.setState((prevState, props) => {
      console.log(array)
      return {
        employmentType: array.join(','),
      }
    })
  }

  renderFilterSection = () => (
    <div className="filter-section">
      {this.getProfile()}

      <hr className="h-line" />
      <div className="type-of-employement">
        <p>Type of Employment</p>
        <ul className="job-category-list">
          {employmentTypesList.map(eachItem => (
            <Employment
              eachItem={eachItem}
              key={eachItem.employmentTypeId}
              onChangeJobType={this.onChangeJobType}
            />
          ))}
        </ul>
        <hr className="h-line" />
        <div>
          <p>Salary Range</p>
          <ul className="job-category-list">
            {salaryRangesList.map(eachItem => (
              <SalaryRange eachItem={eachItem} key={eachItem.salaryRangeId} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  onClickSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    console.log('search-icon-clicked')
  }

  renderJobsSection = () => {
    const {jobsData} = this.state
    console.log(jobsData)

    return (
      <div className="jobs-results">
        <div className="search-container">
          <input
            type="search"
            className="input-search"
            placeholder="Search"
            onChange={this.onClickSearchInput}
          />
          <BsSearch className="search-icon" onClick={this.onClickSearchIcon} />
        </div>
        <ul className="jobs-list">
          {jobsData.map(eachItem => (
            <EachJobRoute eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>

        <p>jobs result</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="filter-jobs-section">
          {this.renderFilterSection()}
          {this.renderJobsSection()}
        </div>
      </div>
    )
  }
}

export default Jobs
