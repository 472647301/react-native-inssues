/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react'
import { View } from 'react-native'
import Routes from './src/routes'
import { Provider } from 'mobx-react'
import stores from './src/stores'

// 全局对象
declare global {
  interface Window {
    [key: string]: any
  }
}


type IApp = {}
class App extends React.Component<IApp> {
  public render() {
    return (
      <Provider {...stores}>
        <View style={{ flex: 1 }}>
          <Routes />
        </View>
      </Provider>
    )
  }
}
export default App
