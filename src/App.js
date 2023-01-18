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
  state = {cartList: []}

  addCartItem = item => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList, item],
    }))
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedCartList})
  }

  addQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updatedItem = eachItem.quantity + 1
          return {...eachItem, quantity: updatedItem}
        }
        return eachItem
      }),
    }))
  }

  decreaseQuantity = id => {
    const {cartList} = this.state

    const productItem = cartList.find(eachItem => eachItem.id === id)
    if (productItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updatedItem = eachItem.quantity - 1
            return {...eachItem, quantity: updatedItem}
          }
          return eachItem
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
          addQuantity: this.addQuantity,
          decreaseQuantity: this.decreaseQuantity,
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
