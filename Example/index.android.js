/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from 'rn-button'

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button containerStyle={styles.button} color="default">default</Button>
        <Button containerStyle={styles.button} isLoading size="block" color="primary">primary</Button>
        <Button containerStyle={styles.button} shape="round" color="sencondary">sencondary</Button>
        <Button containerStyle={styles.button} type="outline" color="danger">danger</Button>
        <Button containerStyle={styles.button} type="clear" color="light">light</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  button: {
    marginVertical: 10,
  }
});

AppRegistry.registerComponent('Example', () => Example);
