import React from 'react';
import { Text } from 'react-native';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}
