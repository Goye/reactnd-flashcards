import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'flashCards:decks';

export async function setItem(data) {
    return await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
}

export async function getDecks() {
    const response = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const listOfTasks = await JSON.parse(response) || {};
    return listOfTasks;
}

export async function getDeck(name) {
    const decks = await getDecks();
    return decks[name] || {};
}

export async function saveDeckTitle(title) {
    const decks = await getDecks();
    const newDeck = {
        title,
        questions: []
    };
    decks[title] = newDeck
    await setItem(decks);
    return newDeck;
}

export async function addCardToDeck(name, card) {
    const decks = await getDecks();
    const questions = decks[name].questions || [];
    questions.push(card);
    //TODO use functional methods to avoid mutation
    await setItem(decks);
    return decks[name];
}