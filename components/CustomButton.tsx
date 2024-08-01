import React, { useState } from 'react';
import { Animated } from 'react-native';
import {
  
  TouchableOpacity,
} from 'react-native';
import { Button, Text, } from 'react-native-paper';

const primary = '#0064E0'

export const COLORS = {
  background: '#051A2F',
  text: 'white',
  error: 'red',
  warning: '#FCBF02',
  utility: '#86868C',
  primary: {
    primary: primary,
    light: '#449EE9'
  }
};

export const CustomButton = ({ loading, onPress, mode, buttonColor, style, text, textColor = "white" }) => {

  const [scaleValue] = useState(new Animated.Value(1));

  const shrink = () => {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const reset = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity style={{ width: '100%', marginVertical: 10 }}
      onPressIn={shrink}
      onPressOut={reset}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }} >
        <Button loading={loading} mode={mode} style={[style, { padding: 4, borderRadius: 50 }]} buttonColor={buttonColor} onPress={onPress}><Text style={{ color: textColor }}>{text}</Text></Button>
      </Animated.View>
    </TouchableOpacity>
  )
}