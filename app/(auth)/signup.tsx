import React, { useState } from 'react';
import { Animated, TouchableWithoutFeedback, Keyboard, Image, Alert, Pressable } from 'react-native';
import {
  View, KeyboardAvoidingView,
  Platform,
  TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { Button, Text, TextInput, } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { CustomInput } from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import { theme } from '@/theme';
import CustomBackButton from '@/components/CustomBackButton';


// if press continue and the email is an empty string show error
const Signup = () => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const styles = useStyles();


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <LinearGradient
          colors={theme.colors.background.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={[styles.header]}>
            {/* <CustomBackButton onPress={() => router.back()} style={styles.backButton} /> */}
            <CustomBackButton onPress={showCustomAlert} style={styles.backButton} />

          </View>

          <View style={[styles.content]}>
            <Text style={styles.title}>What's your email?</Text>
            <Text style={styles.subtitle}>Enter the email you originally provided our team.</Text>
            <CustomInput
              value={email}
              onChangeText={(text) => {
                setError(false);
                setEmail(text)
              }}
              mode="outlined"
              placeholder="Email"
              error={error}
              label="Email"
              icon={<TextInput.Icon icon='close' rippleColor="transparent" />}
            />

            {!error ?
              (<Text style={styles.infoText}>
                You'll also receive emails from us and can opt out anytime.{' '}
                <Text style={styles.link}>Learn more</Text>
              </Text>)
              :
              (<Text style={{ color: 'red', fontSize: 12, marginTop: 4, }}>{errorMessage}</Text>)
            }
            <CustomButton
              mode='contained-tonal'
              text='Next'
              buttonColor='#0064E0'
              onPress={handlePress}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.footerText}>
                I already have an account
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )

  function handlePress() {
    if (!email.trim()) {
      setErrorMessage('Email address required.');
      setError(() => true)
    }
    if (!validateEmail(email)) {
      setErrorMessage('Looks like your email address may be incorrect. Try entering your email again.')
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Looks like your email address may be incorrect. Try entering your email again.')
      return false;
    }
    return true;
  };

  function showCustomAlert() {
    Alert.alert(
      'Do you want to stop creating your account?',
      'If you stop now, you\'ll lose any progress you\'ve made.',
      [
        {
          text: 'Stop creating account',
          onPress: () => router.back(),
          style: 'default',
        },
        {
          text: 'Continue creating account',
          onPress: () => { },
          style: 'default',
        },
      ],
      { cancelable: false }
    );
  }
}

export const useStyles = () => StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: theme.spacing.MD,
  },
  header: {
    marginTop: theme.spacing.MD,
    marginBottom: theme.spacing.MD,
  },
  backButton: {
    padding: theme.spacing.SM,
  },
  backButtonText: {
    fontSize: theme.fontSize.LG,
    color: theme.colors.text.primary,
  },
  content: {
    flex: 1,
    gap: theme.spacing.MD,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: theme.fontSize.XL,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.fontSize.MD,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.MD,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: theme.spacing.MD,
  },
  infoText: {
    fontSize: theme.fontSize.SM,
    color: theme.colors.text.secondary,
  },
  link: {
    color: theme.colors.primary.light,
  },
  button: {
    marginTop: theme.spacing.LG,
  },
  alternateButton: {
    marginTop: theme.spacing.MD,
    borderColor: theme.colors.text.secondary,
  },
  footer: {
    alignItems: 'center',
    marginBottom: theme.spacing.XL,
  },
  footerText: {
    color: theme.colors.primary.light,
    fontSize: theme.fontSize.SM,
  },
});

export default Signup; 