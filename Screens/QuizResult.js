import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { saveQuizResult } from './DatabaseHelper';

const QuizResultScreen = ({ route, navigation }) => {
  const { score, totalQuestions, email, title } = route.params;

  const handleHomePress = () => {
    navigation.navigate('QuizList'); // Navigate to the home screen
  };

  const handleSaveResult = () => {
    saveQuizResult(score, totalQuestions, email, title)
      .then(() => {
        alert('Quiz result saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving quiz result:', error);
        alert('Failed to save quiz result. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Quiz Result</Text>
        <Text style={styles.score}>Score: {score} / {totalQuestions}</Text>
        <Text style={styles.feedback}>
          {score >= totalQuestions / 2
            ? 'Congratulations! You passed the quiz.'
            : 'Sorry! You did not pass the quiz. Try again!'}
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSaveResult} style={[styles.buttons, { borderColor: '#08d4c4', borderWidth: 1}]}>
          <Text style={[styles.textBtn,{ color: '#009387' }]}>Save Results</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHomePress} style={[styles.buttons, { borderColor: '#08d408', borderWidth: 1, marginTop: 15 }]}>
          <Text style={[styles.textBtn,{ color: '#009387' }]}>Go back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
  },
  feedback: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
  },
  buttons: {
    width: 200,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizResultScreen;
