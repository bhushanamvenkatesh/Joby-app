import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="header-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
      alt="website-logo"
      className="website-logo"
    />
    <ul className="header-list">
      <Link to="/">
        <li className="list-item">Home</li>
      </Link>
      <Link to="/jobs">
        <li className="list-item">Jobs</li>
      </Link>
    </ul>
    <button className="logout-button">Logout</button>
  </nav>
)

export default Header
