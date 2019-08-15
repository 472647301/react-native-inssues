import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'

import Home from '../views/Home'
import Detail from '../views/Detail'
import WebView from '../views/WebView'
import HighChart from '../views/HighCharts'
import KeyBoard from '../views/Keyboard'
import Main from '../views/Main'

const AppNavigator = createStackNavigator({
  Home: Home,
  Detail: Detail,
  WebView: WebView,
  HighChart: HighChart,
  KeyBoard: KeyBoard,
  Main: Main
})

export default createAppContainer(AppNavigator)
