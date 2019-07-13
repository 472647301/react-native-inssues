import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'

import Home from '../views/Home'
import Detail from '../views/Detail'

const AppNavigator = createStackNavigator({
  Home: Home,
  Detail: Detail
})

export default createAppContainer(AppNavigator)
