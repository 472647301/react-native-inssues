import * as React from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer, inject } from 'mobx-react'
import { ITimer } from '../stores'

type IHome = {
  Timer: ITimer
  navigation: NavigationScreenProp<{}>
}

@inject('Timer')
@observer
class HomeScreen extends React.Component<IHome> {
  render() {
    const { Timer } = this.props
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>MobX Number: {Timer.number}</Text>
        <Text>Home Screen</Text>
        <Button
          title="Go to Detail"
          onPress={() => navigation.navigate('Detail')}
        />
        <Button
          title="Go to HighChart"
          onPress={() => navigation.navigate('HighChart')}
        />
        <Button
          title="Change MobX Number"
          onPress={() => Timer.changeNumber()}
        />
        <Button
          title="Go to KeyBoard"
          onPress={() => navigation.navigate('KeyBoard')}
        />
        <Button
          title="Go to Main(Tab1)"
          onPress={() => navigation.navigate('Tab1')}
        />
      </View>
    )
  }
}

export default HomeScreen
