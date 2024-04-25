import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getAllQuizResults } from './DatabaseHelper'; // Assuming you have a function to fetch quiz results

const ViewResultScreen = ({ navigation }) => {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    fetchQuizResults();
  }, []);

  const fetchQuizResults = async () => {
    try {
      const results = await getAllQuizResults();
      setQuizResults(results);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
    }
  };

  const renderQuizResultItem = ({ item }) => (
    <TouchableOpacity style={styles.quizItem}>
      <Text style={styles.quizText}>Score: {item.score}</Text>
      <Text style={styles.quizText}>Total Questions: {item.totalQuestions}</Text>
      <Text style={styles.quizText}>Timestamp: {item.timestamp}</Text>
      {/* <Text style={styles.quizText}>Quiz: {item.title}</Text>
      <Text style={styles.quizText}>Student: {item.email}</Text> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headers}>Quiz Score Results</Text>
      <FlatList
        data={quizResults}
        renderItem={renderQuizResultItem}
        keyExtractor={(item, index) => index.toString()} // Use the index as the key
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  quizText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ViewResultScreen;
