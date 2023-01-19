import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

import './index.css'

class RestaurantFoodItem extends Component {
  state = {quantity: 0}

  componentDidMount() {
    this.findTheCartItemInList()
  }

  findTheCartItemInList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodDetails} = this.props
    const cartItem = cartData.filter(each => each.id === foodDetails.id)
    // console.log(cartItem)
    if (cartItem.length !== 0) {
      // console.log(cartItem)
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity})
      }
    }
  }

  onClickAddItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodDetails} = this.props
    const cartItem = {...foodDetails, quantity: 1}
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    this.findTheCartItemInList()
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodDetails} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== foodDetails.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  onClickMinus = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))

    const {foodDetails} = this.props

    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodDetails.id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))

    this.setState(prevState => ({quantity: prevState.quantity - 1}))
    this.findTheCartItemInList()
  }

  onClickAdd = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    console.log(cartData)
    const {foodDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodDetails.id) {
        // console.log('found')
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    this.findTheCartItemInList()
  }

  render() {
    const {quantity} = this.state
    const {foodDetails} = this.props
    const {imageUrl, name, cost, rating} = foodDetails

    return (
      <li className="food-list-item">
        <img src={imageUrl} alt="food-item" className="food-logo" />
        <div className="food-details">
          <h1 className="food-heading">{name}</h1>
          <p className="food-cost">
            <span className="food-icon">
              <BiRupee />
            </span>
            {cost}.00
          </p>
          <p className="food-cost">
            <span className="food-icon">
              <AiFillStar color="#FFCC00" className="food-rating-icon" />
            </span>{' '}
            {rating}
          </p>
          {quantity === 0 ? (
            <button
              type="button"
              className="add-btn"
              onClick={this.onClickAddItem}
            >
              ADD
            </button>
          ) : (
            <div className="add-item-container">
              <button
                type="button"
                className="icon-btn-dash"
                onClick={this.onClickMinus}
              >
                <BsDashSquare />
              </button>
              <p className="add-item-text">{quantity}</p>
              <button
                type="button"
                className="icon-btn-plus"
                onClick={this.onClickAdd}
              >
                <BsPlusSquare />
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default RestaurantFoodItem
