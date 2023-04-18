import {BiRupee} from 'react-icons/bi'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import AppTheme from '../../context/AppTheme'

import './index.css'

const CartItem = props => {
  const {cartDetails, onCartIncrement, onCartDecrement} = props
  const {id, name, imageUrl, cost, quantity} = cartDetails

  const onClickIncrementQuantity = () => {
    onCartIncrement(id)
  }

  const onClickDecrementQuantity = () => {
    onCartDecrement(id)
  }

  return (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme} = value

        const cartItemHeading = activeTheme === 'light' ? '#183b56' : '#f1f1f1'
        const val = name

        return (
          <li className="cart-list-items">
            <div className="cart-logo-container">
              <img src={imageUrl} alt="cart-item" className="cart-item-logo" />
              <h1
                className="cart-item-name-lg"
                style={{color: `${cartItemHeading}`}}
              >
                {name}
              </h1>
            </div>
            <div className="small-cart-container">
              <p
                className="cart-item-name-sm"
                style={{color: `${cartItemHeading}`}}
              >
                {val}
              </p>

              <div className="cart-btn-container">
                <button
                  type="button"
                  className="icon-btn-dash"
                  onClick={onClickDecrementQuantity}
                  style={{color: `${cartItemHeading}`}}
                >
                  <BsDashSquare />
                </button>
                <p
                  className="add-item-text"
                  style={{color: `${cartItemHeading}`}}
                >
                  {quantity}
                </p>
                <button
                  type="button"
                  className="icon-btn-plus"
                  onClick={onClickIncrementQuantity}
                  style={{color: `${cartItemHeading}`}}
                >
                  <BsPlusSquare />
                </button>
              </div>
              <div className="cart-cost">
                <p className="cart-cost-name">
                  <span className="cart-icon">
                    {' '}
                    <BiRupee />
                  </span>
                  {cost}.00
                </p>
              </div>
            </div>
          </li>
        )
      }}
    </AppTheme.Consumer>
  )
}

export default CartItem
