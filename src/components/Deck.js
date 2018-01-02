import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Text
} from 'react-native-elements';
import { green, red, purple } from '../utils/colors';
import { getDecks, saveDeckTitle } from '../utils/api';

const RenderNewDeck = ({ onPressButton, onInputChange, error }) => {
  return (
    <View style={{flex: 1}}>
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
        borderRadius={10}
        backgroundColor={green}
        icon={{ name: 'playlist-add' }}
        title="Add New Deck"
        onPress={onPressButton}
      />
    </View>
  );
};

const RenderDeck = ({ deck }) => {
  const { title, questions } = deck;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.title}>
        <Text h2>{`${title}`}</Text>
        <Text h5>{`${questions.length} cards`}</Text>
      </View>
      <Button
        large
        title="Add New Card"
        borderRadius={10}
        backgroundColor={red}
        icon={{ name: 'add-circle-outline' }}
        style={styles.button}
        onPress={() => console.log('add new card')}
      />
      {questions.length > 0 && (
        <Button
          large
          title="Start Quiz"
          borderRadius={10}
          backgroundColor={purple}
          icon={{ name: 'play-circle-outline' }}
          style={styles.button}
          onPress={() => console.log('start quiz')}
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
      const data = await saveDeckTitle(title);
      if (!data) {
        navigate('Home');
      }
    }
  };

  validateTitle = async () => {
    const { title } = this.state;
    const decks = await getDecks();
    const deckNames = Object.keys(JSON.parse(decks));
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

  render() {
    const { navigation: { state: { params } } } = this.props;
    const { error } = this.state;  
    if (params.new) {
      return (
        <RenderNewDeck 
          onInputChange={this.onInputChange} 
          onPressButton={this.onPressButton} 
          error={error} 
        />
      );
    } else {
      return <RenderDeck deck={params.deck} />
    }    
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    alignItems: 'center'
  },
  button: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20
  }
});