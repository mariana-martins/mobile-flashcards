import React, { useState } from 'react';
import { saveDeckTitle } from '../utils/api';
import { StyledButton } from '../components/StyledButton';
import { Title } from '../components/StyledText';
import { StyledTextInput } from '../components/StyledTextInput';
import { StyledView } from '../components/StyledView';

export default function NewDeckScreen(props) {
  const { navigation } = props;

  const [title, setTitle] = useState('');

  const addDeck = () => {
    if (title.trim() !== '') {
      saveDeckTitle(title.trim()).then(() =>
        navigation.navigate('Home', {
          timestamp: Date.now(),
        })
      );
    }
  };

  return (
    <StyledView>
      <Title>Add new deck title</Title>
      <StyledTextInput onChangeText={(text) => setTitle(text)} value={title} />
      <StyledButton title="Add New Deck" onPress={addDeck} />
    </StyledView>
  );
}
