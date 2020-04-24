import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native';
import { getDecks } from '../utils/api';
import { StyledButton } from '../components/StyledButton';

export default function HomeScreen(props) {
  const { navigation, route } = props;

  const [isLoading, setLoading] = useState(true);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    getDecks()
      .then((data) => setDecks(data))
      .finally(() => setLoading(false));
  }, [route.params?.timestamp]);

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
          <StyledButton
            style={{ margin: 5, backgroundColor: '#ff6363' }}
            title={`${item.title} (${item.questions.length} items)`}
            onPress={() =>
              navigation.navigate('View Deck', {
                title: item.title,
              })
            }
          />
        )}
      />
      <StyledButton
        title="Add New Deck"
        onPress={() => navigation.navigate('New Deck')}
        color={'#000'}
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
