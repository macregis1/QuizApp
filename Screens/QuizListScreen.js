import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getQuizzes } from './DatabaseHelper'; // Assuming you have a function to fetch quiz list

const QuizListScreen = ({ navigation }) => {
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
    navigation.navigate('TakeQuiz', { quizId });
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity style={styles.quizItem} onPress={() => handleQuizPress(item.id)}>
      <Text style={styles.quizTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headers}>Quiz List</Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id.toString()}
      />
      </View>
      <View style={styles.footer}>
      {/* <Text style={[styles.headers,{justifyContent: 'center'}]}>Your Scores</Text> */}
      <Text style={styles.headers}>Notifications</Text>
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
  quizItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  quizTitle: {
    fontSize: 18,
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
});

export default QuizListScreen;
