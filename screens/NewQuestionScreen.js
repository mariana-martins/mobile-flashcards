import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { addCardToDeck } from '../utils/api';

export default function NewQuestionScreen(props) {
  const { navigation, route } = props;
  const { title } = route.params;

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const addQuestion = () => {
    addCardToDeck(title, question, answer).then(() =>
      navigation.navigate('View Deck', {
        title,
        operation: `Added new question '${question}' = '${answer}'`,
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text>Question?</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => setQuestion(text)}
        value={question}
      />
      <Text>Answer?</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => setAnswer(text)}
        value={answer}
      />
      <Button
        title="Add New Question"
        onPress={addQuestion}
        disabled={question === '' && answer === ''}
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
