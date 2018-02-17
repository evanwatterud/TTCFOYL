import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class InfoBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.barContainer}>
        <Text style={styles.scoreText} >Score: {this.props.score}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scoreText: {
    fontWeight: 'bold',
  },

  barContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
