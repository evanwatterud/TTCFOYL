import React from 'react';
import { Text } from 'react-native';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'HighScores'
  };
  render() {
    return <Text>HighScores</Text>;
  }
}
