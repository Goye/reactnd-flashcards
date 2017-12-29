import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { white, blue, red } from './src/utils/colors';
import Deck from './src/components/Deck';
import DeckList from './src/components/DeckList';
import Question from './src/components/Question';
import Quiz from './src/components/Quiz';

const navigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: blue,
    paddingBottom: 15
  }
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      ...navigationOptions,
      title: "Flash Cards App"
    }
  },
  NewDeck: {
    screen: Deck,
    navigationOptions: {
      ...navigationOptions,
      title: 'New Deck'
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      ...navigationOptions,
      title: 'Deck'
    }
  },
  NewQuestion: {
    screen: Question,
    navigationOptions: {
      ...navigationOptions,
      title: 'New Question'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      ...navigationOptions,
      title: 'Quiz'
    }
  },
});

const MainStatusBar = ({ backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: 20 }} >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainStatusBar backgroundColor={blue} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
