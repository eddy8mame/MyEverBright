import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const CustomBackButton = ({ onPress, style }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Ionicons name="chevron-back" size={28} color={'white'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    marginLeft: -18,
    backgroundColor: 'transparent'
  },
});

export default CustomBackButton