import * as React from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'

type IHome = {
  navigation: NavigationScreenProp<{}>
}
class HomeScreen extends React.Component<IHome> {
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Detail"
          onPress={() => navigation.navigate('Detail')}
        />
      </View>
    )
  }
}

export default HomeScreen
