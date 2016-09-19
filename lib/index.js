import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, PixelRatio } from 'react-native'
import React, { Component, PropTypes } from 'react'

const defaultActiveOpacity = 0.8
const loadingText = 'loading...'
const colorList = {
  default: '#666',
  light: '#999',
  primary: '#387ef5',
  sencondary: '#32db64',
  danger: '#f53d3d',
}

class Button extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    containerStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    activeOpacity: PropTypes.number,
    loadingText: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element
    ]),
  }

  render() {
    let touchableProps = this._getTouchableProps()
    let touchableStyles = this._getTouchableStyles()

    return (
      <TouchableOpacity
        {...touchableProps}
        style={touchableStyles}
        accessibilityTraits="button"
        accessibilityComponentType="button"
      >
        {this._renderText()}
      </TouchableOpacity>
    )
  }

  _getTouchableProps() {
    let touchableProps = {}

    if (this.props.disabled || this.props.isLoading) {
      touchableProps = {
        disabled: true,
        activeOpacity: 1,
      }
    } else {
      touchableProps = {
        onPress: this.props.onPress,
        onPressIn: this.props.onPressIn,
        onPressOut: this.props.onPressOut,
        onLongPress: this.props.onLongPress,
        activeOpacity: this.props.activeOpacity || defaultActiveOpacity
      }
    }

    return touchableProps
  }

  _getTouchableStyles() {
    let touchableStyles = [
      styles.container,
      this._getTypeStyle(),
      this._getSizeStyle(),
      this._getShapeStyle(),
      this._getOpacity(),
      this.props.containerStyle,
    ]

    return touchableStyles
  }

  _renderText() {
    let { isLoading } = this.props

    let style = [
      styles.text,
      this._getTypeStyle(false),
      this._getSizeStyle(false),
      this.props.textStyle,
    ]

    if (isLoading === true) {
      return this._renderLoading(style)
    } else {
      return this._renderChildren(style)
    }
  }

  _renderChildren(style) {
    let children = React.Children.map(this.props.children, (children, index) => {
      return (
        <Text key={index} style={style}>
          {children}
        </Text>
      )
    })

    switch (children.length) {
      case 0:
        return null
      case 1:
        return children[0]
      default:
        return <View style={styles.group}>{children}</View>
    }
  }

  _renderLoading(style) {
    return (
      <View style={styles.group}>
        <ActivityIndicator
          animating={true}
          size='small'
          style={styles.spinner}
          color={this.props.type === 'outline' ? this._getColor() : '#fff'}
        />
        <Text style={[style, styles.spinnerText]}>
          {this.props.loadingText || loadingText}
        </Text>
      </View>
    )
  }

  _getColor() {
    return colorList[this.props.color] || colorList.default
  }

  _getOpacity() {
    // #TODO
    return this.props.disabled || this.props.isLoading ? { opacity: 1 } : { opacity: 1 }
  }

  _getTypeStyle(isContainer = true) {
    let { type } = this.props
    let color = this._getColor()
    let typeList = {
      container: {
        default: {
          backgroundColor: color,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 1 / PixelRatio.get(),
          borderColor: color,
        }
      },
      text: {
        default: {
          color: '#fff',
        },
        outline: {
          color: color,
        }
      }
    }

    return isContainer
    ? typeList.container[type] || typeList.container.default
    : typeList.text[type] || typeList.text.default
  }

  _getSizeStyle(isContainer = true) {
    let { size } = this.props
    let sizeList = {
      container: {
        default: {
          height: 44,
          paddingHorizontal: 16,
          alignSelf: 'center',
        },
        small: {
          height: 28,
          alignSelf: 'center',
          paddingHorizontal: 16,
        },
        block: {
          height: 44,
          alignSelf: 'stretch',
        },
      },
      text: {
        default: {
          fontSize: 16,
        },
        small: {
          fontSize: 12,
        },
      }
    }

    return isContainer
    ? sizeList.container[size] || sizeList.container.default
    : sizeList.text[size] || sizeList.text.default
  }

  _getShapeStyle() {
    let { shape } = this.props
    let shapeList = {
      default: {
        borderRadius: 4,
      },
      round: {
        borderRadius: 22,
        paddingHorizontal: 26,
      }
    }

    return shapeList[shape] || shapeList.default
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    alignItems: 'center',
  },
  spinnerText: {
    marginLeft: 8,
  }
})

export default Button