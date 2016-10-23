# rn-button [![NPM version][npm-image]][npm-url]  [![Dependency Status][daviddm-image]][daviddm-url]
> A React Native button component

![demo]('images/demo.gif')

## Installation

```sh
$ npm install --save rn-button
```

## Usage

```js
import Button from 'rn-button'

<Button
  containerStyle={styles.button}
  textStyle={styles.text}
  color='primary'
  size='block'
  type='outline'
  shape='round'>
  RN Button
</Button>
```

## API

| prop | default | type | description |
| ---- | ---- | ----| ---- |
| containerStyle | none | object (style) | add additional styling for button component (optional) |
| textStyle | none | object (style) | add additional styling for inner button text (optional) |
| children | none | string, number, React.Element | The child nodes to render inside the button. If child is string or number, it will be rendered inside of a <Text> element with textStyle applied if present. Multiple children are allowed (array). (required) |
| onPress | none | function | onPress method (optional) |
| onPressIn | none | function | onPressIn method (optional) |
| onPressOut | none | function | onPressOut method (optional) |
| onLongPress | none | function | onLongPress method (optional) |
| color | default | string | button color(default, light, primary, sencondary, danger) (optional) |
| size | default | string | button size(default, small, block) (optional) |
| type | default | string | button type(default, outline) (optional) |
| shape | default | string | button shape(default, round) (optional) |
| activeOpacity | 0.8 | number | transparency for button press (optional) |
| loadingText | loading... | string | loading state of button text (optional) |
| isLoading | false | boolean | specify button loading state (optional) |
| disabled | false | boolean | specify button disabled state (optional) |

## License

MIT © [Ashu](http://aaaaaashu.me)


[npm-image]: https://badge.fury.io/js/rn-button.svg
[npm-url]: https://npmjs.org/package/rn-button
[travis-image]: https://travis-ci.org/Aaaaaashu/rn-button.svg?branch=master
[travis-url]: https://travis-ci.org/Aaaaaashu/rn-button
[daviddm-image]: https://david-dm.org/Aaaaaashu/rn-button.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Aaaaaashu/rn-button
[coveralls-image]: https://coveralls.io/repos/Aaaaaashu/rn-button/badge.svg
[coveralls-url]: https://coveralls.io/r/Aaaaaashu/rn-button
