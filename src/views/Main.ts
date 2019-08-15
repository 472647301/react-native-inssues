import Tab1 from './Tabs1'
import Tab2 from './Tabs2'
import Tab3 from './Tabs3'
import CustomTabView from './CustomTabView'
import { createNavTab } from 'react-native-byron-tabs'
import { customNavTab } from 'react-native-byron-tabs'
import BackgroundView from './BackgroundView'

// const createCustomNavTab = createNavTab(customNavTab(customTabView))
const createCustomNavTab = createNavTab(customNavTab(CustomTabView, BackgroundView))

const Main = createCustomNavTab({
  Tab1: {
    screen: Tab1
  },
  Tab2: {
    screen: Tab2
  },
  Tab3: {
    screen: Tab3
  }
})

export default Main
