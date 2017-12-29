import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'flashCards:decks';

export function setItem(data) {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
}

export function getItem() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((result) => result)
}

//TODO add logic
export function getDecks() {
}

export function getDeck(name) {
}

export function saveDeckTitle(title) {
}

export function addCardToDeck(name, card) {
}