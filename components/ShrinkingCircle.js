import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { CIRCLE_SIZE } from '../utils/config.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementScore, resetScore } from '../actions/scoreActions';
import { decrementLives, resetLives } from '../actions/livesActions';
import { removeCircle } from '../actions/circlesActions';

class ShrinkingCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: CIRCLE_SIZE }

    var interval = setInterval(() => {
      if (this.state.size == 2) {
        props.decrementLives();
        props.removeCircle(props.location);
        clearInterval(interval);
      } else if (this._mounted == true){
        this.setState({ size: this.state.size - 0.5 });
      }
    }, 10);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: CIRCLE_SIZE,
        width: CIRCLE_SIZE,
        top: this.props.location.y,
        left: this.props.location.x,
        position: 'absolute',
      }}>
        <TouchableWithoutFeedback onPress={() => {
          this.props.incrementScore();
          this.props.removeCircle(this.props.location);
        }} >
        <View style={{
          backgroundColor: 'midnightblue',
          position: 'absolute',
          height: this.state.size,
          width: this.state.size,
          borderRadius: this.state.size/2
        }} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

// Map redux state to the ShrinkingCircle props
const mapStateToProps = (state) => ({
  score: state.score,
  lives: state.lives,
  circles: state.circles
});

// Map redux dispatch functions to the ShrinkingCircle props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    incrementScore: incrementScore,
    resetScore: resetScore,
    decrementLives: decrementLives,
    resetLives: resetLives,
    removeCircle: removeCircle
  }, dispatch);
};

// Connects the above mappings to the component
export default connect(mapStateToProps, mapDispatchToProps)(ShrinkingCircle);
