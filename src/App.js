import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import Header from './components/Header'

import './App.css'

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

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
    </Switch>
  </>
)

export default App
