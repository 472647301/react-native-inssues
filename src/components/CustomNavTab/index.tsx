import * as React from 'react'
import { TabRouter } from '@react-navigation/core'
import { SceneView } from '@react-navigation/core'
import { StackActions } from '@react-navigation/core'
import { createNavigator } from '@react-navigation/core'
import { NavigationActions } from '@react-navigation/core'
import { Screen, screensEnabled, ScreenContainer } from 'react-native-screens'
import { Platform, StyleSheet, View, Text } from 'react-native'

class TabNavigationView extends React.PureComponent<any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { index } = nextProps.navigation.state

    return {
      // Set the current tab to be loaded if it was not loaded before
      loaded: prevState.loaded.includes(index)
        ? prevState.loaded
        : [...prevState.loaded, index]
    }
  }

  state = {
    loaded: [this.props.navigation.state.index]
  }

  render() {
    const { navigation, renderScene } = this.props
    const { routes } = navigation.state
    const { loaded } = this.state

    return (
      <View style={styles.views}>
        {
          <View style={{ width: 46, backgroundColor: '#0A1F44' }}>
            {routes.map((route: any, index: number) => {
              return (
                <Text
                  key={route.key}
                  style={{ color: '#fff', lineHeight: 40 }}
                  onPress={() => {
                    this.props.onTabPress({ route })
                  }}
                >
                  {route.key}
                </Text>
              )
            })}
            <Text
              style={{ color: '#fff', lineHeight: 40 }}
              onPress={() => {
                navigation.navigate('Home')
              }}
            >
              {'Home'}
            </Text>
          </View>
        }
        <ScreenContainer style={styles.pages}>
          {routes.map((route: any, index: number) => {
            if (loaded.indexOf(index) === -1) {
              // Don't render a screen if we've never navigated to it
              return null
            }

            const isFocused = navigation.state.index === index

            return (
              <ResourceSavingScene
                key={route.key}
                style={StyleSheet.absoluteFill}
                isVisible={isFocused}
              >
                {renderScene({ route })}
              </ResourceSavingScene>
            )
          })}
        </ScreenContainer>
      </View>
    )
  }
}

export default createNavTab(TabNavigationView)

function createNavTab(TabView: React.ComponentType) {
  class NavigationView extends React.Component<any> {
    _renderScene = ({ route }: any) => {
      const { screenProps, descriptors } = this.props
      const descriptor = descriptors[route.key]
      const TabComponent = descriptor.getComponent()
      return (
        <SceneView
          screenProps={screenProps}
          navigation={descriptor.navigation}
          component={TabComponent}
        />
      )
    }

    _makeDefaultHandler = ({ route, navigation }: any) => () => {
      if (navigation.isFocused()) {
        if (route.hasOwnProperty('index') && route.index > 0) {
          // If current tab has a nested navigator, pop to top
          navigation.dispatch(StackActions.popToTop({ key: route.key }))
        } else {
          navigation.emit('refocus')
        }
      } else {
        this._jumpTo(route.routeName)
      }
    }

    _handleTabPress = ({ route }: any) => {
      if (!route) return
      this._isTabPress = true

      const { descriptors } = this.props
      const descriptor = descriptors[route.key]
      const { navigation, options } = descriptor

      const defaultHandler = this._makeDefaultHandler({ route, navigation })

      if (options.tabBarOnPress) {
        options.tabBarOnPress({ navigation, defaultHandler })
      } else {
        defaultHandler()
      }
    }

    _handleTabLongPress = ({ route }: any) => {
      if (!route) return
      const { descriptors } = this.props
      const descriptor = descriptors[route.key]
      const { navigation, options } = descriptor

      const defaultHandler = this._makeDefaultHandler({ route, navigation })

      if (options.tabBarOnLongPress) {
        options.tabBarOnLongPress({ navigation, defaultHandler })
      } else {
        defaultHandler()
      }
    }

    _handleIndexChange = (index: number) => {
      if (this._isTabPress) {
        this._isTabPress = false
        return
      }

      this._jumpTo(this.props.navigation.state.routes[index].routeName)
    }

    _jumpTo = (routeName: string) => {
      this.props.navigation.dispatch(NavigationActions.navigate({ routeName }))
    }

    _isTabPress: boolean = false

    render() {
      const { descriptors, navigation, screenProps } = this.props
      const { state } = navigation
      const route = state.routes[state.index]
      const descriptor = descriptors[route.key]
      const options = {
        ...this.props.navigationConfig,
        ...descriptor.options
      }

      return (
        <TabView
          {...options}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
          onTabPress={this._handleTabPress}
          onTabLongPress={this._handleTabLongPress}
          navigation={navigation}
          descriptors={descriptors}
          screenProps={screenProps}
        />
      )
    }
  }

  return (routes: any, config: any = {}) => {
    const router = TabRouter(routes, config)
    return createNavigator(NavigationView, router, config)
  }
}

class ResourceSavingScene extends React.Component<any> {
  render() {
    if (screensEnabled && screensEnabled()) {
      const { isVisible, ...rest } = this.props
      return <Screen active={isVisible ? 1 : 0} {...rest} />
    }
    const { isVisible, children, style, ...rest } = this.props

    return (
      <View
        style={[styles.container, style, { opacity: isVisible ? 1 : 0 }]}
        collapsable={false}
        removeClippedSubviews={
          // On iOS, set removeClippedSubviews to true only when not focused
          // This is an workaround for a bug where the clipped view never re-appears
          Platform.OS === 'ios' ? !isVisible : true
        }
        pointerEvents={isVisible ? 'auto' : 'none'}
        {...rest}
      >
        <View style={isVisible ? styles.attached : styles.detached}>
          {children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  attached: {
    flex: 1
  },
  detached: {
    flex: 1,
    // this should be big enough to move the whole view out of its container
    top: 3000
  },
  views: {
    flex: 1,
    flexDirection: 'row'
  },
  pages: {
    flex: 1
  }
})
