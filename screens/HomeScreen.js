import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getDecks } from '../utils/api';
import { StyledButton } from '../components/StyledButton';
import { StyledView } from '../components/StyledView';
import { Title } from '../components/StyledText';

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
      <StyledView>
        <Title>Loading...</Title>
      </StyledView>
    );
  }

  return (
    <StyledView style={styles.view}>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <StyledButton
            style={styles.flatItemButton}
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
      />
    </StyledView>
  );
}

const styles = StyleSheet.create({
  flatItemButton: {
    margin: 5,
    backgroundColor: '#ff6363',
  },
  view: {
    padding: 0,
  },
});
