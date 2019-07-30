import * as React from 'react'
import { Button, View, Text, TextInput, Keyboard } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import SockJS from 'sockjs-client'
import stompjs from 'react-native-byron-stomp'

type IDetail = {
  navigation: NavigationScreenProp<{}>
}
class DetailScreen extends React.Component<IDetail> {
  public testSocket() {
    var sock = new SockJS('https://ticker.bituan.cc/ticker')
    const test = stompjs.over(sock)
    test.connect(
      {},
      () => {
        console.log('---------')
        test.subscribe('/topic/ticker/btusdt', (res: any) => {
          if (!res.body) return
          let rate = res.body ? JSON.parse(res.body) : {}
          console.log('订阅汇率', JSON.stringify(rate))
        })
      },
      () => {
        console.log('---------断线重连')
        this.testSocket()
      }
    )
  }

  public componentDidMount() {
    // this.testSocket()
    // sock.onopen = function() {
    //   console.log('open')
    //   sock.send('test')
    // }
    // sock.onmessage = function(e:any) {
    //   console.log('message', e.data)
    //   sock.close()
    // }
    // sock.onclose = function() {
    //   console.log('close')
    // }
  }

  public state = {
    number: ''
  }

  public render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Detail Screen</Text>
        <TextInput
          style={{ width: 200, borderWidth: 1, borderColor: '#eee' }}
          value={this.state.number}
          onChangeText={t => this.setState({ number: t })}
        />
        <Button
          title="Go to WebView"
          onPress={() => navigation.navigate('WebView')}
        />
        <Button
          title="Change Input"
          onPress={() => this.setState({ number: this.state.number + '1' })}
        />
      </View>
    )
  }
}

export default DetailScreen
