import * as React from 'react'
import { SFC } from 'react'
import { View } from 'react-native'

class BackgroundView extends React.Component<SFC> {
  public render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#000' }}>
        {this.props.children}
      </View>
    )
  }
}

export default BackgroundView
