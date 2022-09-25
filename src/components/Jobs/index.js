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
    jobfetchStatus: false,
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
    const {employmentType, minimumPackage, searchInput} = this.state
    const token = Cookies.get('jwt_token')
    console.log('clicked')
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

    this.setState({jobsData: formattedJobsData, jobfetchStatus: false})

    if (data.status_code === 400) {
      this.onJobsFetchFailure()
    }
  }

  onJobsFetchFailure = () => {
    console.log('fails')
    this.setState({jobfetchStatus: true})
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
    } else if (response.ok !== true) {
      // (data.status_code === 400) {
      this.onProfileFetchFailure()
    }
  }

  onProfileFetchFailure = () => {
    this.setState({profileStatus: profileConstants.fail})
  }

  getFormattedDetails = profileDetails => ({
    profileImageUrl: profileDetails.profile_image_url,
    name: profileDetails.name,
    shortBio: profileDetails.short_bio,
  })

  renderLoader = () => (
    <div className="loader" /* testid="loader" */>
      <Loader type="TailSpin" color="#2f2f2f" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {profileDetails} = this.state

    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-dp" />
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

    this.setState({employmentType: array.join(',')}, this.getJobsData)
  }

  onChangePackage = sal => {
    this.setState({minimumPackage: sal}, this.getJobsData)
  }

  renderFilterSection = () => (
    <div className="filter-section">
      {this.getProfile()}

      <hr className="h-line" />
      <div className="type-of-employement">
        <h1>Type of Employment</h1>
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
          <h1>Salary Range</h1>
          <ul className="job-category-list">
            {salaryRangesList.map(eachItem => (
              <SalaryRange
                eachItem={eachItem}
                key={eachItem.salaryRangeId}
                onChangePackage={this.onChangePackage}
              />
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
    this.getJobsData()
  }

  renderJobsSection = () => {
    const {jobsData} = this.state

    const renderNoJobs = () => (
      <div className="job-failure-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
        />
      </div>
    )

    const renderList = () => (
      <ul className="jobs-list">
        {jobsData.map(eachItem => (
          <EachJobRoute eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )

    return (
      <div className="jobs-results">
        <div className="search-container">
          <input
            type="search"
            className="input-search"
            placeholder="Search"
            onChange={this.onClickSearchInput}
          />
          <div>
            <button
              onClick={this.onClickSearchIcon}
              className="search-btn"
              // testid="searchButton"
              type="button"
            >
              <BsSearch className="search-icon" />
            </button>
            {/* <BsSearch
              className="search-icon"
              onClick={this.onClickSearchIcon}
            /> */}
          </div>
          {}
        </div>
        {jobsData.length === 0 ? renderNoJobs() : renderList()}
      </div>
    )
  }

  renderJobsSectionFailure = () => (
    <div className="job-failure-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className=""
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry" type="button" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  render() {
    const {jobfetchStatus} = this.state
    return (
      <div>
        <Header />
        <div className="filter-jobs-section">
          {this.renderFilterSection()}
          {jobfetchStatus
            ? this.renderJobsSectionFailure()
            : this.renderJobsSection()}
        </div>
      </div>
    )
  }
}

export default Jobs
