import React from 'react';
import { Text, View } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import { green } from '../utils/colors';
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

const RenderDeck = () => {
  return (
    <View>
      <Text>I'm a simple view</Text>
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
      return <RenderDeck />
    }    
  }
}