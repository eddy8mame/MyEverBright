import React, { useState } from 'react';
import { Animated, TouchableWithoutFeedback, Keyboard, Image, Alert } from 'react-native';
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


const Page = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")
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
          <View style={styles.header}>
            <CustomBackButton onPress={() => router.back()} style={styles.backButton} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Reset your password?</Text>
            <Text style={styles.subtitle}>
              Enter your email address
            </Text>
            <Text style={styles.link}>Can't reset your password?</Text>

            <CustomInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) validateEmail(text);
              }}
              mode="outlined"
              placeholder="Email address"
              label="Email"
              icon={<TextInput.Icon icon='close' rippleColor="transparent" />}
              // style={styles.input}
              error={!!emailError}
              errorMessage={emailError}
            />

            <Text style={styles.infoText}>
              Enter the email address associated with this account to receive an email with a link to reset your password
            </Text>
            <Text style={styles.infoText}>
              This may take up to 5 minutes
            </Text>
            <View>
              <CustomButton
                mode='contained-tonal'
                text='Continue'
                buttonColor={theme.colors.primary.main}
                onPress={handleContinue}
              />
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) {
      showCustomAlert(BUTTONS['empty'])
      return false;
    }
    if (!emailRegex.test(email)) {
      showCustomAlert(BUTTONS['incorrect'])
      return false;
    }
    setEmailError("");
    return true;
  };

  function handleContinue() {
    validateEmail(email)
  }

  function showCustomAlert({ title, message, buttons }) {

    const alertButtons = buttons.map(button => ({
      text: button.text,
      onPress: () => handleAlertAction(button.action)
    }));

    Alert.alert(
      title,
      message,
      alertButtons,
      { cancelable: false },
    );
  }

  function handleAlertAction(action) {
    switch (action) {
      case 'CREATE_ACCOUNT':
        router.push('/(auth)/signup');
        break;
      case 'TRY_AGAIN':
        setEmail("");
        // emailInputRef.current?.focus();
        break;
      case 'CONTINUE':
        // Implement password reset logic here
        console.log("Continuing with password reset for:", email);
        break;
      default:
        return;
      // console.log("Unhandled action:", action);
    }
  }


};

const BUTTONS = {
  incorrect: {
    title: 'We could not find your account. Create a new account?',
    message: 'Check your email and try again.',
    buttons: [{
      text: 'Create new account',
      onPress: () => { },
      style: 'cancel',
      action: 'NAVIGATE'
    },
    {
      text: 'Try again',
      onPress: () => { },
      style: 'default',
      action: 'TRY_AGAIN'
    }],
  },
  empty: {
    title: 'Enter a response',
    message: 'You\'ll need to enter an email to continue.',
    buttons: [{
      text: 'Try again',
      onPress: () => { },
      style: 'default',
      action: 'TRY_AGAIN'
    }]
  }
}


export default Page;

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
    justifyContent: 'flex-start',
    gap: theme.spacing.MD,
  },
  title: {
    fontSize: theme.fontSize.XL,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.fontSize.MD,
    color: theme.colors.text.secondary,
  },
  link: {
    color: theme.colors.primary.light,
    fontSize: theme.fontSize.SM,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: theme.spacing.MD,
    marginBottom: theme.spacing.SM,
  },
  infoText: {
    fontSize: theme.fontSize.SM,
    color: theme.colors.text.secondary,
  },
  button: {
    marginTop: theme.spacing.LG,
  },
  textButton: {
    marginTop: theme.spacing.SM,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.XL,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.text.secondary,
  },
  dividerText: {
    marginHorizontal: theme.spacing.MD,
    color: theme.colors.text.secondary,
  },
  facebookButton: {
    borderColor: theme.colors.text.secondary,
  },
});