import { _addCardToDeck, _getDeck, _getDecks, _saveDeckTitle } from './_DATA';

export function getDecks() {
  return _getDecks();
}
export function getDeck(id) {
  return _getDeck(id);
}
export function saveDeckTitle(title) {
  return _saveDeckTitle(title);
}
export function addCardToDeck(title, question, answer) {
  return _addCardToDeck(title, { question, answer });
}
