import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {CgProfile} from 'react-icons/cg'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Employment from '../Employment'
import SalaryRange from '../SalaryRange'
import EachJobRoute from '../EachJobRoute'

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

class Jobs extends Component {
  state = {jobsData: [], profileDetails: {}}

  componentDidMount() {
    this.getData()
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
    console.log(data)

    const formattedProfile = {
      profileDetails: this.getFormattedDetails(data.profile_details),
    }
    console.log(formattedProfile)
    this.setState({profileDetails: formattedProfile})
  }

  getFormattedDetails = profileDetails => ({
    profileImageUrl: profileDetails.profile_image_url,
    name: profileDetails.name,
    shortBio: profileDetails.short_bio,
  })

  renderFilterSection = () => (
    <div className="filter-section">
      <div className="profile-container">
        <CgProfile className="profile-dp" />
        <h1 className="profile-name">Rahul Attuluri</h1>
        <p className="role">Lead software Developer ML</p>
      </div>
      <hr className="h-line" />
      <div className="type-of-employement">
        <p>Type of Employment</p>
        <ul className="job-category-list">
          {employmentTypesList.map(eachItem => (
            <Employment eachItem={eachItem} key={eachItem.employmentTypeId} />
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

  renderJobsSection = () => {
    const {jobsData} = this.state

    return (
      <div className="jobs-results">
        <div className="search-container">
          <input type="search" className="input-search" placeholder="Search" />
          <BsSearch className="search-icon" />
        </div>
        <ul className="jobs-list">
          {sampleData.jobs.map(eachItem => (
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
