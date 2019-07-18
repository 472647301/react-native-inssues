import * as React from 'react'
import { WebView } from 'react-native-webview'
import { NavigationScreenProp } from 'react-navigation'
import { patchPostMessageJsCode } from '../utils/iframe'

type IWebView = {
  navigation: NavigationScreenProp<{}>
}
class WebViewScreen extends React.Component<IWebView> {
  public views: WebView | null = null
  render() {
    const { navigation } = this.props

    const runFirst = `
      setTimeout(() => {
        try {
          window.receiveMessage("{"event":"chartInit","data":{"isDebug":true}}");
        } catch(e) {
          window.ReactNativeWebView.postMessage(JSON.stringify(e));
          true; 
        }
      }, 3000);
    `
    // try {
    //   window.receiveMessage("{"event":"chartInit","data":{"isDebug":true}}");
    // } catch(e) {
    //   window.ReactNativeWebView.postMessage(JSON.stringify(e));
    //   true; 
    // }
    return (
      <WebView
      javaScriptEnabled={true}
        originWhitelist={['*']}
        ref={ref => (this.views = ref)}
        style={{ flex: 1 }}
        source={require('../../dist/index.html')}
        onLoadEnd={() => {
          if (this.views) {
            this.views.injectJavaScript(runFirst)
          }
        }}
        onMessage={event => {
          console.log('---onMessage----', event.nativeEvent.data)
        }}
        startInLoadingState={true}
        injectedJavaScript={patchPostMessageJsCode}
      />
    )
  }
}

export default WebViewScreen
