import React from 'react';
import { StyleSheet, Text } from 'react-native';

export function Title(props) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

const styles = StyleSheet.create({
  title: { fontSize: 24, marginTop: 10, marginBottom: 10 },
});
