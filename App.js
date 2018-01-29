import React from 'react';
import { Easing, Animated, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MenuScreen from './containers/MenuScreen';
import GameScreen from './containers/GameScreen';
import HighScoreScreen from './containers/HighScoreScreen';

const Nav = StackNavigator(
  {
    // Screens of the app
    Menu: { screen: MenuScreen },
    Game: { screen: GameScreen },
    HighScore: { screen: HighScoreScreen }
  },
  {
    initialRouteName: 'Menu', // Have the app start on the menu screen
    // Remove transition animation
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);

export default class App extends React.Component {
  render() {
      return <Nav />;
  }
}
