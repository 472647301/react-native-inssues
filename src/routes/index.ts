import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'

import Home from '../views/Home'
import Detail from '../views/Detail'
import WebView from '../views/WebView'

const AppNavigator = createStackNavigator({
  Home: Home,
  Detail: Detail,
  WebView: WebView
})

export default createAppContainer(AppNavigator)
