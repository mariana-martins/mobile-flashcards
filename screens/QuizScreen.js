import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getDeck } from '../utils/api';
import { StyledView } from '../components/StyledView';
import { Subtitle, Title } from '../components/StyledText';
import { StyledButton } from '../components/StyledButton';
import { skipTodayLocalNotification } from '../utils/helpers';

export default function QuizScreen(props) {
  const { navigation, route } = props;
  const { title } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [deck, setDeck] = useState();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [pointer, setPointer] = useState(0);
  const [viewQuestion, setViewQuestion] = useState(true);

  useEffect(() => {
    getDeck(title)
      .then((data) => setDeck(data))
      .finally(() => setLoading(false));
  }, [route.params?.timestamp]);

  const restartQuiz = () => {
    setViewQuestion(true);
    setCorrectAnswers(0);
    setPointer(0);
  };

  const answerQuestion = (answer) => {
    if (answer === true) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setPointer(pointer + 1);
    setViewQuestion(true);
  };

  if (isLoading) {
    return (
      <StyledView>
        <Title>Loading...</Title>
      </StyledView>
    );
  }

  if (pointer < deck.questions.length) {
    const { question, answer } = deck.questions[pointer];
    return (
      <StyledView>
        <Subtitle>
          {pointer + 1}/{deck.questions.length}
        </Subtitle>
        <Title>{viewQuestion ? question : answer}</Title>
        <StyledButton
          style={styles.baseButton}
          title={`View ${viewQuestion ? 'answer' : 'question'}`}
          onPress={() => setViewQuestion(!viewQuestion)}
        />
        <StyledButton
          style={styles.primaryButton}
          title="Correct"
          onPress={() => answerQuestion(true)}
        />
        <StyledButton
          style={styles.secondaryButton}
          title="Incorrect"
          onPress={() => answerQuestion(false)}
        />
      </StyledView>
    );
  }

  skipTodayLocalNotification();
  return (
    <StyledView>
      <Title>Quiz finished!!!</Title>
      <Subtitle>Result:</Subtitle>
      <Subtitle>Total: {deck.questions.length}</Subtitle>
      <Subtitle>
        Correct: {correctAnswers} (
        {((100 * correctAnswers) / deck.questions.length).toFixed(2)} %)
      </Subtitle>
      <StyledButton
        style={styles.primaryButton}
        title="Restart Quiz"
        onPress={restartQuiz}
      />
      <StyledButton
        style={styles.secondaryButton}
        title="Go back to Deck"
        onPress={() =>
          navigation.navigate('View Deck', { timestamp: Date.now() })
        }
      />
    </StyledView>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    marginTop: 10,
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: '#ffbd69',
  },
  secondaryButton: {
    marginTop: 10,
    backgroundColor: '#ff6363',
  },
});
