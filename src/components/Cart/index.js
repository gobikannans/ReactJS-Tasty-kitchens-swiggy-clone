import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BiRupee} from 'react-icons/bi'
import {AiFillCheckCircle} from 'react-icons/ai'
import CartItem from '../CartItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  cartSuccess: 'SUCCESS',
  cartNoView: 'FAILURE',
  cartLoader: 'INPROGRESS',
  paymentSuccess: 'PAYSUCCESS',
}

class Cart extends Component {
  state = {cartList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCartData()
  }

  getCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      this.setState({apiStatus: apiStatusConstants.cartNoView})
    } else {
      const cartItems = cartData.map(eachItem => ({
        cost: eachItem.cost,
        id: eachItem.id,
        imageUrl: eachItem.imageUrl,
        name: eachItem.name,
        quantity: eachItem.quantity,
      }))
      this.setState({
        cartList: cartItems,
        apiStatus: apiStatusConstants.cartSuccess,
      })
    }
  }

  renderCartLoader = () => (
    <div className="cart-loader-container">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  onClickToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  removeCartItem = updatedData => {
    const updatedCartData = updatedData.filter(
      eachItem => eachItem.quantity > 0,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartData()
  }

  onCartIncrement = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartData()
  }

  onCartDecrement = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    this.removeCartItem(updatedCartData)
  }

  calculateTotalAmount = () => {
    const {cartList} = this.state
    const amount = cartList.map(eachItem => eachItem.quantity * eachItem.cost)
    const totalAmount = amount.reduce((a, b) => a + b)
    return totalAmount
  }

  onPlaceOrder = () => {
    localStorage.clear('cartData')
    this.setState({apiStatus: apiStatusConstants.paymentSuccess})
  }

  renderPaymentSuccessView = () => (
    <div className="no-order-container">
      <AiFillCheckCircle className="check-icon" />
      <h1 className="payment-heading">Payment Successful</h1>
      <p className="no-order-para">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>
      <Link to="/" className="cart-links">
        <button type="button" className="pay-btn" onClick={this.onClickToHome}>
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderEmptyCartView = () => (
    <div className="no-order-container">
      <img
        src="https://res.cloudinary.com/dpjowvn70/image/upload/v1674120441/cooking_1_1x_kjca9t.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1 className="no-order-heading">No Order Yet!</h1>
      <p className="no-order-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="cart-links">
        <button
          type="button"
          className="no-order-btn"
          onClick={this.onClickToHome}
        >
          Order Now
        </button>
      </Link>
    </div>
  )

  renderCartItems = () => {
    const {cartList} = this.state
    const totalAmount = this.calculateTotalAmount()

    return (
      <div className="cart-container">
        <div className="cart-heading-container">
          <p className="cart-heading">Item</p>
          <p className="cart-heading">Quantity</p>
          <p className="cart-heading">Price</p>
        </div>
        <ul className="cart-item-list">
          {cartList.map(eachItem => (
            <CartItem
              cartDetails={eachItem}
              key={eachItem.id}
              onCartIncrement={this.onCartIncrement}
              onCartDecrement={this.onCartDecrement}
            />
          ))}
        </ul>
        <hr className="cart-hr-line" />
        <div className="order-container">
          <h1 className="order-style">Order Total:</h1>
          <div className="cart-sum">
            <p className="order-style">
              <span>
                <BiRupee className="order-icon" />
              </span>
              {totalAmount}.00
            </p>
            <button
              type="button"
              className="order-btn"
              onClick={this.onPlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderCartApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.cartSuccess:
        return this.renderCartItems()
      case apiStatusConstants.cartLoader:
        return this.renderCartLoader()
      case apiStatusConstants.cartNoView:
        return this.renderEmptyCartView()

      case apiStatusConstants.paymentSuccess:
        return this.renderPaymentSuccessView()

      default:
        return null
    }
  }

  render() {
    return <div className="cart-bg-container">{this.renderCartApiStatus()}</div>
  }
}

export default Cart
