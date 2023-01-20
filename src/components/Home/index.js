import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'

import Counter from '../Counter'
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

const restaurantApiStatusConstants = {
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
    restaurantApiStatus: restaurantApiStatusConstants.initial,
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
    searchInput: '',
    paginationStatus: false,
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
      this.setState({
        carouselApiStatus: carouselApiStatusConstants.failure,
      })
    }
  }

  renderHomeBannerLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantDataLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
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
      <Slider {...settings}>
        {bannerList.map(eachItem => (
          <img
            src={eachItem.imgUrl}
            alt="offer"
            key={eachItem.id}
            className="banner-img"
          />
        ))}
      </Slider>
    )
  }

  getHomeData = async () => {
    this.setState({
      restaurantApiStatus: restaurantApiStatusConstants.inProgress,
    })
    const {activePage, searchInput, selectedSortByValue} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const limit = 9
    const offset = (activePage - 1) * limit

    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

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
        restaurantApiStatus: restaurantApiStatusConstants.success,
        paginationStatus: true,
      })
    } else {
      this.setState({
        restaurantApiStatus: restaurantApiStatusConstants.failure,
        paginationStatus: false,
      })
    }
  }

  onChangeSort = event => {
    this.setState({selectedSortByValue: event.target.value}, this.getHomeData)
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeySearch = event => {
    if (event.key === 'Enter') {
      this.getHomeData()
    }
  }

  onClickSearch = () => {
    this.getHomeData()
  }

  getActivePage = page => {
    this.setState({activePage: page}, this.getHomeData)
  }

  renderRestaurantFailure = () => (
    <div className="restaurant-failure-container">
      <img
        src="https://res.cloudinary.com/dpjowvn70/image/upload/v1674120441/cooking_1_1x_kjca9t.png"
        alt="no-restaurant"
      />
      <h1 className="no-results-heading">Restaurants Not Found!</h1>
      <p className="no-results-para">
        Try different keywords or check again later.
      </p>
    </div>
  )

  renderRestaurantData = () => {
    const {restaurantsList} = this.state

    return (
      <>
        <ul className="restaurant-list">
          {restaurantsList.map(eachItem => (
            <RestaurantItem restaurantDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
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
    const {restaurantApiStatus} = this.state
    switch (restaurantApiStatus) {
      case restaurantApiStatusConstants.success:
        return this.renderRestaurantData()
      case restaurantApiStatusConstants.inProgress:
        return this.renderRestaurantDataLoader()
      case restaurantApiStatusConstants.failure:
        return this.renderRestaurantFailure()
      default:
        return null
    }
  }

  render() {
    const {selectedSortByValue, searchInput, paginationStatus} = this.state
    return (
      <div className="home-bg-container">
        <div className="banner-container">{this.renderBannerApiStatus()}</div>
        <div className="home-container">
          <h1 className="home-heading">Popular Restaurants</h1>
          <p className="home-para">
            Select your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="search-sort-container">
            <div className="search-container">
              <>
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={this.onChangeSearch}
                  onKeyDown={this.onKeySearch}
                  className="search-input"
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearch}
                >
                  <AiOutlineSearch />
                </button>
              </>
            </div>

            <div className="sort-by-container">
              <MdSort color="#475569" className="sort-icon" />
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
        </div>
        <hr className="hr-line" />
        {this.renderRestaurantApiStatus()}
        {paginationStatus ? (
          <Counter pageChangeFunction={this.getActivePage} />
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Home
