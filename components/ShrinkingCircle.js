import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CIRCLE_SIZE } from '../utils/config.js';

export default class ShrinkingCircle extends React.Component {
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
          <View style={{
            backgroundColor: 'midnightblue',
            position: 'absolute',
            height: this.state.size,
            width: this.state.size,
            borderRadius: this.state.size/2
          }} />
        </View>
      )
    } else {
      return null
    }
  }
}
