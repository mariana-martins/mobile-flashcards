import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ViewDeckScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
