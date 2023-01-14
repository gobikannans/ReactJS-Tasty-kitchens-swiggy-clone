import {Component} from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {bannerList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBannerData()
  }

  getBannerData = async () => {
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
      this.setState({bannerList: fetchedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

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
      <div className="banner-container">
        <Slider {...settings}>
          {bannerList.map(eachItem => (
            <img src={eachItem.imgUrl} alt="offer" className="banner-img" />
          ))}
        </Slider>
      </div>
    )
  }

  render() {
    return <div className="home-bg-container">{this.renderHomeBanner()}</div>
  }
}

export default Home
