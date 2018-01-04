import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AnimateNumber from 'react-native-animate-number';
import Question from './Question';
import { green, red, purple } from '../styles/colors';
import styles from '../styles';
import { clearLocalNotification, setLocalNotification } from '../utils';

const RenderQuestion = ({ navigation, data, current, total, onButtonPressed }) => {
  return (
    <View>
      <Question 
        navigation={navigation} 
        data={data}
        current={current}
        total={total}
      />
      <View style={styles.buttonContainer}>
        <Button
          large={true}
          borderRadius={10}
          backgroundColor={green}
          icon={{ name: 'check-circle' }}
          title="Correct"
          onPress={() => onButtonPressed(true)}
        />
        <Button
          large={true}
          borderRadius={10}
          backgroundColor={red}
          icon={{ name: 'cancel' }}
          title="Incorrect"
          onPress={() => onButtonPressed(false)}
        />
      </View>
    </View>
  );
};

const ShowResults = ({ correct, incorrect, total, onRestartPress, onReturnPress }) => {
  const result = correct * 100 / total;
  //Logic for local notification
  clearLocalNotification().then(setLocalNotification);
  return (
    <View style={styles.resultContainer}>
      <Text h4>Result</Text>
      <Text h1>
        <AnimateNumber
          value={result}
          interval={5}
          formatter={(score) => `${score.toFixed(2)} %`}
        />
      </Text>
      <Text h4 style={{ color: green }}>Correct: {correct}</Text>
      <Text h4 style={{ color: red }}>Incorrect: {incorrect}</Text>
      <View style={styles.button}>
        <Button
          large={false}
          borderRadius={10}
          buttonStyle={styles.quizButton}
          backgroundColor={purple}
          icon={{ name: 'replay' }}
          title="Restart Quiz"
          onPress={onRestartPress}
        />
        <Button
          large={false}
          borderRadius={10}
          backgroundColor={red}
          icon={{ name: 'assignment-return' }}
          title="Return to Deck"
          onPress={onReturnPress}
        />
      </View>
    </View>
  );
};

const initialState = {
  current: 0,
  correct: 0,
  incorrect: 0
};
export default class Quiz extends React.Component {
  state = {
    ...initialState
  }

  onButtonPressed = (value) => {
    const label = value ? 'correct' : 'incorrect';
    this.setState({
      [label]: this.state[label]+1,
      current: this.state.current+1
    });
  };

  onRestartPress = (deck) => {
    const { navigate } = this.props.navigation;
    this.setState({...initialState});
    navigate('Quiz', { deck });
  };

  onReturnPress = (deck) => {
    const { navigate } = this.props.navigation;
    navigate('Deck', { deck });
  };

  render() {
    const { current, correct, incorrect } = this.state;
    const { navigation: { state: { params } } } = this.props;
    const deck = params.deck;
    const { questions } = deck;
    const currentQuestion = questions[current];
    if (current < questions.length) {
      return (
        <RenderQuestion 
          navigation={this.props.navigation} 
          data={currentQuestion}
          current={current}
          total={questions.length}
          onButtonPressed={(val) => this.onButtonPressed(val)}
        />
      );
    } else {
      return (
        <ShowResults 
          correct={correct}
          incorrect={incorrect}
          total={current}
          onRestartPress={() => this.onRestartPress(deck)}
          onReturnPress={() => this.onReturnPress(deck)}
        />
      );
    }
    
  }
}
