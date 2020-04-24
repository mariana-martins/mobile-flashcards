import React from 'react';

import { StyleSheet, TextInput } from 'react-native';

export function StyledTextInput(props) {
  return <TextInput {...props} style={[styles.styledText, props.style]} />;
}

const styles = StyleSheet.create({
  styledText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});
