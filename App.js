import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MenuScreen from './components/MenuScreen';
import GameScreen from './components/GameScreen';

const SimpleApp = StackNavigator({
  Menu: { screen: MenuScreen },
  Game: { screen: GameScreen }
});

export default class App extends React.Component {
  render() {
      return <SimpleApp />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
