import React from 'react'

const AppTheme = React.createContext({
  cartData: [],
  activeTheme: 'light',
  changeTheme: () => {},
})

export default AppTheme
