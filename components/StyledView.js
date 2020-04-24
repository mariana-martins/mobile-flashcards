import React from 'react';
import { StyleSheet, View } from 'react-native';

export function StyledView(props) {
  return <View {...props} style={[styles.styledView, props.style]} />;
}

const styles = StyleSheet.create({
  styledView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
