import React from 'react';
import { Text, View, TouchableHighlight, AsyncStorage, StyleSheet } from 'react-native';

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highscore: 0, pressStatus: false };
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
        this.setState({ highscore: highscore, pressStatus: this.state.pressStatus })
      }
    } catch (error) {
      console.log(error); // May add error reporting later
    }
  }

  _onHideUnderlay() {
    this.setState({ highscore: this.state.highscore, pressStatus: false});
  }

  _onShowUnderlay() {
    this.setState({ highscore: this.state.highscore, pressStatus: true});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.menuContainer} >
        <View style={styles.titleContainer} >
          <Text style={styles.title} >TTCFOYL</Text>
        </View>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor='white'
          onPress={() => navigate('Game')}
          onHideUnderlay={() => this._onHideUnderlay()}
          onShowUnderlay={() => this._onShowUnderlay()} >
          <View style={this.state.pressStatus ? styles.playButtonDown : styles.playButtonUp} >
            <Text style={this.state.pressStatus ? styles.playTextDown : styles.playTextUp}>Play</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.highscoreContainer} >
          <Text style={styles.highscoreText} >Highscore: {this.state.highscore}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playButtonDown: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 22,
    borderColor: 'black',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5
  },

  playButtonUp: {
    backgroundColor: 'red',
    borderWidth: 2,
    borderRadius: 22,
    borderColor: 'black',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5
  },

  playTextUp: {
    fontFamily: 'chicle-regular',
    color: 'white',
    fontSize: 20,
    transform: [
      {rotateX: '45deg'}
    ]
  },

  playTextDown: {
    fontFamily: 'chicle-regular',
    color: 'red',
    fontSize: 20,
    transform: [
      {rotateX: '45deg'}
    ]
  },

  titleContainer: {
    transform: [
      {scale: 1}
    ]
  },

  title: {
    fontFamily: 'chicle-regular',
    color: 'red',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 3},
    fontSize: 70,
    transform: [
      {rotateX: '45deg'}
    ]
  },

  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  highscoreContainer: {
    paddingTop: 15
  },

  highscoreText: {
    fontFamily: 'chicle-regular',
    color: 'red',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 1, height: 1},
    fontSize: 25,
    transform: [
      {rotateX: '45deg'}
    ]
  }
});
