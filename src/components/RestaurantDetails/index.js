import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import RestaurantFoodItem from '../RestaurantFoodItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetailsList: [],
    foodList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      POST: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imgUrl: data.image_url,
        items: data.items_count,
        location: data.location,
        name: data.name,
        open: data.opens_at,
        rating: data.rating,
        reviews: data.reviews_count,
      }

      const foodData = data.food_items.map(eachItem => ({
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        rating: eachItem.rating,
      }))

      console.log(fetchedData)

      this.setState({
        restaurantDetailsList: fetchedData,
        foodList: foodData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRestaurantDetails = () => {
    const {restaurantDetailsList, foodList} = this.state
    const {
      imgUrl,
      name,
      cuisine,
      location,
      rating,
      reviews,
      costForTwo,
    } = restaurantDetailsList
    console.log(imgUrl)

    return (
      <>
        <div className="restaurant-banner-container">
          <div className="restaurant-banner-details">
            <img src={imgUrl} alt="restaurant" className="restaurant-logo" />
            <div className="restaurant-details">
              <h1 className="rt-heading">{name}</h1>
              <p className="rt-para">{cuisine}</p>
              <p className="rt-para">{location}</p>
              <div className="rating-cost">
                <div>
                  <p className="rt-rating">
                    {' '}
                    <span>
                      <AiFillStar className="rt-icon" />
                    </span>{' '}
                    {rating}
                  </p>
                  <p className="rt-reviews"> {reviews}+ Ratings</p>
                </div>
                <div>
                  <hr className="vertical-line" />
                </div>
                <div>
                  <p className="rt-rating">
                    {' '}
                    <span>
                      <BiRupee className="rt-icon" />
                    </span>
                    {costForTwo}
                  </p>
                  <p className="rt-reviews">Cost for Two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="restaurant-food-list">
          {foodList.map(eachItem => (
            <RestaurantFoodItem foodDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderRestaurantLoader = () => (
    <div className="restaurant-loader-container">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantFailure = () => (
    <div className="restaurant-failure-container">
      <h1 className="restaurant-failure-heading">
        Restaurant is currently closed!
      </h1>
      <p className="restaurant-failure-para">
        Please come and check again later.
      </p>
    </div>
  )

  renderRestaurantApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      case apiStatusConstants.inProgress:
        return this.renderRestaurantLoader()
      case apiStatusConstants.failure:
        return this.renderRestaurantFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant-detail-container">
        {this.renderRestaurantApiStatus()}
      </div>
    )
  }
}
export default RestaurantDetails
