import * as React from 'react'
import { View, Button, ActionSheetIOS } from 'react-native'
import { WebView } from 'react-native-webview'
import { NavigationScreenProp } from 'react-navigation'
import { sendMessageHtml } from 'react-native-kline'
import { IOnMessage, Bar } from 'react-native-kline'
import SockJS from 'sockjs-client'
import stompjs from 'byron-stomp'
import moment from 'moment'
import axios from 'axios'

const _data = require('../data')
const baseUrl = 'https://wapi.bituan.cc'

type IGetScaleByDate = {
  amount: number
  close: number
  date: string
  high: number
  id: number
  low: number
  open: number
  symbol: string
  type: string
  volume: number
}

type IWebView = {
  navigation: NavigationScreenProp<{}>
}
class WebViewScreen extends React.Component<IWebView> {
  public chart: WebView | null = null
  public socket?: stompjs.Client
  public subList: { [key: string]: stompjs.Subscription } = {}

  public state = {
    symbol: 'btcusdt',
    interval: '1',
    pricescale: 100
  }

  /**
   * onLoadEnd
   */
  public onLoadEnd() {
    const { symbol, interval, pricescale } = this.state
    if (this.chart) {
      const msg = sendMessageHtml('initChart', {
        symbol,
        interval,
        pricescale,
        // isDebug: true
      })
      this.chart.injectJavaScript(msg)
    }
  }
  /**
   * onNativeEvent
   */
  public onMessage(data: string) {
    console.log('---onMessage----', data)
    try {
      const msg: IOnMessage = JSON.parse(data)
      this.chartMessage(msg)
    } catch (err) {
      console.log('---onError-----', err)
    }
  }

  /**
   * chartMessage
   */
  public async chartMessage(msg: IOnMessage) {
    switch (msg.event) {
      case 'fetchHistoryData':
        const res = await axios
          .post(`${baseUrl}/v1/exchange/ticker/getScaleByDate`, {
            from: msg.data.from,
            symbol: msg.data.symbol,
            to: msg.data.to,
            type: `MIN_${msg.data.resolution}`
          })
          .catch(err => console.log('--', JSON.stringify(err)))
        if (res && res.data && res.data.data) {
          const kline: Array<Bar> = []
          const list: Array<IGetScaleByDate> = res.data.data
          list.forEach(item => {
            const _date = moment(item.date, 'YYYY-MM-DD HH:mm:ss')
            const time = Number(_date.format('X')) * 1000
            kline.push({
              time: time,
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close,
              volume: item.volume
            })
          })
          const klineData = sendMessageHtml('renderChartData', { kline: kline })
          if (this.chart && this.socket) {
            this.chart.injectJavaScript(klineData)
            this.chart.injectJavaScript(
              sendMessageHtml('createChartStudy', {
                studyName: 'MA Cross',
                studyValue: [30, 120]
              })
            )
            this.subList[`MIN_${msg.data.resolution}`] = this.socket.subscribe(
              `/topic/kline/MIN_${msg.data.resolution}/${msg.data.symbol}`,
              info => {
                console.log('---info---', JSON.stringify(info))
                const body: IGetScaleByDate = JSON.parse(info.body)
                const _date = moment(body.date, 'YYYY-MM-DD HH:mm:ss')
                const time = Number(_date.format('X')) * 1000
                const klineSub = sendMessageHtml('renderChartSub', {
                  kline: [
                    {
                      time: time,
                      open: body.open,
                      high: body.high,
                      low: body.low,
                      close: body.close,
                      volume: body.volume
                    }
                  ]
                })
                this.chart && this.chart.injectJavaScript(klineSub)
              }
            )
          }
        }
        break
      case 'switchingCycle':
        this.subList[`MIN_${msg.data.old}`].unsubscribe()
        break
    }
  }

  public componentDidMount() {
    const sock = new SockJS('https://ticker.bituan.cc/ticker')
    if (!this.socket) {
      this.socket = stompjs.over(sock)
      this.socket.isDebug = true
      this.socket.connect({}, () => {
        console.log(' >> Socket open done.')
      })
    }
  }

  public onSwitchingCycle() {
    const options = ['分时', '1', '3', '5', '15', '取消']
    ActionSheetIOS.showActionSheetWithOptions(
      {
        cancelButtonIndex: 5,
        destructiveButtonIndex: 1,
        options: options
      },
      index => {
        if (index && index !== 5 && this.chart) {
          this.chart.injectJavaScript(
            sendMessageHtml('changeChartResolution', {
              interval: options[index]
            })
          )
        } else if (index === 0 && this.chart) {
          this.chart.injectJavaScript(
            sendMessageHtml('changeChartType', { type: 2 })
          )
        }
      }
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Button title="切换周期" onPress={this.onSwitchingCycle.bind(this)} />
        </View>
        <View style={{ height: 360, backgroundColor: '#12151c' }}>
          <WebView
            style={{ flex: 1 }}
            originWhitelist={['*']}
            ref={ref => (this.chart = ref)}
            source={require('react-native-kline/dist/index.html')}
            onMessage={evt => this.onMessage(evt.nativeEvent.data)}
            onLoadEnd={this.onLoadEnd.bind(this)}
            // onLoadEnd={() => {
            //   if (this.views) {
            //     this.views.injectJavaScript(
            //       sendMessageHtml('initChart', { isDebug: true })
            //     )
            //   }
            // }}
            // onMessage={event => {
            //   console.log('---onMessage----', event.nativeEvent.data)
            //   const htmlData = JSON.parse(event.nativeEvent.data)
            //   if (htmlData.event === 'fetchHistoryData' && this.views) {
            //     this.views.injectJavaScript(
            //       sendMessageHtml('renderChartData', { kline: _data })
            //     )
            //   }
            // }}
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    )
  }
}

export default WebViewScreen
