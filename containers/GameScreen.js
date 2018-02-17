import React from 'react';
import { Text, View, Button, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementScore, resetScore } from '../actions/scoreActions';
import InfoBar from '../components/InfoBar.js';
import ShrinkingCircle from '../components/ShrinkingCircle.js'

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
        <ShrinkingCircle />
      </View>
    )
  }
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
