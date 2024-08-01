import React, { useState, useRef, useCallback } from 'react';
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
import { CustomButton , COLORS} from '@/components/CustomButton'
// import { useStyles } from '../hooks/useStyles';
import { theme } from '@/theme';


const Home = () => {
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const styles = useStyles();

  const handleUsernameChange = useCallback((text) => {
    setUsername(text);
  }, []);

  const handlePasswordChange = useCallback((text) => {
    setPassword(text);
  }, []);

  const removeFocus = () => {
    if (usernameRef.current && typeof usernameRef.current.blur === 'function') {
      usernameRef.current.blur();
    }
    if (passwordRef.current && typeof passwordRef.current.blur === 'function') {
      passwordRef.current.blur();
    }
    Keyboard.dismiss();
  }

  const handleLogin = async () => {
    // removeFocus();

    if ((isUsernameFocused || isPasswordFocused) && (username.trim() === "" || password.trim() === "")) {
      Alert.alert(
        'Enter your email to log in?',
        "",
        [
          {
            text: 'OK',
            onPress: () => { },
            style: 'default',
          },
          {
            text: 'Create new account',
            onPress: () => router.push('/(auth)/signup'),
            style: 'default',
          },
        ],
        { cancelable: false }
      );
    }
    if (username.trim() === "") {
      usernameRef.current?.focus();
      return;
    } else if (password.trim() === "") {
      passwordRef.current?.focus();
    }
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000))
      setLoading(false);
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Error', err);
    }
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={['#2c3339', '#2c3437', '#1d3738', '#1f3040']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 p-4"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"          
        >
          <SafeAreaView className="flex-1 p-4 justify-center">
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/file.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>MyEverBright</Text>
            </View>
            <CustomInput
              id={'password'}
              value={username}
              ref={usernameRef}
              onChangeText={handleUsernameChange}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              mode="outlined"
              placeholder="Username"
              label=""
              icon={<TextInput.Icon icon='close' rippleColor="transparent" />}
              style={styles.input}
            />
            <CustomInput
              id={'username'}
              value={password}
              ref={passwordRef}
              onChangeText={handlePasswordChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              mode="outlined"
              placeholder="Password"
              label=""
              secureTextEntry={true}
              icon={<TextInput.Icon icon='eye-off-outline' rippleColor="transparent" />}
              style={styles.input}
            />
            <CustomButton
              mode='contained-tonal'
              text={loading ? '' : 'Log in'}
              buttonColor={theme.colors.primary.main}
              loading={loading}
              onPress={handleLogin}
              style={{ fontSize: 18 }}
            />
            <TouchableOpacity onPress={() => router.push('/(auth)/forgot')}>
              <Text style={[styles.forgotPassword, { fontSize: 16 }]}>Forgot password?</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <CustomButton
            mode="outlined"
            text="Create new account"
            textColor={COLORS.primary.light}
            style={{ borderColor: COLORS.primary.light }}
            onPress={(() => router.push('/(auth)/signup'))}
          />
          <Image
            source={require('@/assets/images/nextera.png')}
            style={[styles.logo, { height: 30, width: 80 }]}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

    </TouchableWithoutFeedback>
  )


}

export default Home;

export const useStyles = () => StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: theme.spacing.MD,
  },
  content: {
    flex: 1,
    padding: theme.spacing.MD,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing.LG,
    left: theme.spacing.MD,
  },
  backButtonText: {
    fontSize: 28,
    color: theme.colors.text.primary,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.XL,
  },
  logo: {
    width: 75,
    height: 75,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: theme.spacing.MD,
    borderRadius: 5,
  },
  loginButton: {
    marginTop: theme.spacing.MD,
  },
  forgotPassword: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing.MD,
    fontSize: theme.fontSize.SM,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.XL,
    left: theme.spacing.MD,
    right: theme.spacing.MD,
    alignItems: 'center',
  },
  createAccountButton: {
    width: '100%',
    marginBottom: theme.spacing.LG,
  },
  metaLogo: {
    height: 30,
    width: 80,
  },
});