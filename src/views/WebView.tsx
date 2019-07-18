import * as React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { NavigationScreenProp } from 'react-navigation'

const _data = require('../data')

type IWebView = {
  navigation: NavigationScreenProp<{}>
}
class WebViewScreen extends React.Component<IWebView> {
  public views: WebView | null = null
  render() {
    const { navigation } = this.props

    const runFirst = `
    window.sendMessageHtml(${JSON.stringify({
      event: 'initChart',
      data: { isDebug: true }
    })})
    `
    // try {
    //   window.receiveMessage("{"event":"chartInit","data":{"isDebug":true}}");
    // } catch(e) {
    //   window.ReactNativeWebView.postMessage(JSON.stringify(e));
    //   true;
    // }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View style={{ height: 400 }}>
          <WebView
            domStorageEnabled={true}
            javaScriptEnabled={true}
            originWhitelist={['*']}
            ref={ref => (this.views = ref)}
            style={{ flex: 1 }}
            source={require('../../dist/index.html')}
            onLoadEnd={() => {
              if (this.views) {
                this.views.injectJavaScript(runFirst)
                // this.views.postMessage(JSON.stringify({event: 'chartInit', data: {isDebug: true}}))
              }
            }}
            onMessage={event => {
              console.log('---onMessage----', event.nativeEvent.data)
              const htmlData = JSON.parse(event.nativeEvent.data)
              if (htmlData.event === 'fetchHistoryData' && this.views) {
                this.views.injectJavaScript(
                  `window.sendMessageHtml(${JSON.stringify({
                    event: 'renderChartData',
                    data: _data
                  })})`
                )
              }
            }}
            startInLoadingState={true}
            // injectedJavaScript={patchPostMessageJsCode}
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    )
  }
}

export default WebViewScreen
