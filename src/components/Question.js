import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Text,
  Card
} from 'react-native-elements';
import { green } from '../utils/colors';
import { addCardToDeck } from '../utils/api';

const RenderField = props => {
  const { label, onInputChange, ...otherProps } = props;
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <FormInput
        onChangeText={onInputChange}
        {...otherProps}
      />
    </View>
  );
};

const NewCard = ({ error, onQuestionChange, onAnswerChange, addNewCard }) => {
  return (
    <View style={{flex: 1}}>
      <RenderField
        name="question"
        label="Question"
        placeholder="Please write a question"
        onInputChange={onQuestionChange}
      />
      <RenderField
        name="answer"
        label="Answer"
        placeholder="Please write an answer"
        onInputChange={onAnswerChange}
      />
      <FormValidationMessage paddingBottom={10}>
        {error ? error : null}
      </FormValidationMessage>
      <Button
        large={false}
        title="Add New Card"
        borderRadius={10}
        backgroundColor={green}
        icon={{ name: 'add-circle-outline' }}
        onPress={addNewCard}
      />
    </View>
  );
};

const CardRender = ({ data, current, showAnswer, onToggleChange }) => {
  const { question, answer } = data;
  return (
    <Card>
      <View>
        <Switch
          value={showAnswer}
          onValueChange={onToggleChange}
        />
        <Text h5>Show Answer</Text>
      </View>
      <Text h6>{`Question # ${current + 1}`}</Text>
      <Text h3>{question}</Text>
      {showAnswer && (
        <Text h4 style={styles.answer}>{answer}</Text>
      )}
    </Card>
  );
};

export default class Question extends React.Component {
  state = {
    question: '',
    answer: '',
    showAnswer: false,
    error: false
  };

  handleSubmit = async (deck) => {
    const { question, answer } = this.state;
    const { title } = deck;
    const { navigate } = this.props.navigation;
    const error = this.validateFields();
    if (!error) {
      const card = { question, answer };
      const newDeck = await addCardToDeck(title, card);
      if (newDeck) {
        navigate('Deck', { deck: newDeck });
      }
    }
  };

  validateFields = () => {
    const { question, answer } = this.state;
    let error = false;
    if (!question || !question.trim()) {
      this.setState({ error: 'Question should not be empty' })
      error = true;
    } else if (!answer || !answer.trim()) {
      this.setState({ error: 'Answer should not be empty' })
      error = true;
    } else {
      this.setState({ error: false });
      error = false;
    }
    return error;
  }

  onQuestionChange = (question) => {
    this.setState({ question });
  }

  onAnswerChange = (answer) => {
    this.setState({ answer });
  }

  addNewCard = (deck) => {
    this.handleSubmit(deck);
  }

  onToggleChange = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  render() {
    const { navigation: { state: { params } }, data, current } = this.props;
    const { error, showAnswer } = this.state;
    if (params && params.new) {
      return (
        <NewCard 
          onQuestionChange={this.onQuestionChange}
          onAnswerChange={this.onAnswerChange}
          addNewCard={() => this.addNewCard(params.deck)}
          error={error}
        />
      );
    } else {
      return (
        <CardRender 
          data={data} 
          current={current}
          showAnswer={showAnswer}
          onToggleChange={this.onToggleChange} 
        />
      );
    } 
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  }
});