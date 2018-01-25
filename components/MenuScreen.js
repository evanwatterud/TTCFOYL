import React from 'react';
import { Text, View, Button } from 'react-native';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'TTCFOYL'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('Game')}
          title="Play"
        />
        <Button
          onPress={() => navigate('HighScore')}
          title="HighScores"
        />
      </View>
    );
  }
}
