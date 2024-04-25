import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('quiz.db');
const db = SQLite.openDatabase('test1.db');

// Function to create a user table if it doesn't exist
const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, password TEXT, role TEXT)', // Added role column
      [],
      () => {
        console.log('User table created successfully.');
      },
      (_, error) => {
        console.error('Error creating user table:', error);
      }
    );
  });
};

// Function to create a quiz table if it doesn't exist
const createQuizTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS quizzes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, questions TEXT)',
      [],
      () => {
        console.log('Quiz table created successfully.');
      },
      (_, error) => {
        console.error('Error creating quiz table:', error);
      }
    );
  });
};

// Function to create a quiz result table if it doesn't exist

// const createQuizResultTable = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS quiz_results (id INTEGER PRIMARY KEY AUTOINCREMENT, score INTEGER, totalQuestions INTEGER, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)',
//       [],
//       () => {
//         console.log('Quiz result table created successfully.');
//       },
//       (_, error) => {
//         console.error('Error creating quiz result table:', error);
//       }
//     );
//   });
// };
// const createQuizResultTable = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS quiz_results (id INTEGER PRIMARY KEY AUTOINCREMENT, score INTEGER, totalQuestions INTEGER, user_id INTEGER, quiz_id INTEGER, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES user(id), FOREIGN KEY (quiz_id) REFERENCES quizzes(id))',
//       [],
//       () => {
//         console.log('Quiz result table created successfully.');
//       },
//       (_, error) => {
//         console.error('Error creating quiz result table:', error);
//       }
//     );
//   });
// };
const createQuizResultTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS quiz_results (id INTEGER PRIMARY KEY AUTOINCREMENT, score INTEGER, totalQuestions INTEGER, email TEXT, title TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (email) REFERENCES user(id), FOREIGN KEY (title) REFERENCES quizzes(id))',
      [],
      () => {
        console.log('Quiz result table created successfully.');
      },
      (_, error) => {
        console.error('Error creating quiz result table:', error);
      }
    );
  });
};

// Function to register a user
export const registerUser = (firstName, lastName, email, password, role) => { // Added role parameter
  createUserTable(); // Ensure the user table exists

  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO user (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)',
          [firstName, lastName, email, password, role], // Insert role into the database
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error registering user:', error);
        reject(error); // Reject the promise with the error object
      }
    );
  });
};

// Function to log in a user
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM user WHERE email = ? AND password = ?',
          [email, password],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error logging in:', error);
        reject(error); // Reject the promise with the error object
      }
    );
  });
};

// Function to save a quiz
export const saveQuiz = (title, questions) => {
  createQuizTable(); // Ensure the quiz table exists

  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO quizzes (title, questions) VALUES (?, ?)',
          [title, JSON.stringify(questions)],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error saving quiz:', error);
        reject(error); // Reject the promise with the error object
      }
    );
  });
};
// Function to get quiz data by ID
export const getQuizById = (quizId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM quizzes WHERE id = ?',
          [quizId],
          (_, { rows }) => {
            if (rows.length > 0) {
              const quizData = rows.item(0);
              const parsedQuizData = {
                id: quizData.id,
                title: quizData.title,
                questions: JSON.parse(quizData.questions) // Parse questions from JSON string
              };
              resolve(parsedQuizData); // Resolve with the parsed quiz data
            } else {
              reject(new Error('Quiz not found'));
            }
          },
          (_, error) => {
            console.error('Error fetching quiz:', error);
            reject(error); // Reject the promise with the error object
          }
        );
      },
      error => {
        console.error('Error fetching quiz:', error);
        reject(error); // Reject the promise with the error object
      }
    );
  });
};

// Assuming you have a function to fetch quiz list from the databas
export const getQuizzes = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM quizzes',
          [],
          (_, { rows }) => {
            const quizList = [];
            for (let i = 0; i < rows.length; i++) {
              quizList.push(rows.item(i));
            }
            resolve(quizList);
          },
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error fetching quizzes:', error);
        reject(error);
      }
    );
  });
};
// Function to create a quiz table if it doesn't exist

// Function to get all quizzes
export const getAllQuizzes = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM quizzes',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error fetching quizzes:', error);
        reject(error); // Reject the promise with the error object
      }
    );
  });
};


// Function to update a quiz
export const updateQuiz = (quizId, title, questions) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'UPDATE quizzes SET title = ?, questions = ? WHERE id = ?',
          [title, JSON.stringify(questions), quizId],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error updating quiz:', error);
        reject(error); // Reject the promise with the error object
      }
    );
  });
};
export const deleteQuizById = (quizId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM quizzes WHERE id = ?',
          [quizId],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      },
      (error) => {
        console.error('Error deleting quiz:', error);
        reject(error);
      }
    );
  });
};
// Function to save a quiz result
export const saveQuizResult = (score, totalQuestions, email, title) => {
  createQuizResultTable(); // Ensure the quiz result table exists

  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO quiz_results (score, totalQuestions, email, title) VALUES (?, ?, ?, ?)',
          [score, totalQuestions, email, title],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error saving quiz result:', error);
        reject(error);
      }
    );
  });
};

// Function to retrieve all quiz scores
export const getAllQuizScores = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT score FROM quiz_results',
          [],
          (_, { rows }) => {
            const quizScores = [];
            for (let i = 0; i < rows.length; i++) {
              quizScores.push(rows.item(i).score);
            }
            resolve(quizScores);
          },
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error fetching quiz scores:', error);
        reject(error);
      }
    );
  });
};
// Function to retrieve all quiz results
export const getAllQuizResults = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM quiz_results',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      },
      error => {
        console.error('Error fetching quiz results:', error);
        reject(error); // Reject the promise with the error object
      }
    );
  });
};

