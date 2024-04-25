import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
};
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Realtime Database
const database = firebase.database();

// Function to create a user table if it doesn't exist
const createUserTable = () => {
  // No need for table creation in Firebase, as it's schemaless
};

// Function to create a quiz table if it doesn't exist
const createQuizTable = () => {
  // No need for table creation in Firebase, as it's schemaless
};

// Function to create a quiz result table if it doesn't exist
const createQuizResultTable = () => {
  // No need for table creation in Firebase, as it's schemaless
};

// Function to register a user
export const registerUser = (firstName, lastName, email, password, role) => {
  // Generate a unique key for the user
  const userRef = database.ref('users').push();
  const userId = userRef.key;

  // Set user data
  return userRef.set({
    firstName,
    lastName,
    email,
    password,
    role
  });
};

// Function to log in a user
export const loginUser = (email, password) => {
  return database.ref('users').orderByChild('email').equalTo(email).once('value')
    .then(snapshot => {
      const user = snapshot.val();
      if (user) {
        const userId = Object.keys(user)[0]; // Assuming unique email
        const userData = user[userId];
        if (userData.password === password) {
          return Promise.resolve(userData);
        } else {
          return Promise.reject(new Error('Incorrect password'));
        }
      } else {
        return Promise.reject(new Error('User not found'));
      }
    });
};

// Function to save a quiz
export const saveQuiz = (title, questions) => {
  // Generate a unique key for the quiz
  const quizRef = database.ref('quizzes').push();
  const quizId = quizRef.key;

  // Set quiz data
  return quizRef.set({
    title,
    questions
  });
};
// Function to get quiz data by ID
export const getQuizById = async (quizId) => {
    try {
      const snapshot = await database.ref('quizzes').child(quizId).once('value');
      const quizData = snapshot.val();
      if (quizData) {
        return {
          id: quizId,
          ...quizData
        };
      } else {
        throw new Error('Quiz not found');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      throw error;
    }
  };
  
  // Function to get all quizzes
  export const getQuizzes = async () => {
    try {
      const snapshot = await database.ref('quizzes').once('value');
      const quizList = [];
      snapshot.forEach(childSnapshot => {
        const quizData = childSnapshot.val();
        quizList.push({
          id: childSnapshot.key,
          ...quizData
        });
      });
      return quizList;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }
  };
  
  // Function to update a quiz
  export const updateQuiz = async (quizId, title, questions) => {
    try {
      await database.ref('quizzes').child(quizId).update({
        title,
        questions
      });
      return true; // Updated successfully
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw error;
    }
  };
  
  // Function to delete a quiz by ID
  export const deleteQuizById = async (quizId) => {
    try {
      await database.ref('quizzes').child(quizId).remove();
      return true; // Deleted successfully
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  };
  
  // Function to retrieve all quiz scores
  export const getAllQuizScores = async () => {
    try {
      const snapshot = await database.ref('quizResults').once('value');
      const quizScores = [];
      snapshot.forEach(childSnapshot => {
        const score = childSnapshot.val().score;
        quizScores.push(score);
      });
      return quizScores;
    } catch (error) {
      console.error('Error fetching quiz scores:', error);
      throw error;
    }
  };
  
  // Function to retrieve all quiz results
  export const getAllQuizResults = async () => {
    try {
      const snapshot = await database.ref('quizResults').once('value');
      const quizResults = [];
      snapshot.forEach(childSnapshot => {
        const resultData = childSnapshot.val();
        quizResults.push({
          id: childSnapshot.key,
          ...resultData
        });
      });
      return quizResults;
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      throw error;
    }
  };
  
  // Function to save a quiz result
  export const saveQuizResult = async (score, totalQuestions, email, title) => {
    try {
      const resultRef = database.ref('quizResults').push();
      const resultId = resultRef.key;
      await resultRef.set({
        score,
        totalQuestions,
        email,
        title,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      return true; // Saved successfully
    } catch (error) {
      console.error('Error saving quiz result:', error);
      throw error;
    }
  };
  
