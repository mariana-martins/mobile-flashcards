import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { saveDeckTitle } from '../utils/api';

export default function NewDeckScreen(props) {
  const { navigation } = props;

  const [title, setTitle] = useState('');

  const addDeck = () => {
    saveDeckTitle(title).then(() =>
      navigation.navigate('Home', {
        operation: `Added new deck called '${title}'`,
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text>Add new deck title</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Button title="Add New Deck" onPress={addDeck} disabled={title === ''} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
