import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dpjowvn70/image/upload/v1674207460/erroring_1_1x_wqsbul.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/" className="not-found-links">
        <button type="button" className="not-found-btn" onClick={onClickHome}>
          Home Page
        </button>
      </Link>
    </div>
  )
}

export default NotFound
