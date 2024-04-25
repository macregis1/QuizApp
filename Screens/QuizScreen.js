import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getAllQuizzes } from './DatabaseHelper'; // Import the function to fetch quizzes from the database

const QuizScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes from the database when the component mounts
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const quizzesFromDB = await getAllQuizzes(); // Implement this function to fetch quizzes
      setQuizzes(quizzesFromDB);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleQuizPress = (quiz) => {
    // Navigate to the quiz taking screen and pass the selected quiz
    navigation.navigate('QuizTaking', { quiz });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Quizzes</Text>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => handleQuizPress(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default QuizScreen;
