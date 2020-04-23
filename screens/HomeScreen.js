import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native';
import { getDecks } from '../utils/api';

export default function HomeScreen(props) {
  const { navigation } = props;

  const [isLoading, setLoading] = useState(true);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    getDecks()
      .then((data) => setDecks(data))
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
      <FlatList
        data={decks}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Button
            title={`${item.title} (${item.questions.length} items)`}
            onPress={() =>
              navigation.navigate('View Deck', {
                title: item.title,
              })
            }
          />
        )}
      />
      <Button
        title="Add New Deck"
        onPress={() => navigation.navigate('New Deck')}
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
