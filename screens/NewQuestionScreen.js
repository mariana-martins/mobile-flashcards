import React, { useState } from 'react';
import { addCardToDeck } from '../utils/api';
import { StyledView } from '../components/StyledView';
import { Title } from '../components/StyledText';
import { StyledTextInput } from '../components/StyledTextInput';
import { StyledButton } from '../components/StyledButton';

export default function NewQuestionScreen(props) {
  const { navigation, route } = props;
  const { title } = route.params;

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const addQuestion = () => {
    addCardToDeck(title, question, answer).then(() =>
      navigation.navigate('View Deck', {
        title,
        timestamp: Date.now(),
      })
    );
  };

  return (
    <StyledView>
      <Title>Question?</Title>
      <StyledTextInput
        onChangeText={(text) => setQuestion(text)}
        value={question}
      />
      <Title>Answer?</Title>
      <StyledTextInput
        onChangeText={(text) => setAnswer(text)}
        value={answer}
      />
      <StyledButton
        title="Add New Question"
        onPress={addQuestion}
        disabled={question === '' || answer === ''}
      />
    </StyledView>
  );
}
