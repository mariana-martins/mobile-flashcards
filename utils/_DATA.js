import { AsyncStorage } from 'react-native';

const KEY = 'mobile-flashcards';

async function _get() {
  const data = (await AsyncStorage.getItem(KEY)) || '{}';
  return JSON.parse(data);
}

async function _append(key, value) {
  const data = await _get();
  console.log('SAVE', key, value);
  return await AsyncStorage.setItem(
    KEY,
    JSON.stringify({
      ...data,
      [key]: value,
    })
  );
}

export async function _getDecks() {
  const data = await _get();
  return Object.values(data);
}
export async function _getDeck(id) {
  const data = await _get();
  return data[id];
}
export function _saveDeckTitle(title) {
  return _append(title, { title, questions: [] });
}
export async function _addCardToDeck(title, card) {
  const deck = await _getDeck(title);
  return await _append(title, {
    ...deck,
    questions: [...deck.questions, card],
  });
}
