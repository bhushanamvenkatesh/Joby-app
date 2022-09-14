import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const onClickFindjobs = () => history.replace('/jobs')

  return (
    <>
      <Header />
      <div className="home-container">
        <div>
          <h1 className="heading-home">Find The Job That Fits Your Life</h1>
          <p>
            Millions of People are searching for jobs, salary, information
            ,company reviews.Find the job that fits your abilities and
            potentials.
          </p>

          <Link to="/jobs">
            <button
              type="button"
              onClick={onClickFindjobs}
              className="find-jobs-button"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
