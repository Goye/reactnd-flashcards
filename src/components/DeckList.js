import React from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import mockData from '../data';
import { setItem, getDecks } from '../utils/api';
import { purple, white } from '../styles/colors';
import styles from '../styles';

export default class DeckList extends React.Component {
    state = {
      data: []
    }

    async componentDidMount() {
      const res = await getDecks();
      //Add dummy data just the first time
      if (!res) setItem(mockData)
      this.setState({ data: res ? res : mockData });
    }

    render() {
      const { navigate } = this.props.navigation;
      const { data } = this.state;
      return (
        <ScrollView>
          <List>
            {Object.keys(data).map((key) => {
              return (
                <ListItem
                  key={key}
                  title={key}
                  badge={{
                    value: data[key] ? data[key]['questions'].length : 0,
                    containerStyle: styles.item,
                    textStyle: styles.textList
                  }}
                  onPress={() => navigate('Deck', { deck: data[key] })}
                />
              )
            })}
          </List>
          <Button
            large={false}
            borderRadius={10}
            backgroundColor={purple}
            icon={{ name: 'playlist-add' }}
            title="Add New Deck"
            style={styles.button}
            onPress={() => navigate('NewDeck', { new: true })}
          />
      </ScrollView>
      );
    }
}
