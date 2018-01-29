import React from 'react';
import { Text } from 'react-native';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Game',
    header: null
  };
  render() {
    return <Text>Play the game</Text>;
  }
}
