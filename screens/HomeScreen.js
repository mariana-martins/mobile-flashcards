import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function HomeScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Button title="Go to Quiz" onPress={() => navigation.navigate('Quiz')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
