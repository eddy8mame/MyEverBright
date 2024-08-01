import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Text, TextInput, } from 'react-native-paper';

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


export const CustomInput = forwardRef(({
  className,
  onBlur = () => { },
  value = '',
  onChangeText = () => { },
  onFocus = () => { },
  style = {},
  outlineStyle = {},
  mode = 'flat',
  label = '',
  placeholder = '',
  secureTextEntry = false,
  error = false,
  errorMessage = "",
  ...props
}, ref) => {
  const inputRef = React.useRef(ref);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }))
  const commonStyles = {
    backgroundColor: CUSTOM_INPUT_COLORS.backgroundColor,
    borderRadius: 12,
  };

  const [isSecure, setIsSecure] = useState(secureTextEntry)

  const clearText = () => {
    onChangeText("")
  }

  const toggleSecureTextEntry = () => {
    setIsSecure((isSecure) => !isSecure)
  }

  const renderIcon = () => {
    if (!value && !error) return null;

    if (error) {
      return <TextInput.Icon icon="alert-circle-outline" color={CUSTOM_INPUT_COLORS.error} />
    }

    return secureTextEntry ? (
      <TextInput.Icon
        icon={isSecure ? 'eye-off' : 'eye'}
        onPress={toggleSecureTextEntry}
        rippleColor='transparent'
      />) : error ? (<TextInput.Icon icon="exclamation-circle" rippleColor='transparent' />) : (<TextInput.Icon icon="close" onPress={clearText} rippleColor='transparent' />
      )
  }

  const errorStyles = error ? {
    borderColor: CUSTOM_INPUT_COLORS.error,
    // borderWidth: 1, 
  } : {}

  return (
    <View>
      <TextInput
        {...props}
        className={`${className}`}
        error={error}
        ref={inputRef}
        onBlur={onBlur}
        mode={mode}
        placeholder={placeholder}
        label={label}
        style={[CUSTOM_INPUT_STYLES.input, commonStyles, style, errorStyles]}
        outlineStyle={mode === 'outlined' ? { ...commonStyles, ...outlineStyle, ...errorStyles } : {}}
        underlineStyle={mode === 'flat' ? { ...commonStyles, ...outlineStyle } : {}}
        selectionColor={CUSTOM_INPUT_COLORS.selectionColor}
        outlineColor={error ? CUSTOM_INPUT_COLORS.error : CUSTOM_INPUT_COLORS.outlineColor}
        activeOutlineColor={error ? CUSTOM_INPUT_COLORS.error : CUSTOM_INPUT_COLORS.activeOutlineColor}
        underlineColor={error ? CUSTOM_INPUT_COLORS.error : CUSTOM_INPUT_COLORS.outlineColor}
        secureTextEntry={isSecure}
        value={value}
        onFocus={onFocus}
        onChangeText={(text) => {
          onChangeText(text.trim())
        }}
        right={renderIcon()}
        theme={{
          colors: {
            onSurfaceVariant: error ? CUSTOM_INPUT_COLORS.error : CUSTOM_INPUT_COLORS.labelColor,
            error: CUSTOM_INPUT_COLORS.error,
          },
        }}
      />
      {error && errorMessage && (
        <Text style={CUSTOM_INPUT_STYLES.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  )
});

export const CUSTOM_INPUT_COLORS = {
  backgroundColor: '#1C2B33',
  selectionColor: "white",
  outlineColor: "#354652",
  activeOutlineColor: "#98A2A8",
  labelColor: "#5F717E",
  error: 'red'
};

export const CUSTOM_INPUT_STYLES = StyleSheet.create({
  input: {
    backgroundColor: CUSTOM_INPUT_COLORS.backgroundColor,
    borderColor: 'red'
  },
  errorMessage: {
    color: CUSTOM_INPUT_COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});