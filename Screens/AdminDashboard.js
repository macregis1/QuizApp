// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.images} source={require('../assets/quiz4.jpg')} resizeMode="cover"/>
        <Text>Welcome to the  AdminDashboard</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateQuiz')} style={[styles.buttons, { borderColor: '#08d4c4', borderWidth: 1 }]}>
          <Text style={[styles.textSign, { color: '#009387' }]}>Create Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ViewQuizzes')} style={[styles.buttons, { borderColor: '#08d408', borderWidth: 1, marginTop: 15 }]}>
          <Text style={[styles.textSign, { color: '#009387' }]}>View Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Results')} style={[styles.buttons, { borderColor: '#08d408', borderWidth: 1, marginTop: 15 }]}>
          <Text style={[styles.textSign, { color: '#009387' }]}>View Results</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SplashScreen')} style={[styles.buttons, { borderColor: '#0808c4', borderWidth: 1, marginTop: 15 }]}>
          <Text style={[styles.textSign, { color: '#009387' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888880',
  },
  buttons: {
    width: 250,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    color: '#08d4c4'
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 50,
    paddingBottom: 30,
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  images: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // width: 250,
    // height: 150,
    // borderRadius: 150,
    width: height_logo,
    height: height_logo
  }
});

export default HomeScreen;
