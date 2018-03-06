import React from 'react';
import { Easing, Animated, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Font } from 'expo';

import MenuScreen from './containers/MenuScreen';
import GameScreen from './containers/GameScreen';

import store from './store/index';
import incrementScore from './actions/scoreActions';

const Nav = StackNavigator(
  {
    // Screens of the app
    Menu: { screen: MenuScreen },
    Game: { screen: GameScreen }
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
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'dancing-script-bold': require('./assets/fonts/DancingScriptBold.ttf'),
      'dancing-script-regular': require('./assets/fonts/DancingScriptRegular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <Nav />
        </Provider>
      );
    } else {
      return null
    }
  }
}
