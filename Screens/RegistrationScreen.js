import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { registerUser } from './DatabaseHelper';

const RegistrationScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleRegister = () => {
    // Add validation if necessary
    if (!firstName || !lastName || !email || !password) {
      setRegistrationStatus('Please fill in all fields');
      return;
    }

    registerUser(firstName, lastName, email, password, role)
      .then(() => {
        console.log('User registered successfully!');
        setRegistrationStatus('Data saved successfully');
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        setRegistrationStatus('Data not saved');
      });
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
          placeholder="First Name"
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={text => setLastName(text)}
          value={lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.passwordVisibility}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        <RNPickerSelect
          onValueChange={(value) => setRole(value)}
          items={[
            { label: 'User', value: 'user' },
            { label: 'Admin', value: 'admin' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select Role...', value: null }}
          value={role} // Set the initial value for the picker
        />
        <Button title="Register" onPress={handleRegister} />
        {registrationStatus && <Text style={styles.status}>{registrationStatus}</Text>}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordVisibility: {
    marginLeft: 10,
    color: 'gray',
  },
  status: {
    marginTop: 10,
    color: 'red',
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegistrationScreen;
