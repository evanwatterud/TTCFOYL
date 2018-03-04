import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementScore, resetScore } from '../actions/scoreActions';
import { stopPlaying } from '../actions/playingActions';
import { decrementLives } from '../actions/livesActions';
import { removeCircle } from '../actions/circlesActions';

class ShrinkingCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: props.size }
  }

  componentDidMount() {
    this._mounted = true;
    // The circle shrinks every tick of this time interval
    var interval = setInterval(() => {
      if (this.state.size <= 2) { // Check if the circle is small enough to be deleted
        this.props.decrementLives();
        this.props.removeCircle(this.props.location);
        clearInterval(interval);
      } else if (this._mounted == true){ // If the circle is sufficient size, shrink by 0.5
        this.setState({ size: this.state.size - 0.5 });
      }
    }, 10);
  }

  componentWillUnmount() {
    // If the circle is being deleted and lives are at 0, the player lost, so stop playing
    if (this.props.lives == 0) {
      this.props.stopPlaying();
    }
    this._mounted = false;
  }

  render() {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: this.props.size,
        width: this.props.size,
        top: this.props.location.y,
        left: this.props.location.x,
        position: 'absolute',
      }}>
        <TouchableWithoutFeedback onPress={() => {
          this.props.incrementScore();
          this.props.removeCircle(this.props.location);
        }} >
        <View style={{
          backgroundColor: 'red',
          position: 'absolute',
          height: this.state.size,
          width: this.state.size,
          borderRadius: this.state.size/2,
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
    removeCircle: removeCircle,
    stopPlaying: stopPlaying
  }, dispatch);
};

// Connects the above mappings to the component
export default connect(mapStateToProps, mapDispatchToProps)(ShrinkingCircle);
