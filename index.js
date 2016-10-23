/*! RN-Button v1.0.0 | MIT License | https://github.com/Aaaaaashu/RN-Button */

import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, PixelRatio } from 'react-native'
import React, { Component, PropTypes } from 'react'

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
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    color: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    shape: PropTypes.string,
    activeOpacity: PropTypes.number,
    loadingText: PropTypes.string,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.node,
    ]).isRequired,
  }

  static defaultProps = {
    color: 'default',
    size: 'default',
    type: 'default',
    shape: 'default',
    activeOpacity: 0.8,
    loadingText: 'loading...',
  }

  getTouchableProps() {
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
        activeOpacity: this.props.activeOpacity,
      }
    }

    return touchableProps
  }

  getTouchableStyles() {
    const touchableStyles = [
      styles.container,
      this.getTypeStyle(),
      this.getSizeStyle(),
      this.getShapeStyle(),
      this.props.containerStyle,
    ]

    return touchableStyles
  }

  getColor() {
    return colorList[this.props.color]
  }

  getOpacity() {
    return this.props.disabled || this.props.isLoading ? { opacity: 0.8 } : { opacity: 1 }
  }

  getTypeStyle(isContainer = true) {
    const { type } = this.props
    const color = this.getColor()
    const typeList = {
      container: {
        default: {
          backgroundColor: color,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 1 / PixelRatio.get(),
          borderColor: color,
        },
        clear: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent',
        },
      },
      text: {
        default: {
          color: '#fff',
        },
        outline: {
          color: color,
        },
        clear: {
          color: color,
        },
      },
    }

    return isContainer ? typeList.container[type] : typeList.text[type]
  }

  getSizeStyle(isContainer = true) {
    const { size } = this.props
    const sizeList = {
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
      },
    }

    return isContainer ? sizeList.container[size] : sizeList.text[size]
  }

  getShapeStyle() {
    const { shape } = this.props
    const shapeList = {
      default: {
        borderRadius: 4,
      },
      round: {
        borderRadius: 22,
        paddingHorizontal: 26,
      },
    }

    return shapeList[shape]
  }

  renderLoading(style) {
    return (
      <View style={styles.group}>
        <ActivityIndicator
          animating
          size="small"
          style={styles.spinner}
          color={this.props.type === 'outline' ? this.getColor() : '#fff'}
        />
        <Text style={[style, styles.spinnerText]}>
          {this.props.loadingText}
        </Text>
      </View>
    )
  }

  renderChildren(style) {
    const children = React.Children.map(this.props.children, (child, index) => {
      return (
        <Text key={index} style={style}>
          {child}
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

  renderText() {
    const { isLoading } = this.props

    const style = [
      styles.text,
      this.getTypeStyle(false),
      this.getSizeStyle(false),
      this.getOpacity(),
      this.props.textStyle,
    ]

    if (isLoading === true) {
      return this.renderLoading(style)
    }

    return this.renderChildren(style)
  }

  render() {
    const touchableProps = this.getTouchableProps()
    const touchableStyles = this.getTouchableStyles()

    return (
      <TouchableOpacity
        {...touchableProps}
        testID={this.props.testID}
        style={touchableStyles}
        accessibilityTraits="button"
        accessibilityComponentType="button"
      >
        {this.renderText()}
      </TouchableOpacity>
    )
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
  },
})

export default Button
