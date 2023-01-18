import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

import RestaurantItem from '../RestaurantItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const RestaurantApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    bannerList: [],
    restaurantsList: [],
    carouselApiStatus: carouselApiStatusConstants.initial,
    RestaurantApiStatus: RestaurantApiStatusConstants.initial,
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
  }

  componentDidMount() {
    this.getBannerData()
    this.getHomeData()
  }

  getBannerData = async () => {
    this.setState({carouselApiStatus: carouselApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const fetchedData = data.offers.map(eachItem => ({
        id: eachItem.id,
        imgUrl: eachItem.image_url,
      }))
      console.log(fetchedData)
      this.setState({
        bannerList: fetchedData,
        carouselApiStatus: carouselApiStatusConstants.success,
      })
    } else {
      this.setState({carouselApiStatus: carouselApiStatusConstants.failure})
    }
  }

  renderHomeBannerLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderHomeBanner = () => {
    const {bannerList} = this.state
    const settings = {
      dots: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      infinite: true,
      autoplaySpeed: 3000,
    }
    return (
      <>
        <Slider {...settings}>
          {bannerList.map(eachItem => (
            <img
              src={eachItem.imgUrl}
              alt="offer"
              className="banner-img"
              key={eachItem.id}
            />
          ))}
        </Slider>
      </>
    )
  }

  getHomeData = async () => {
    const {activePage} = this.state
    this.setState({
      RestaurantApiStatus: RestaurantApiStatusConstants.inProgress,
    })
    const {selectedSortByValue} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const fetchedData = data.restaurants.map(eachItem => ({
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        groupByTime: eachItem.group_by_time,
        onlineDelivery: eachItem.has_online_delivery,
        tableBooking: eachItem.has_table_booking,
        id: eachItem.id,
        imgUrl: eachItem.image_url,
        delivery: eachItem.is_delivering_now,
        location: eachItem.location,
        menu: eachItem.menu_type,
        name: eachItem.name,
        open: eachItem.opens_at,
        userRating: {
          rating: eachItem.user_rating.rating,
          ratingColor: eachItem.user_rating.rating_color,
          ratingText: eachItem.user_rating.rating_text,
          reviews: eachItem.user_rating.total_reviews,
        },
      }))
      console.log(fetchedData)
      this.setState({
        restaurantsList: fetchedData,
        RestaurantApiStatus: RestaurantApiStatusConstants.success,
      })
    } else {
      this.setState({RestaurantApiStatus: RestaurantApiStatusConstants.failure})
    }
  }

  renderRestaurantData = () => {
    const {restaurantsList} = this.state

    return (
      <ul className="restaurant-list">
        {restaurantsList.map(eachItem => (
          <RestaurantItem restaurantDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderRestaurantFailure = () => (
    <div>
      <h1 className="home-heading">No Restaurants Found!</h1>
      <p className="no-restaurant-para">Please come and check again later.</p>
    </div>
  )

  onClickPageLeft = () => {
    const {activePage} = this.state

    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getHomeData,
      )
    }
  }

  onClickPageRight = () => {
    const {activePage} = this.state

    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getHomeData,
      )
    }
  }

  renderHomePagination = () => {
    const {activePage} = this.state
    return (
      <div className="page-container">
        <button
          type="button"
          className="page-btn"
          onClick={this.onClickPageLeft}
        >
          <AiOutlineLeft className="arrow-icon" />
        </button>
        <p className="page-text">{activePage} of 4</p>
        <button
          type="button"
          className="page-btn"
          onClick={this.onClickPageRight}
        >
          <AiOutlineRight className="arrow-icon" />
        </button>
      </div>
    )
  }

  onChangeSort = event => {
    this.setState({selectedSortByValue: event.target.value}, this.getHomeData)
  }

  renderBannerApiStatus = () => {
    const {carouselApiStatus} = this.state
    switch (carouselApiStatus) {
      case carouselApiStatusConstants.success:
        return this.renderHomeBanner()
      case carouselApiStatusConstants.inProgress:
        return this.renderHomeBannerLoader()
      case carouselApiStatusConstants.failure:
        return this.renderRestaurantFailure()
      default:
        return null
    }
  }

  renderRestaurantApiStatus = () => {
    const {RestaurantApiStatus} = this.state
    switch (RestaurantApiStatus) {
      case RestaurantApiStatusConstants.success:
        return this.renderRestaurantData()
      case RestaurantApiStatusConstants.inProgress:
        return this.renderHomeBannerLoader()
      default:
        return null
    }
  }

  render() {
    const {selectedSortByValue} = this.state
    return (
      <div className="home-bg-container">
        <div className="banner-container">{this.renderBannerApiStatus()}</div>
        <div className="home-container">
          <div>
            <h1 className="home-heading">Popular Restaurants</h1>
            <p className="home-para">
              Select your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="sort-by-container">
            <MdSort color="#475569" />
            <p className="sort-by-text">Sort by </p>
            <select
              className="sort-by-select"
              onChange={this.onChangeSort}
              value={selectedSortByValue}
            >
              {sortByOptions.map(eachSort => (
                <option key={eachSort.id}>{eachSort.displayText}</option>
              ))}
            </select>
          </div>
        </div>
        <hr className="hr-line" />
        {this.renderRestaurantApiStatus()}
        {this.renderHomePagination()}
      </div>
    )
  }
}

export default Home
