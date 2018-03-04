import React from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highscore: 0 };
  }

  static navigationOptions = {
    title: 'TTCFOYL'
  };

  componentWillMount() {
    this.getHighscore();
  }

  // Asynchronous function to get the users highscore from storage
  async getHighscore() {
    try {
      let highscore = await AsyncStorage.getItem('highscore');
      if (highscore != null) {
        this.setState({ highscore: highscore })
      }
    } catch (error) {
      console.log(error); // May add error reporting later
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('Game')}
          title="Play"
        />
        <Text>Highscore: {this.state.highscore}</Text>
      </View>
    );
  }
}
