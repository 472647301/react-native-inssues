import * as React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
import InteractionManager from './manager'

const numberKeys = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]

class Keyboard extends React.PureComponent<any> {
  public onPressNumber(key: string) {
    InteractionManager.runAfterInteractions(() => {
      const { onDelete, onChange } = this.props
      if (key === 'del' && onDelete) {
        this.props.onDelete()
      } else if (key !== '' && onChange) {
        this.props.onChange(key)
      }
    })
  }

  public render() {
    const props = this.props
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapper_left}>
          <View style={styles.wrapper_left_list}>
            {['1', '2', '3'].map(n => {
              return (
                <TouchableHighlight
                  key={n}
                  style={styles.wrapper_left_item}
                  underlayColor={'#fff'}
                  onPress={this.onPressNumber.bind(this, n)}
                >
                  <Text style={styles.wrapper_left_text}>{n}</Text>
                </TouchableHighlight>
              )
            })}
          </View>
          <View style={styles.wrapper_left_list}>
            {['4', '5', '6'].map(n => {
              return (
                <TouchableHighlight
                  key={n}
                  style={styles.wrapper_left_item}
                  underlayColor={'#fff'}
                  onPress={this.onPressNumber.bind(this, n)}
                >
                  <Text style={styles.wrapper_left_text}>{n}</Text>
                </TouchableHighlight>
              )
            })}
          </View>
          <View style={styles.wrapper_left_list}>
            {['7', '8', '9'].map(n => {
              return (
                <TouchableHighlight
                  key={n}
                  style={styles.wrapper_left_item}
                  underlayColor={'#fff'}
                  onPress={this.onPressNumber.bind(this, n)}
                >
                  <Text style={styles.wrapper_left_text}>{n}</Text>
                </TouchableHighlight>
              )
            })}
          </View>
          <View style={styles.wrapper_left_list}>
            {['.', '0'].map(n => {
              return (
                <TouchableHighlight
                  key={n}
                  style={styles.wrapper_left_item}
                  underlayColor={'#fff'}
                  onPress={this.onPressNumber.bind(this, n)}
                >
                  <Text style={styles.wrapper_left_text}>{n}</Text>
                </TouchableHighlight>
              )
            })}
            <TouchableHighlight
              style={styles.wrapper_left_item}
              underlayColor={'#fff'}
              onPress={this.onPressNumber.bind(this, 'del')}
            >
              <Image source={require('./delete.png')} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.wrapper_right}>
          <TouchableHighlight style={[styles.wrapper_right_item]}>
            {props.closeComponent || (
              <Text style={styles.wrapper_right_text}>关闭</Text>
            )}
          </TouchableHighlight>
          <TouchableHighlight style={[styles.wrapper_right_item]}>
            {props.nextComponent || (
              <Text style={styles.wrapper_right_text}>下一项</Text>
            )}
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default Keyboard

const styles = StyleSheet.create({
  wrapper: {
    height: 176,
    flexDirection: 'row',
    backgroundColor: '#18222b'
  },
  wrapper_left: {
    flex: 1
  },
  wrapper_right: {
    width: 88
  },
  // wrapper_left_list: {
  //   flex: 1
  // },
  wrapper_left_list: {
    height: 44,
    flexDirection: 'row'
  },
  wrapper_left_item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2d3a44',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth
  },
  wrapper_left_text: {
    fontSize: 20,
    color: '#fff'
  },
  wrapper_right_item: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2d3a44',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  wrapper_right_text: {
    fontSize: 14,
    color: '#fff'
  }
})
