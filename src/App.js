import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import Header from './components/Header'
import RestaurantDetails from './components/RestaurantDetails'
import Footer from './components/Footer'

import './App.css'
import CartContext from './context/CartContext'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

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

class App extends Component {
  state = {cartList: getCartListFromLocalStorage()}

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.deleteCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
          addQuantity: this.incrementCartItemQuantity,
          decreaseQuantity: this.decrementCartItemQuantity,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <>
              <Header />
              <>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/cart" component={Cart} />
                  <Route
                    exact
                    path="/restaurant/:id"
                    component={RestaurantDetails}
                  />
                </Switch>
              </>
              <Footer />
            </>
          </Switch>
        </>
      </CartContext.Provider>
    )
  }
}

export default App
