import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export const StyledButton = (props) => {
  const { title = 'Enter', style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#543864',
  },

  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
