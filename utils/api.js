import { _addCardToDeck, _getDeck, _getDecks, _saveDeckTitle } from './_DATA';

export async function getDecks() {
  return await _getDecks();
}
export async function getDeck(id) {
  return await _getDeck(id);
}
export async function saveDeckTitle(title) {
  await _saveDeckTitle(title);
}
export async function addCardToDeck(title, question, answer) {
  await _addCardToDeck(title, { question, answer });
}
