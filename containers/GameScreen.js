import React from 'react';
import { Text, View, Button, StyleSheet, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementScore, resetScore } from '../actions/scoreActions';
import InfoBar from '../components/InfoBar.js';
import ShrinkingCircle from '../components/ShrinkingCircle.js';
import { CIRCLE_SIZE } from '../utils/config.js';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Game',
    header: null
  };

  render() {
    return (
      <View>
        <View style={styles.barContainer}>
          <InfoBar score={this.props.score} />
        </View>
        <ShrinkingCircle location={getRandomLocation()}/>
      </View>
    )
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomLocation() {
  location = { x: 0, y: 0 };
  location.x = getRandomInt(0, Dimensions.get('window').width - CIRCLE_SIZE);
  location.y = getRandomInt(20, Dimensions.get('window').height - CIRCLE_SIZE);
  return location;
}

const styles = StyleSheet.create({
  barContainer: {
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  }
});

const mapStateToProps = (state) => ({
  score: state.score
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    incrementScore: incrementScore,
    resetScore: resetScore
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
