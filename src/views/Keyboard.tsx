import * as React from 'react'
import { View, Text } from 'react-native'
// import {
//   installByronKeyboard,
//   ByronTextInput
// } from 'react-native-byron-keyboard'

type IKeyboard = {}
class Keyboard extends React.PureComponent<IKeyboard> {
  public state = {
    username: '',
    password: ''
  }

  public componentDidMount() {
    // installByronKeyboard({ onNext: this.onClickNext.bind(this) })
  }

  public onClickNext() {
    console.log('-------onClickNext--')
  }

  public render() {
    const { username, password } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 50 }} />
        <Text style={{ textAlign: 'center' }}>Keyboard View</Text>
        <View style={{ height: 30 }} />
        {/* <ByronTextInput
          value={username}
          onChangeText={t => this.setState({ username: t })}
          style={{ width: 200, borderWidth: 1, borderColor: '#eee' }}
        />
        <View style={{ height: 30 }} />
        <ByronTextInput
          value={password}
          onChangeText={t => this.setState({ password: t })}
          style={{ width: 200, borderWidth: 1, borderColor: '#eee' }}
        /> */}
      </View>
    )
  }
}

export default Keyboard
