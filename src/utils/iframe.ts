
const patchPostMessageFunction = function() {
  var originalPostMessage = ReactNativeWebView.postMessage

  var patchedPostMessage = function(
    message: any,
    targetOrigin: any,
    transfer: any
  ) {
    originalPostMessage(message, targetOrigin, transfer)
  }

  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      'hasOwnProperty',
      'postMessage'
    )
  }

  ReactNativeWebView.postMessage = patchedPostMessage
}

export const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();'