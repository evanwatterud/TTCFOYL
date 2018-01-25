import React from 'react';
import { Text, View, Button } from 'react-native';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <Button
          onPress={() => navigate('Game')}
          title="Play"
        />
      </View>
    );
  }
}
