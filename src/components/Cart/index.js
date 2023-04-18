import {Component} from 'react'
import {Link} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import {BiRupee} from 'react-icons/bi'
import {AiFillCheckCircle} from 'react-icons/ai'
import CartItem from '../CartItem'
import AppTheme from '../../context/AppTheme'

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

  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const cartBg = activeTheme === 'light' ? '#ffffff' : '#181818'
          const cartContainerBg =
            activeTheme === 'light' ? '#f9fbfe' : '#313131'
          const cartItemHeading =
            activeTheme === 'light' ? '#64748b' : '#94a3b8'
          const orderHeading = activeTheme === 'light' ? ' #183b56' : '#ffa412'
          const paymentHeading =
            activeTheme === 'light' ? ' #183b56' : '#f1f1f1'

          const renderCartLoader = () => (
            <div className="cart-loader-container">
              <TailSpin
                type="ThreeDots"
                color="#F7931E"
                height="50"
                width="50"
              />
            </div>
          )

          const onClickToHome = () => {
            const {history} = this.props
            history.replace('/')
          }

          const removeCartItem = updatedData => {
            const updatedCartData = updatedData.filter(
              eachItem => eachItem.quantity > 0,
            )
            localStorage.setItem('cartData', JSON.stringify(updatedCartData))
            this.getCartData()
          }

          const onCartIncrement = id => {
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

          const onCartDecrement = id => {
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
            removeCartItem(updatedCartData)
          }

          const calculateTotalAmount = () => {
            const {cartList} = this.state
            const amount = cartList.map(
              eachItem => eachItem.quantity * eachItem.cost,
            )
            const totalAmount = amount.reduce((a, b) => a + b)
            return totalAmount
          }

          const onPlaceOrder = () => {
            localStorage.clear('cartData')
            this.setState({apiStatus: apiStatusConstants.paymentSuccess})
          }

          const renderPaymentSuccessView = () => (
            <div className="no-order-container">
              <AiFillCheckCircle className="check-icon" />
              <h1
                className="payment-heading"
                style={{color: `${paymentHeading}`}}
              >
                Payment Successful
              </h1>
              <p className="no-order-para">
                Thank you for ordering <br />
                Your payment is successfully completed.
              </p>
              <Link to="/" className="cart-links">
                <button
                  type="button"
                  className="pay-btn"
                  onClick={onClickToHome}
                >
                  Go To Home Page
                </button>
              </Link>
            </div>
          )

          const renderEmptyCartView = () => (
            <div className="no-order-container">
              <img
                src="https://res.cloudinary.com/dpjowvn70/image/upload/v1674120441/cooking_1_1x_kjca9t.png"
                alt="empty cart"
                className="empty-cart-img"
              />
              <h1
                className="no-order-heading"
                style={{color: `${paymentHeading}`}}
              >
                No Order Yet!
              </h1>
              <p className="no-order-para">
                Your cart is empty. Add something from the menu.
              </p>
              <Link to="/" className="cart-links">
                <button
                  type="button"
                  className="no-order-btn"
                  onClick={onClickToHome}
                >
                  Order Now
                </button>
              </Link>
            </div>
          )

          const renderCartItems = () => {
            const {cartList} = this.state
            const totalAmount = calculateTotalAmount()

            return (
              <div
                className="cart-container"
                style={{backgroundColor: `${cartContainerBg}`}}
              >
                <div className="cart-heading-container">
                  <p
                    className="cart-heading"
                    style={{color: `${cartItemHeading}`}}
                  >
                    Item
                  </p>
                  <p
                    className="cart-heading"
                    style={{color: `${cartItemHeading}`}}
                  >
                    Quantity
                  </p>
                  <p
                    className="cart-heading"
                    style={{color: `${cartItemHeading}`}}
                  >
                    Price
                  </p>
                </div>
                <ul className="cart-item-list">
                  {cartList.map(eachItem => (
                    <CartItem
                      cartDetails={eachItem}
                      key={eachItem.id}
                      onCartIncrement={onCartIncrement}
                      onCartDecrement={onCartDecrement}
                    />
                  ))}
                </ul>
                <hr className="cart-hr-line" />
                <div className="order-container">
                  <h1
                    className="order-style"
                    style={{color: `${orderHeading}`}}
                  >
                    Order Total:
                  </h1>
                  <div className="cart-sum">
                    <p
                      className="order-style"
                      style={{color: `${orderHeading}`}}
                    >
                      <span>
                        <BiRupee className="order-icon" />
                      </span>
                      {totalAmount}.00
                    </p>
                    <button
                      type="button"
                      className="order-btn"
                      onClick={onPlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          const renderCartApiStatus = () => {
            const {apiStatus} = this.state

            switch (apiStatus) {
              case apiStatusConstants.cartSuccess:
                return renderCartItems()
              case apiStatusConstants.cartLoader:
                return renderCartLoader()
              case apiStatusConstants.cartNoView:
                return renderEmptyCartView()

              case apiStatusConstants.paymentSuccess:
                return renderPaymentSuccessView()

              default:
                return null
            }
          }

          return (
            <div
              className="cart-bg-container"
              style={{backgroundColor: `${cartBg}`}}
            >
              {renderCartApiStatus()}
            </div>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default Cart
