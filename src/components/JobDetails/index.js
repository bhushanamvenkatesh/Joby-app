import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {GrShare} from 'react-icons/gr'
import {AiFillStar, AiOutlineMail} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'

// const sampleJob = {
//   companyLogoUrl:
//     'https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png',
//   companyWebsiteUrl: 'https://about.netflix.com/en',
//   employmentType: 'Internship',
//   id: 'bb95e51b-b1b2-4d97-bee4-1d5ec2b96751',
//   jobDescription: 'description',
//   lifeAtCompany: {
//     description:
//       'Our core philosophy is people over process. Our cu…us common ground. We want to entertain the world.',
//     imageUrl:
//       'https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png',
//   },

//   location: 'Delhi',
//   packagePerAnnum: '10 LPA',
//   rating: 4,
//   skills: [
//     {
//       name: 'Docker',
//       imageUrl:
//         'https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png',
//     },
//     {
//       name: 'Kubernetes',
//       imageUrl:
//         'https://assets.ccbp.in/frontend/react-js/jobby-app/kubernetes-img.png',
//     },
//     {
//       name: 'Terraform',
//       imageUrl:
//         'https://assets.ccbp.in/frontend/react-js/jobby-app/terraform-img.png',
//     },
//     {
//       name: 'Jenkins',
//       imageUrl:
//         'https://assets.ccbp.in/frontend/react-js/jobby-app/jenkins-img.png',
//     },
//     {
//       name: 'GO',
//       imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/go-img.png',
//     },
//     {
//       name: 'Ansible',
//       imageUrl:
//         'https://assets.ccbp.in/frontend/react-js/jobby-app/ansible-img.png',
//     },
//   ],

//   title: 'Devops Engineer',
// }

const jobDetailsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    eachjobDetails: {},
    jobDetailsStatus: jobDetailsConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const formattedData = {
        jobDetails: data.job_details,
        similarjobs: data.similar_jobs,
      }
      this.setState({
        // isLoading: false,
        eachjobDetails: formattedData,
        jobDetailsStatus: jobDetailsConstants.success,
      })
    } else {
      this.setState({jobDetailsStatus: jobDetailsConstants.failure})
    }
  }

  renderLoader = () => (
    <div>
      <Loader
        testid="loader"
        type="TailSpin"
        color="#2f2f"
        height={50}
        width={50}
      />
    </div>
  )

  getSkillsData = skills => {
    const skillArray = skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))
    return skillArray
  }

  getLifeAtCompany = life => ({
    description: life.description,
    imageUrl: life.image_url,
  })

  getSkillsList = formattedJobData => {
    const lista = formattedJobData.skills
    console.log(formattedJobData.skills)

    const item = lista.map(each => (
      <li className="each-skill" key={each.id}>
        <img src={each.imageUrl} alt={each.name} className="skill-image" />
        <h1 className="skill-name">{each.name}</h1>
      </li>
    ))
    return item
  }

  getJobContainer = each => {
    const {
      companyLogoUrl,
      employmentType,
      id,
      location,
      jobDescription,
      rating,
      title,
    } = each

    return (
      <li className="simi-container" key={id}>
        <div className="logo-title">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="logo-image"
          />
          <div>
            <h1 className="similar-title">{title}</h1>

            <div className="rating-star">
              <AiFillStar className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <div className="location-type">
          <div className="row">
            <HiLocationMarker className="location-icon" />
            <p>{location}</p>
          </div>

          <div className="row">
            <AiOutlineMail className="job-icon" />
            <p className="employment-type">{employmentType}</p>
          </div>
        </div>
      </li>
    )
  }

  getSimilarJobsList = similar => {
    console.log(similar)
    const formattedSimilardata = similar.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
      jobDescription: eachItem.job_description,
    }))
    //  console.log(formattedSimilardata)
    return (
      <div>
        <ul className="similar-jobs-list">
          {formattedSimilardata.map(eachItem => this.getJobContainer(eachItem))}
        </ul>
      </div>
    )
  }

  renderJobData = () => {
    const {eachjobDetails} = this.state
    const {jobDetails, similarjobs} = eachjobDetails

    const formattedJobData = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: this.getLifeAtCompany(jobDetails.life_at_company),
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: this.getSkillsData(jobDetails.skills),
      title: jobDetails.title,
    }

    return (
      <>
        <div className="job-details">
          <div className="each-job-descriptions">
            <div className="logo-container">
              <img
                src={formattedJobData.companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="log-title-container">
                <h1>{formattedJobData.title}</h1>
                <div className="display-row">
                  <AiFillStar className="star" />
                  <p>{formattedJobData.rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package">
              <div className="location-package-container">
                <div className="row">
                  <HiLocationMarker className="location-icon" />
                  <p>{formattedJobData.location}</p>
                </div>
                <div className="row">
                  <AiOutlineMail className="job-icon" />
                  <p className="employment-type">
                    {formattedJobData.employmentType}
                  </p>
                </div>
              </div>

              <p className="package">{formattedJobData.packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="visit-description">
              <h1>Description</h1>
              <div>
                <a href={formattedJobData.companyWebsiteUrl} className="visit">
                  Visit
                </a>
                <GrShare />
              </div>
            </div>

            <p className="description">{formattedJobData.jobDescription}</p>
            <div>
              <h1>skills</h1>
              <ul className="skills-list">
                {this.getSkillsList(formattedJobData)}
              </ul>
            </div>
            <div>
              <h1>Life at company</h1>
              <div className="life-at-company">
                <p>{formattedJobData.lifeAtCompany.description}</p>
                <img
                  src={formattedJobData.lifeAtCompany.imageUrl}
                  alt="life at company"
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <div>
          <ul>{this.getSimilarJobsList(similarjobs)}</ul>
        </div>
      </>
    )
  }

  onClickRetryJobDetails = () => {
    const {history} = this.props
    console.log('clicked')
    return <Redirect component={JobDetails} />
  }

  renderJobDetailsFailure = () => (
    <div className="JobDetails-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="not found"
      />
      <h1>Oops something went wrong</h1>
      <p>we can not seem to find the page you are looking for</p>
      <button
        className="retry"
        type="button"
        onClick={this.onClickRetryJobDetails}
      >
        Retry
      </button>
    </div>
  )
  //  {isLoading ? this.renderLoader() : this.renderJobData()}

  renderResult = () => {
    const {jobDetailsStatus} = this.state
    switch (jobDetailsStatus) {
      case jobDetailsConstants.initial:
        return this.renderLoader()

      case jobDetailsConstants.success:
        return this.renderJobData()

      case jobDetailsConstants.failure:
        return this.renderJobDetailsFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderResult()}</div>
      </>
    )
  }
}

export default JobDetails
