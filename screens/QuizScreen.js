import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getDeck } from '../utils/api';

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
  }, [route.params?.operation]);

  const answerQuestion = (answer) => {
    if (answer === true) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setPointer(pointer + 1);
    setViewQuestion(true);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (pointer < deck.questions.length) {
    const { question, answer } = deck.questions[pointer];
    return (
      <View style={styles.container}>
        <Text>
          {pointer + 1}/{deck.questions.length}
        </Text>
        <Text>{viewQuestion ? question : answer}</Text>
        <Button
          title={`View ${viewQuestion ? 'answer' : 'question'}`}
          onPress={() => setViewQuestion(!viewQuestion)}
        />
        <Button title="Correct" onPress={() => answerQuestion(true)} />
        <Button title="Incorrect" onPress={() => answerQuestion(false)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Quiz finished!!!</Text>
      <Text>Result:</Text>
      <Text>Total: {deck.questions.length}</Text>
      <Text>
        Correct: {correctAnswers} (
        {((100 * correctAnswers) / deck.questions.length).toFixed(2)} %)
      </Text>
      <Button
        title="Go back to Home"
        onPress={() =>
          navigation.navigate('Home', { operation: `Finished quiz ${title}` })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
