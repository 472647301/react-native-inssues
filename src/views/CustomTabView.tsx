import * as React from 'react'
import { View, Text } from 'react-native'
import { ICustomTabView } from 'react-native-byron-tabs'
import * as Animatable from 'react-native-animatable'

class customTabView extends React.Component<ICustomTabView> {
  public state = {
    width: 66
  }

  render() {
    const { width } = this.state
    const { navigation, routes, onTabPress } = this.props
    return (
      <Animatable.View
        transition={'width'}
        style={{ width: width, backgroundColor: '#0A1F44' }}
      >
        {routes.map((route, index) => {
          return (
            <Text
              key={route.key}
              style={{ color: '#fff', lineHeight: 40 }}
              onPress={() => {
                if (width !== 66) {
                  this.setState({ width: 66 })
                  this.props.onStyleChange({})
                }
                onTabPress({ route })
              }}
            >
              {route.key}
            </Text>
          )
        })}
        <Text
          style={{ color: '#fff', lineHeight: 40 }}
          onPress={() => {
            if (width !== 66) {
              this.setState({ width: 66 })
              this.props.onStyleChange({})
            }
            navigation.navigate('Home')
          }}
        >
          {'Home'}
        </Text>
        <Text
          style={{ color: '#fff', lineHeight: 40 }}
          onPress={() => {
            this.setState({ width: 300 })
            this.props.onStyleChange({
              position: 'absolute',
              left: 310,
              top: 50,
              width: 300,
              height: 500,
              flex: 0
            })
          }}
        >
          {'Show'}
        </Text>
        <Text
          style={{ color: '#fff', lineHeight: 40 }}
          onPress={() => {
            if (width !== 66) {
              this.setState({ width: 66 })
              this.props.onStyleChange({})
            }
            navigation.navigate('Detail')
          }}
        >
          {'Detail'}
        </Text>
      </Animatable.View>
    )
  }
}

export default customTabView
