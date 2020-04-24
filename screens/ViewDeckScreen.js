import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getDeck } from '../utils/api';
import { StyledView } from '../components/StyledView';
import { StyledButton } from '../components/StyledButton';
import { Title, Subtitle } from '../components/StyledText';

export default function ViewDeckScreen(props) {
  const { navigation, route } = props;
  const { title } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [deck, setDeck] = useState();

  useEffect(() => {
    getDeck(title)
      .then((data) => setDeck(data))
      .finally(() => setLoading(false));
  }, [route.params?.timestamp]);

  if (isLoading) {
    return (
      <StyledView>
        <Title>Loading...</Title>
      </StyledView>
    );
  }

  return (
    <StyledView>
      <Title>{deck && deck.title ? deck.title : 'No name'}</Title>
      <Subtitle>
        {deck && deck.questions ? `${deck.questions.length} cards` : 'No cards'}
      </Subtitle>
      <StyledButton
        style={styles.addCardButton}
        title="Add Card"
        onPress={() => navigation.navigate('New Question', { title })}
      />
      <StyledButton
        style={styles.startQuizButton}
        title="Start Quiz"
        onPress={() => navigation.navigate('Quiz', { title })}
      />
    </StyledView>
  );
}

const styles = StyleSheet.create({
  addCardButton: {
    marginTop: 20,
  },
  startQuizButton: {
    backgroundColor: '#ffbd69',
    marginTop: 20,
  },
});
