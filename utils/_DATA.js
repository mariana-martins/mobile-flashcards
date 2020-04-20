import AsyncStorage from '@react-native-community/async-storage';

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

const KEY = 'mobile-flashcards';

async function _get() {
  return (await AsyncStorage.getItem(KEY)) || {};
}

async function _append(key, value) {
  const data = await _get();
  await AsyncStorage.setItem({
    ...data,
    [key]: value,
  });
}

export async function _getDecks() {
  const data = await _get();
  return Object.values(data);
}
export async function _getDeck(id) {
  const data = await _get();
  return data[id];
}
export async function _saveDeckTitle(title) {
  await _append(title, { title, questions: [] });
}
export async function _addCardToDeck(title, card) {
  const deck = await _getDeck(title);
  await _append(title, {
    ...deck,
    questions: [...deck.questions, card],
  });
}
