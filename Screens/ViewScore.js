import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {  } from './DatabaseHelper'; // Assuming you have a function to fetch quiz list

const ViewScoreScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const quizList = await getQuizzes(); // Assuming getQuizzes function returns the list of quizzes
      setQuizzes(quizList);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleQuizPress = (quizId) => {
    navigation.navigate('UpdateQuizz', { quizId });
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity style={styles.quizItem} onPress={() => handleQuizPress(item.id)}>
      <Text style={styles.quizTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headers}>Your Results.</Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id.toString()}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headers: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 50,
    paddingBottom: 30,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#FFFFFF',
  },
  quizItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  quizTitle: {
    fontSize: 18,
  },
});

export default ViewScoreScreen;
