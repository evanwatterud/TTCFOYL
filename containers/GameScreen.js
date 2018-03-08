import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Audio } from 'expo';

import { incrementScore, resetScore } from '../actions/scoreActions';
import { startPlaying, stopPlaying } from '../actions/playingActions';
import { resetLives } from '../actions/livesActions';
import { addCircle, resetCircles } from '../actions/circlesActions';
import InfoBar from '../components/InfoBar.js';
import ShrinkingCircle from '../components/ShrinkingCircle.js';
import { MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE } from '../utils/config.js';
import { NavigationActions } from 'react-navigation'
import { MenuScreen } from '../containers/MenuScreen.js';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uid: 0, difficulty: 350};
    this.soundObject = {};
  }

  static navigationOptions = {
    title: 'Game',
    header: null
  };

  componentWillMount() {
    this.props.startPlaying();
    this.loadWowSound();
    this.props.resetScore();
    this.props.resetLives();
  }

  // When the component mounts, start creating circles, as the game has started
  componentDidMount() {
    var createCircleCallback = () => {
      circleSize = getRandomCircleSize();
      this.props.addCircle({ location: getRandomLocation(circleSize), id: this.state.uid, initialSize: circleSize }); // Add a circle to the list of circles
      this.setState({ uid: this.state.uid + 1, difficulty: this.state.difficulty });
      // Increase the rate at which circles are created unless difficulty is getting too insane
      if (this.state.difficulty >= 10) {
        this.setState({ uid: this.state.uid, difficulty: this.state.difficulty - 0.5 });
      }
      // While the player is still playing keep creating circles
      if (this.props.playing) {
        setTimeout(createCircleCallback, this.state.difficulty);
      }
    }

    setTimeout(createCircleCallback, this.state.difficulty);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.circles.length < this.props.circles.length) {
      this.playWowSound();
    }
  }

  componentWillReceiveProps(nextProps) {
    // Check if the player has stopped playing, if so, handle ending the game
    if (!nextProps.playing) {
      this.endGame();
    }
  }

  // Must clear the circles array when screen unmounts so incorrect circles arent
  // re-rendered when the game is played again
  componentWillUnmount() {
    this.props.resetCircles()
  }

  async endGame() {
    try {
      let highscore = await AsyncStorage.getItem('highscore');
      if (Number(highscore) < this.props.score) {
        this.setHighscore(this.props.score);
      }
    } catch (error) {
      console.log(error); // May add error reporting later
    }
  }

  // Asynchronous function for setting the highscore to persistent storage
  async setHighscore(score) {
    try {
      await AsyncStorage.setItem('highscore', score.toString())
    } catch (error) {
      console.log(error);
    }
  }

  // Asynchronous function to play Owen Wilson's famous wow
  async playWowSound() {
    try {
      status = await this.soundObject.getStatusAsync();
      if (status.isPlaying) {
        await this.soundObject.stopAsync();
      }
      await this.soundObject.playAsync();
    } catch (error) {
      console.log(error); // Catch any errors when trying to play the sound
    }
  }

  async loadWowSound() {
    this.soundObject = new Expo.Audio.Sound();
    try {
      await this.soundObject.loadAsync(require('../assets/sounds/wow.mp3'));
    } catch (error) {
      console.log(error); // Catch any errors when trying to play the sound
    }
  }

  async unloadWowSound() {
    this.soundObject = new Expo.Audio.Sound();
    try {
      await this.soundObject.unloadAsync();
    } catch (error) {
      console.log(error); // Catch any errors when trying to play the sound
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    // Turn the list of circle locations and IDs into shrinking circle components every re-render
    var circles = this.props.circles.map(
      (circle) => <ShrinkingCircle key={circle.id} location={circle.location} initialSize={circle.initialSize} sound={this.soundObject} />
    );
    if (this.props.playing) {
      return (
        <View>
          <View style={styles.barContainer}>
            <InfoBar score={this.props.score} lives={this.props.lives} />
          </View>
          {circles}
        </View>
      )
    } else {
      return (
        <View style={styles.lossMenuContainer}>
          <View>
            <Text>Game Over</Text>
          </View>
          <TouchableOpacity
            onPress={ () =>
              // This navigates to the menu screen while reseting the screen stack
              { this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({ routeName: 'Menu' })]
              })); }
            }
          >
            <View style={styles.mainMenuButton}>
              <Text>Main Menu</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text>Score: {this.props.score}</Text>
          </View>
        </View>
      )
    }
  }
}

// Helper function for getRandomLocation below
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Gets a random x,y location on the screen, takes into account the circle size and screen dimensions
function getRandomLocation(circleSize) {
  location = { x: 0, y: 0 };
  location.x = getRandomInt(0, Dimensions.get('window').width - circleSize);
  location.y = getRandomInt(20, Dimensions.get('window').height - circleSize);
  return location;
}

function getRandomCircleSize() {
  return getRandomInt(MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE);
}

const styles = StyleSheet.create({
  barContainer: {
    paddingTop: 20, // Padding to account for OS status bar
  },

  lossMenuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mainMenuButton: {

  }
});

// Map redux state to the GameScreen props
const mapStateToProps = (state) => ({
  score: state.score,
  lives: state.lives,
  circles: state.circles,
  playing: state.playing
});

// Map redux dispatch functions to the GameScreen props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    incrementScore: incrementScore,
    resetScore: resetScore,
    addCircle: addCircle,
    resetCircles: resetCircles,
    startPlaying: startPlaying,
    stopPlaying: stopPlaying,
    resetLives: resetLives
  }, dispatch);
};

// Connects the above mappings to the component
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
