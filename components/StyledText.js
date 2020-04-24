import React from 'react';
import { StyleSheet, Text } from 'react-native';

export function Title(props) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

export function Subtitle(props) {
  return <Text {...props} style={[styles.subtitle, props.style]} />;
}

const styles = StyleSheet.create({
  title: { fontSize: 24, marginTop: 10, marginBottom: 10 },
  subtitle: { fontSize: 16, marginTop: 10, marginBottom: 10 },
});
