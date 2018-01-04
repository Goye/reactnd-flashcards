import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Text
} from 'react-native-elements';
import { green, red, purple } from '../styles/colors';
import { getDecks, saveDeckTitle } from '../utils/api';
import styles from '../styles';

const RenderNewDeck = ({ onPressButton, onInputChange, error }) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <FormLabel>Deck title</FormLabel>
      <FormInput
        onChangeText={onInputChange}
        name="deckTitle"
        placeholder="Please enter a Deck Title"
      />
      <FormValidationMessage paddingBottom={10}>
        {error ? error : null}
      </FormValidationMessage>
      <Button
        large={false}
        borderRadius={10}
        backgroundColor={green}
        icon={{ name: 'playlist-add' }}
        title="Add New Deck"
        onPress={onPressButton}
      />
    </KeyboardAvoidingView>
  );
};

const RenderDeck = ({ deck, onNewQuestion, onQuizStart }) => {
  const { title, questions } = deck;
  
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text h2>{`${title}`}</Text>
        <Text h5>{`${questions.length} cards`}</Text>
      </View>
      <Button
        large={false}
        title="Add New Card"
        borderRadius={10}
        backgroundColor={red}
        icon={{ name: 'add-circle-outline' }}
        style={styles.deckButton}
        onPress={onNewQuestion}
      />
      {questions.length > 0 && (
        <Button
          large={false}
          title="Start Quiz"
          borderRadius={10}
          backgroundColor={purple}
          icon={{ name: 'play-circle-outline' }}
          style={styles.deckButton}
          onPress={onQuizStart}
        />
      )}
    </View>
  );
};
export default class Deck extends React.Component {
  state = {
    title: null,
    error: false
  }

  handleSubmit = async () => {
    const { title } = this.state;
    const { navigate } = this.props.navigation;
    const error = await this.validateTitle();
    if (!error) {
      const newDeck = await saveDeckTitle(title);
      if (newDeck) {
        navigate('Deck', { deck: newDeck });
      }
    }
  };

  validateTitle = async () => {
    const { title } = this.state;
    const decks = await getDecks();
    const deckNames = Object.keys(decks);
    if (!title) {
      this.setState({ error: 'Title should not be empty' })
      return true;
    } else if (deckNames.indexOf(title.trim()) !== -1) {
      this.setState({ error: `'${title}' name already exists` })
      return true;
    } else {
      this.setState({ error: false });
      return false;
    }
  }

  onPressButton = () => {
    this.handleSubmit();
  };

  onInputChange = (title) => {
    this.setState({ title });
  };

  onNewQuestion = (deck) => {
    const { navigate } = this.props.navigation;
    navigate('NewQuestion', { new: true, deck });
  }

  onQuizStart = (deck) => {
    const { navigate } = this.props.navigation;
    navigate('Quiz', { deck });
  }

  render() {
    const { navigation: { state: { params } } } = this.props;
    const { error } = this.state;
    const deck = params.deck;  
    if (params.new) {
      return (
        <RenderNewDeck 
          onInputChange={this.onInputChange} 
          onPressButton={this.onPressButton} 
          error={error} 
        />
      );
    } else {
      return (
        <RenderDeck 
          deck={deck} 
          onNewQuestion={() => this.onNewQuestion(deck)}
          onQuizStart={() => this.onQuizStart(deck)} 
        />
      );
    }    
  }
}
