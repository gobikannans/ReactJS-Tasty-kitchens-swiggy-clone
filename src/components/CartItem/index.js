import {BiRupee} from 'react-icons/bi'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

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
    <li className="cart-list-items">
      <div className="cart-logo-container">
        <img src={imageUrl} alt="cart-item" className="cart-item-logo" />
        <h1 className="cart-item-name">{name}</h1>
      </div>
      <div className="cart-btn-container">
        <button
          type="button"
          className="icon-btn-dash"
          onClick={onClickDecrementQuantity}
        >
          <BsDashSquare />
        </button>
        <p className="add-item-text">{quantity}</p>
        <button
          type="button"
          className="icon-btn-plus"
          onClick={onClickIncrementQuantity}
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
    </li>
  )
}

export default CartItem
