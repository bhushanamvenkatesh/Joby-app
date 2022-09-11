import Cookies from 'js-cookie'
import {Component} from 'react'

import Header from '../Header'
import './index.css'

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

  renderJobDetails = () => {
    const {eachJobDetails} = this.state

    const {jobDetails} = eachJobDetails

    console.log(jobDetails.id)

    const formattedJobData = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: this.getLife(jobDetails.life_at_company),
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: this.getSkillsData(jobDetails.skills),
      title: jobDetails.title,
    }
    console.log('formatted', formattedJobData)

    return <div className="job-details">f</div>
  }

  getLife = life => ({description: life.description, imageUrl: life.image_url})

  getSkillsData = skills => {
    const skillarr = skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))
    return skillarr
  }

  renderSimilarJobDetails = () => {
    const {eachJobDetails} = this.state

    const {similarJobs} = eachJobDetails
    console.log(similarJobs)
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">
          {this.renderJobDetails()}
          {this.renderSimilarJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetails
