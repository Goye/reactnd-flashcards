import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AnimateNumber from 'react-native-animate-number';
import Question from './Question';
import { green, red } from '../utils/colors';

const RenderQuestion = ({ navigation, data, current, onButtonPressed }) => {
  return (
    <View>
      <Question 
        navigation={navigation} 
        data={data}
        current={current}
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

const ShowResults = ({ correct, incorrect, total }) => {
  const result = correct * 100 / total;
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
    </View>
  );
};

export default class Quiz extends React.Component {
  state = {
    current: 0,
    correct: 0,
    incorrect: 0
  }

  onButtonPressed = (value) => {
    const label = value ? 'correct' : 'incorrect';
    this.setState({
      [label]: this.state[label]+1,
      current: this.state.current+1
    });
  }

  render() {
    const { current, correct, incorrect } = this.state;
    const { navigation: { state: { params } } } = this.props;
    const questions = params.questions;
    const currentQuestion = questions[current];
    if (current < questions.length) {
      return (
        <RenderQuestion 
          navigation={this.props.navigation} 
          data={currentQuestion}
          current={current}
          onButtonPressed={(val) => this.onButtonPressed(val)}
        />
      );
    } else {
      return (
        <ShowResults 
          correct={correct}
          incorrect={incorrect}
          total={current}
        />
      );
    }
    
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});