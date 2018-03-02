import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementScore, resetScore } from '../actions/scoreActions';
import { startPlaying, stopPlaying } from '../actions/playingActions';
import { resetLives } from '../actions/livesActions';
import { addCircle } from '../actions/circlesActions';
import InfoBar from '../components/InfoBar.js';
import ShrinkingCircle from '../components/ShrinkingCircle.js';
import { CIRCLE_SIZE } from '../utils/config.js';
import { NavigationActions } from 'react-navigation'
import { MenuScreen } from '../containers/MenuScreen.js';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { uid: 0 };
  }

  static navigationOptions = {
    title: 'Game',
    header: null
  };

  componentWillMount() {
    this.props.startPlaying();
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.props.addCircle({ location: getRandomLocation(), id: this.state.uid });
      this.setState({ uid: this.state.uid + 1 });
    }, 2000);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.playing) {
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.intervalID);
    this.props.resetScore();
    this.props.resetLives();
  }

  render() {
    const { navigate } = this.props.navigation;
    var circles = this.props.circles.map((circle) => <ShrinkingCircle key={circle.id} location={circle.location}/> );
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
        <View>
          <Button
            onPress={ () =>
              // This navigates to the menu screen while reseting the screen stack
              { this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({ routeName: 'Menu' })]
              })); }
            }
            title="Main Menu"
          />
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
function getRandomLocation() {
  location = { x: 0, y: 0 };
  location.x = getRandomInt(0, Dimensions.get('window').width - CIRCLE_SIZE);
  location.y = getRandomInt(20, Dimensions.get('window').height - CIRCLE_SIZE);
  return location;
}

const styles = StyleSheet.create({
  barContainer: {
    paddingTop: 20, // Padding to account for OS status bar
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
    startPlaying: startPlaying,
    stopPlaying: stopPlaying,
    resetLives: resetLives
  }, dispatch);
};

// Connects the above mappings to the component
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
