import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'

import './index.css'

class RestaurantFoodItem extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem, addQuantity, decreaseQuantity} = value
          const {quantity} = this.state
          const {foodDetails} = this.props
          const {id, imgUrl, name, cost, rating} = foodDetails
          const onClickAddItem = () => {
            this.setState(
              prevState => ({quantity: prevState.quantity + 1}),
              addCartItem({...foodDetails, quantity: 1}),
            )
          }

          const onClickMinus = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decreaseQuantity(id)
          }

          const onClickAdd = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            addQuantity(id)
          }

          return (
            <li className="food-list-item">
              <img src={imgUrl} alt="food-item" className="food-logo" />
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
                    onClick={onClickAddItem}
                  >
                    ADD
                  </button>
                ) : (
                  <div className="add-item-container">
                    <button
                      type="button"
                      className="icon-btn-dash"
                      onClick={onClickMinus}
                    >
                      <BsDashSquare />
                    </button>
                    <p className="add-item-text">{quantity}</p>
                    <button
                      type="button"
                      className="icon-btn-plus"
                      onClick={onClickAdd}
                    >
                      <BsPlusSquare />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default RestaurantFoodItem
