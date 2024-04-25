import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { saveQuiz } from './DatabaseHelper'; // Import the function to save quizzes to the database

const CreateQuizScreen = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: [''], correctOptionIndex: 0 }]);

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

  const handleSaveQuiz = () => {
    // Validate quiz data
    if (!title.trim()) {
      alert('Please provide a title for the quiz.');
      return;
    }

    if (questions.some((q) => !q.question.trim() || q.options.some((o) => !o.trim()))) {
      alert('Please fill in all questions and options.');
      return;
    }

    // Create quiz object
    const quiz = {
      title,
      questions,
    };

    // Save quiz to the database
    saveQuiz(title, questions) // Pass title and questions separately to saveQuiz function
      .then(() => {
        alert('Quiz saved successfully!');
        // Optionally, navigate to another screen after saving
      })
      .catch((error) => {
        console.error('Error saving quiz:', error);
        alert('Failed to save quiz. Please try again.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Quiz</Text>
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
            <View key={optionIndex}>
              <TextInput
                style={styles.input}
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChangeText={(text) => handleOptionChange(text, questionIndex, optionIndex)}
              />
              <Button
                title={`Set as Correct Answer`}
                onPress={() => handleCorrectOptionSelect(optionIndex, questionIndex)}
              />
            </View>
          ))}
          <Button title="Add Option" onPress={() => handleAddOption(questionIndex)} />
        </View>
      ))}
      <Button title="Add Question" onPress={handleAddQuestion} />
      <Button title="Save Quiz" onPress={handleSaveQuiz} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
});

export default CreateQuizScreen;
