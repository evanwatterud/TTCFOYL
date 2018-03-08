import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { incrementScore, resetScore } from '../actions/scoreActions';
import { stopPlaying } from '../actions/playingActions';
import { decrementLives } from '../actions/livesActions';
import { removeCircle } from '../actions/circlesActions';

class ShrinkingCircle extends React.Component {
  constructor(props) {
    super(props);
    this.size = new Animated.Value(props.initialSize);
    this.borderRadius = new Animated.Value(props.initialSize/2);
  }

  // Start shrinking the circle when it mounts to the game screen
  componentDidMount() {
    this.shrink()
  }

  shrink() {
    this.size.setValue(this.props.initialSize);
    Animated.timing(
      this.size,
      {
        toValue: 0,
        duration: 3000,
        easing: Easing.linear
      }
    ).start((animation) => {
      if (animation.finished) {
        this.props.decrementLives();
        this.props.removeCircle(this.props.location);
      }
    });
    Animated.timing(
      this.borderRadius,
      {
        toValue: 0,
        duration: 3000,
        easing: Easing.linear
      }
    ).start();
  }

  componentWillUnmount() {
    // If the circle is being deleted and lives are at 0, the player lost, so stop playing
    if (this.props.lives == 0) {
      this.props.stopPlaying();
    }
  }

  render() {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: this.props.initialSize,
        width: this.props.initialSize,
        top: this.props.location.y,
        left: this.props.location.x,
        position: 'absolute',
      }}>
        <TouchableWithoutFeedback onPress={() => {
          this.props.incrementScore();
          this.props.removeCircle(this.props.location);
        }} >
        <Animated.View style={{
          backgroundColor: 'red',
          position: 'absolute',
          height: this.size,
          width: this.size,
          borderRadius: this.borderRadius,
          borderColor: 'black',
          borderWidth: 1
        }} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

// Map redux state to the ShrinkingCircle props
const mapStateToProps = (state) => ({
  circles: state.circles,
  lives: state.lives
});

// Map redux dispatch functions to the ShrinkingCircle props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    incrementScore: incrementScore,
    resetScore: resetScore,
    decrementLives: decrementLives,
    removeCircle: removeCircle,
    stopPlaying: stopPlaying
  }, dispatch);
};

// Connects the above mappings to the component
export default connect(mapStateToProps, mapDispatchToProps)(ShrinkingCircle);
