import {Link} from 'react-router-dom'
import './index.css'
import {AiFillStar, AiOutlineMail} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'

const EachJobRoute = props => {
  const {eachItem} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem

  return (
    <Link to={`/jobs/${id}`} className="link-style">
      <li className="each-job-descriptions">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="log-title-container">
            <h1>{title}</h1>
            <div className="display-row">
              <AiFillStar className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package">
          <div className="location-package-container">
            <div className="row">
              <HiLocationMarker className="location-icon" />
              <p>{location}</p>
            </div>
            <div className="row">
              <AiOutlineMail className="job-icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>

          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1>Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default EachJobRoute
