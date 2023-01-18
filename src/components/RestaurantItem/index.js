import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {id, imgUrl, name, cuisine, userRating} = restaurantDetails
  const {rating, reviews} = userRating

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-links">
      <li className="restaurant-list-item">
        <img src={imgUrl} alt="restaurant" className="restaurant-img" />
        <div className="restaurant-list-details">
          <h1 className="restaurant-heading">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="rating-container">
            <AiFillStar color="#FFCC00" />
            <p className="rating">{rating}</p>
            <p className="reviews">({reviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
