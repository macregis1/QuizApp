// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from './DatabaseHelper'; // Import the database helper functions

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const lastActivityTime = await AsyncStorage.getItem('lastActivityTime');
        if (lastActivityTime) {
          const idleTime = (new Date().getTime() - new Date(lastActivityTime).getTime()) / 60000; // in minutes
          if (idleTime > 5) {
            // User has been idle for more than 5 minutes, logout
            await AsyncStorage.clear();
            Alert.alert('Session Expired', 'You have been logged out due to being inactivity for more than 2 minutes.');
            navigation.navigate('SplashScreen');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    const interval = setInterval(checkSession, 60000); // Check session every minute

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      if (user.length > 0) {
        const loggedInUser = user[0]; // Get the first user (assuming email is unique)
        console.log('Login successful!');
        
        // Set session data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(loggedInUser));
        await AsyncStorage.setItem('loginTime', new Date().toString());
        await AsyncStorage.setItem('lastActivityTime', new Date().toString());

        // Navigate the user based on role
        if (loggedInUser.role === 'admin') {
          navigation.navigate('AdminDashboard');
        } else {
          navigation.navigate('Userprofile');
        }
      } else {
        console.log('Invalid email or password');
        // Add user feedback for invalid credentials
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Add user feedback for login error
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#AD40AF' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
          <Text style={styles.link}>Don't have an account? Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AD40AF'
    // backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
