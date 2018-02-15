import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementScore, resetScore} from '../actions/scoreActions';

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
      <Text>{this.props.score}</Text>
      <Button
        onPress={() => {
          this.props.incrementScore();
          console.log(this.props)
        }}
        title="Increment"
      />
      </View>
    )
  }
}

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
