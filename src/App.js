import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import Header from './components/Header'
import RestaurantDetails from './components/RestaurantDetails'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import AppTheme from './context/AppTheme'

import './App.css'

class App extends Component {
  state = {activeTheme: 'light'}

  changeTheme = activeTheme => {
    this.setState({activeTheme})
  }

  render() {
    const {activeTheme} = this.state

    return (
      <AppTheme.Provider
        value={{
          activeTheme,
          changeTheme: this.changeTheme,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <>
              <Header />
              <>
                <Switch>
                  <ProtectedRoute exact path="/" component={Home} />
                  <ProtectedRoute exact path="/cart" component={Cart} />
                  <ProtectedRoute
                    exact
                    path="/restaurant/:id"
                    component={RestaurantDetails}
                  />
                  <Route path="/not-found" component={NotFound} />
                  <Redirect to="/not-found" />
                </Switch>
              </>
              <Footer />
            </>
          </Switch>
        </>
      </AppTheme.Provider>
    )
  }
}

export default App
