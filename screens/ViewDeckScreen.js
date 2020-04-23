import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getDeck } from '../utils/api';

export default function ViewDeckScreen(props) {
  const { navigation, route } = props;
  const { title } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [deck, setDeck] = useState();

  useEffect(() => {
    getDeck(title)
      .then((data) => setDeck(data))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{deck && deck.title ? deck.title : 'No name'}</Text>
      <Text>
        {deck && deck.questions ? `${deck.questions.length} cards` : 'No cards'}
      </Text>
      <Button
        title="Add Card"
        onPress={() => navigation.navigate('New Question', { title })}
      />
      <Button
        title="Start Quiz"
        onPress={() => navigation.navigate('Quiz', { title })}
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
