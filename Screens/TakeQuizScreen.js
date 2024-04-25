import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { getQuizById } from './DatabaseHelper'; // Import the function to get quiz data by ID

const TakeQuizScreen = ({ route, navigation }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [selectedWrongIndex, setSelectedWrongIndex] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  // const [title, setTitle] = useState(null);

  useEffect(() => {
    // Check if the quizId parameter exists in the route
    if (route.params && route.params.quizId) {
      // Fetch quiz data when the component mounts
      fetchQuiz(route.params.quizId);
    } else {
      console.error('Quiz ID not provided.');
    }
  }, [route.params]);

  const fetchQuiz = async (quizId) => {
    try {
      const quizData = await getQuizById(quizId);
      setQuiz(quizData);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptionIndex(optionIndex);
    setSelectedWrongIndex(null);
  };

  const handleNextQuestion = () => {
    // Check if the selected option is correct and update the score
    const correctOptionIndex = quiz.questions[currentQuestionIndex].correctOptionIndex;
    if (selectedOptionIndex === correctOptionIndex) {
      setScore(score + 1);
    } else {
      setSelectedWrongIndex(selectedOptionIndex);
    }

    setShowCorrectAnswer(true);

    // Move to the next question or finish the quiz if it's the last question
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null); // Reset selected option
      setSelectedWrongIndex(null);
      setShowCorrectAnswer(false);
    } else {
      // Finish quiz and navigate to the result screen
      navigation.navigate('QuizResult', { score: score, totalQuestions: quiz.questions.length, title: quiz.title });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // If the user goes back to the previous question, mark the correct and wrong options
      const correctOptionIndex = quiz.questions[currentQuestionIndex].correctOptionIndex;
      setSelectedOptionIndex(correctOptionIndex);
      setSelectedWrongIndex(selectedOptionIndex !== correctOptionIndex ? selectedOptionIndex : null);
      
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowCorrectAnswer(false);
    }
  };

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text>Loading quiz...</Text>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  // Check if currentQuestion and currentQuestion.options are defined
  if (!currentQuestion || !currentQuestion.options) {
    return (
      <View style={styles.container}>
        <Text>Error: Quiz data is not structured correctly.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOptionIndex === index && styles.selectedOption,
              selectedWrongIndex === index && styles.wrongOption,
              showCorrectAnswer && index === currentQuestion.correctOptionIndex && styles.correctOption,
            ]}
            onPress={() => handleOptionSelect(index)}
            disabled={showCorrectAnswer}
          >
            <Text style={styles.optionText}>{index + 1}. {option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.progressContainer}>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={(currentQuestionIndex + 1) / quiz.questions.length}
          style={{ width: '100%', height: 10 }}
          color="#2196F3"
        />
      </View>
      <View style={styles.buttonContainer}>
        {currentQuestionIndex > 0 && (
          <Button title="Previous" onPress={handlePreviousQuestion} color="red" />
        )}
        <Button title="Next" onPress={handleNextQuestion} disabled={selectedOptionIndex === null} color="green" />
      </View>
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
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  option: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  wrongOption: {
    backgroundColor: 'red',
  },
  correctOption: {
    backgroundColor: 'lightgreen',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default TakeQuizScreen;
