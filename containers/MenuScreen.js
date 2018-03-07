import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highscore: 0 };
  }

  static navigationOptions = {
    title: 'TTCFOYL',
    header: null
  };

  componentWillMount() {
    this.getHighscore();
  }

  // Asynchronous function to get the users highscore from storage
  async getHighscore() {
    try {
      let highscore = await AsyncStorage.getItem('highscore');
      if (highscore != null) {
        this.setState({ highscore: highscore })
      }
    } catch (error) {
      console.log(error); // May add error reporting later
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.menuContainer} >
        <View style={styles.titleContainer} >
          <Text style={styles.title} >TTCFOYL</Text>
        </View>
        <TouchableOpacity onPress={() => navigate('Game')} >
          <View style={styles.playButton} >
            <Text>Play</Text>
          </View>
        </TouchableOpacity>
        <Text>Highscore: {this.state.highscore}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playButton: {

  },

  titleContainer: {

  },

  title: {
    fontFamily: 'dancing-script-bold',
    color: 'red',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 1, height: 1},
    fontSize: 42
  },

  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
