import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiFillStar, AiOutlineMail} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'

import Header from '../Header'
import './index.css'

const sampleJob = {
  companyLogoUrl:
    'https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png',
  companyWebsiteUrl: 'https://about.netflix.com/en',
  employmentType: 'Internship',
  id: 'bb95e51b-b1b2-4d97-bee4-1d5ec2b96751',
  jobDescription: 'description',
  lifeAtCompany: {
    description:
      'Our core philosophy is people over process. Our cu…us common ground. We want to entertain the world.',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png',
  },

  location: 'Delhi',
  packagePerAnnum: '10 LPA',
  rating: 4,
  skills: [
    {
      name: 'Docker',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png',
    },
    {
      name: 'Kubernetes',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/jobby-app/kubernetes-img.png',
    },
    {
      name: 'Terraform',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/jobby-app/terraform-img.png',
    },
    {
      name: 'Jenkins',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/jobby-app/jenkins-img.png',
    },
    {
      name: 'GO',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/go-img.png',
    },
    {
      name: 'Ansible',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/jobby-app/ansible-img.png',
    },
  ],

  title: 'Devops Engineer',
}

class JobDetails extends Component {
  state = {eachJobDetails: {}}

  componentDidMount() {
    console.log('called')

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

    if (response.ok === true) {
      this.onClickSuccess(data)
    }
  }

  onClickSuccess = data => {
    const formattedData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }

    this.setState({eachJobDetails: formattedData})
  }

  /* getFormattedJobsDetails = details => {
     const formattedJobData = details.map(each => ({
      id: each.id,
      title: each.title,
      companyLogoUrl: each.company_logo_url,
      companyWebsiteUrl: each.company_website_url,
    }))
    return formattedJobData 
    console.log(details)
  }

  getFormattedSimilarJobs = details => {
    const formattedSimilarJobs = details.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      ratin: each.rating,
      title: each.title,
    }))
    return formattedSimilarJobs 
    console.log()
  } */

  getSkillsList = () => {
    const lista = sampleJob.skills
    // console.log('skills', lista)
    const item = lista.map(each => (
      <li className="each-skill">
        <img src={each.imageUrl} alt={each.name} className="skill-image" />
        <h1 className="skill-name">{each.name}</h1>
      </li>
    ))
    return item
  }

  renderJobDetails = () => {
    const {eachJobDetails} = this.state

    const {jobDetails} = eachJobDetails

    // console.log(jobDetails)

    // const formattedJobData = {
    //   companyLogoUrl: jobDetails.company_logo_url,
    //   companyWebsiteUrl: jobDetails.company_website_url,
    //   employmentType: jobDetails.employment_type,
    //   id: jobDetails.id,
    //   jobDescription: jobDetails.job_description,
    //   lifeAtCompany: this.getLife(jobDetails.life_at_company),
    //   location: jobDetails.location,
    //   packagePerAnnum: jobDetails.package_per_annum,
    //   rating: jobDetails.rating,
    //   skills: this.getSkillsData(jobDetails.skills),
    //   title: jobDetails.title,
    // }
    // console.log('formatted', formattedJobData)

    return (
      <div className="job-details">
        <div className="each-job-descriptions">
          <div className="logo-container">
            <img
              src={sampleJob.companyLogoUrl}
              alt={sampleJob.title}
              className="company-logo"
            />
            <div className="log-title-container">
              <h1>{sampleJob.title}</h1>
              <div className="display-row">
                <AiFillStar className="star" />
                <p>{sampleJob.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package">
            <div className="location-package-container">
              <div className="row">
                <HiLocationMarker className="location-icon" />
                <p>{sampleJob.location}</p>
              </div>
              <div className="row">
                <AiOutlineMail className="job-icon" />
                <p className="employment-type">{sampleJob.employmentType}</p>
              </div>
            </div>

            <p className="package">{sampleJob.packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <h1>Description</h1>
          <p className="description">{sampleJob.jobDescription}</p>
          <div>
            <h1>skills</h1>
            <ul className="skills-list">{this.getSkillsList()}</ul>
          </div>
          <div>
            <h1>Life at company</h1>
            <div className="life-at-company">
              <p>{sampleJob.lifeAtCompany.description}</p>
              <img src={sampleJob.lifeAtCompany.imageUrl} alt="" className="" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  //   getLife = life => ({description: life.description, imageUrl: life.image_url})

  //   getSkillsData = skills => {
  //     const skillarr = skills.map(each => ({
  //       name: each.name,
  //       imageUrl: each.image_url,
  //     }))
  //     return skillarr
  //   }

  getSimilarJobs = () => {
    const {eachJobDetails} = this.state

    const {similarJobs} = {...eachJobDetails}
    console.log(similarJobs)

    return <li>formattedData.title</li>
  }

  renderSimilarJobDetails = () => (
    <div className="job-details">
      <ul className="similar-jobs-list">{this.getSimilarJobs()}</ul>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">
          {this.renderJobDetails()}
          <h1 className="similar-job-heading">Similar Jobs</h1>
          {this.renderSimilarJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetails
