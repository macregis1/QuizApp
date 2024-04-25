// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image style={styles.images} source={require('../assets/quiz1.jpg')} resizeMode="cover"/>
        <Text style={{fontSize: 18, fontStyle: 'italic'}}>Welcome user to the quiz page</Text>
      </View>
      <View>
        <Text>

        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('QuizList')} style={[styles.buttons, { borderColor: '#08d4c4', borderWidth: 1 }]}>
          <Text style={[styles.textSign, { color: '#009387' }]}>Your Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Maps')} style={[styles.buttons, { borderColor: '#08d408', borderWidth: 1, marginTop: 15 }]}>
          <Text style={[styles.textSign, { color: '#009387' }]}>Your location</Text>
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  images: {
    // flex: 1,
    // justifyContent: 'space-evenly',
    // width: 250,
    // height: 150,
    width: height_logo,
    height: height_logo,
    borderRadius: 150
  }
});

export default HomeScreen;
