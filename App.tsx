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

type IApp = {}
class App extends React.Component<IApp> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    )
  }
}
export default App
