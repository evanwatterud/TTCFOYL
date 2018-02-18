import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class InfoBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.barContainer}>
        <Text style={styles.infoText} >Score: {this.props.score}</Text>
        <Text style={styles.infoText} >Lives: {this.props.lives}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  infoText: {
    fontWeight: 'bold',
  },

  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
