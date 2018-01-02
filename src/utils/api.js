import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'flashCards:decks';

export function setItem(data) {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
}

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((result) => result)
}

export function getDeck(name) {
}

export function saveDeckTitle(title) {
    return getDecks()
       .then((data) => {
        const decks = JSON.parse(data);
        decks[title] = {
            title,
            questions: []
        };
        return setItem(decks);
    })
}

export function addCardToDeck(name, card) {
}