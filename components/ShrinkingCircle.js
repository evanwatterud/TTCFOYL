import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { CIRCLE_SIZE } from '../utils/config.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementScore, resetScore } from '../actions/scoreActions';

class ShrinkingCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: CIRCLE_SIZE, active: true }

    var interval = setInterval(() => {
      if (this.state.size == 2) {
        clearInterval(interval);
        this.setState({ size: this.state.size, active: false })
      } else {
        this.setState({ size: this.state.size - 0.5, active: true });
      }
    }, 10);
  }

  render() {
    if (this.state.active == true) {
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
          <TouchableWithoutFeedback onPress={() => {this.props.incrementScore()}} >
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
    } else {
      return null
    }
  }
}

// Map redux state to the ShrinkingCircle props
const mapStateToProps = (state) => ({
  score: state.score
});

// Map redux dispatch functions to the ShrinkingCircle props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    incrementScore: incrementScore,
    resetScore: resetScore
  }, dispatch);
};

// Connects the above mappings to the component
export default connect(mapStateToProps, mapDispatchToProps)(ShrinkingCircle);
