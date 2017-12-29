import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import data from '../data';
import { setItem, getItem } from '../utils/api';
import { purple, white } from '../utils/colors';

export default class DeckList extends React.Component {
    componentDidMount() {
      getItem()
      .then((res) => {
        //Add dummy data just the first time
        if (!res) setItem(data)
      });
    }

    render() {
      return (
        <View>
          <List>
            {Object.keys(data).map((key) => {
              return (
                <ListItem
                  key={key}
                  title={key}
                  badge={{
                    value: data[key]['questions'].length,
                    containerStyle: styles.item,
                    textStyle: styles.textList
                  }}
                  onPress={() => console.log('pressed')}
                />
              )
            })}
          </List>
          <Button
            large
            borderRadius={10}
            backgroundColor={purple}
            icon={{ name: 'playlist-add' }}
            title="Add New Deck"
            style={styles.button}
            onPress={() => console.log('new deck pressed')}
          />
      </View>
      );
    }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: purple
  },
  textList: {
    color: `${white}`
  },
  button: {
    flex: 1,
    marginTop: 20
  }
});