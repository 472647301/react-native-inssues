import * as React from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'

type IDetail = {
  navigation: NavigationScreenProp<{}>
}
class DetailScreen extends React.Component<IDetail> {
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Detail Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    )
  }
}

export default DetailScreen
