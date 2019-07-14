import * as React from 'react'
import { WebView } from 'react-native-webview'
import { NavigationScreenProp } from 'react-navigation'

type IWebView = {
  navigation: NavigationScreenProp<{}>
}
class WebViewScreen extends React.Component<IWebView> {
  render() {
    const { navigation } = this.props
    return (
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: 'https://github.com/react-native-community/react-native-webview'
        }}
        startInLoadingState={true}
      />
    )
  }
}

export default WebViewScreen
