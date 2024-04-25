// UpdateQuizScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,Alert, ScrollView } from 'react-native';
import { updateQuiz, getQuizById,deleteQuizById } from './DatabaseHelper';

const UpdateQuizScreen = ({ route, navigation }) => {
  const [quizData, setQuizData] = useState(null);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const { quizId } = route.params;
    fetchQuizData(quizId);
  }, []);

  const fetchQuizData = async (quizId) => {
    try {
      const quiz = await getQuizById(quizId);
      setQuizData(quiz);
      setTitle(quiz.title);
      setQuestions(quiz.questions);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleSaveChanges = () => {
    if (!title.trim()) {
      alert('Please provide a title for the quiz.');
      return;
    }

    if (questions.some((q) => !q.question.trim() || q.options.some((o) => !o.trim()))) {
      alert('Please fill in all questions and options.');
      return;
    }

    updateQuiz(quizData.id, title, questions)
      .then(() => {
        alert('Quiz updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating quiz:', error);
        alert('Failed to update quiz. Please try again.');
      });
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: [''], correctOptionIndex: 0 }]);
  };

  const handleQuestionChange = (text, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = text;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (text, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionSelect = (optionIndex, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOptionIndex = optionIndex;
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };
  
  const handleDeleteQuiz = async () => {
    try {
      await deleteQuizById(quizData.id);
      navigation.navigate('ViewQuizzes');
      //navigation.goBack();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      // Optionally, show an error message
    }
  };
  if (!quizData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>Update Quiz</Text>
      <Button title="Delete Quiz" onPress={handleDeleteQuiz} />
      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={title}
        onChangeText={setTitle}
      />
      {questions.map((question, questionIndex) => (
        <View key={questionIndex}>
          <TextInput
            style={styles.input}
            placeholder={`Question ${questionIndex + 1}`}
            value={question.question}
            onChangeText={(text) => handleQuestionChange(text, questionIndex)}
          />
          {question.options.map((option, optionIndex) => (
            <View key={optionIndex} style={styles.optionContainer}>
              <TextInput
                style={styles.input}
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChangeText={(text) => handleOptionChange(text, questionIndex, optionIndex)}
              />
              <TouchableOpacity
                style={styles.correctOptionButton}
                onPress={() => handleCorrectOptionSelect(optionIndex, questionIndex)}
              >
                <Text style={styles.correctOptionButtonText}>
                  {question.correctOptionIndex === optionIndex ? 'Correct' : 'Set Correct'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button title="Add Option" onPress={() => handleAddOption(questionIndex)} />
        </View>
      ))}
      <Button title="Add Question" onPress={handleAddQuestion} />
      <Button title="Save Changes" onPress={handleSaveChanges} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctOptionButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  correctOptionButtonText: {
    color: 'white',
  },
});

export default UpdateQuizScreen;
