import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import QuizScreen from './QuizScreen';
import TakeQuizScreen from './TakeQuizScreen';
import QuizResultScreen from './QuizResult';
import CreateQuizScreen from './CreateQuizScreen';
import AdminDashboard from './AdminDashboard';
import Userprofile from './Userprofile';
import QuizListScreen from './QuizListScreen';
import UpdateQuizzScreen from './UpdateQuizzScreen';
import ViewQuizzesScreen from './ViewQuizzes';
import SplashScreen from './SplashScreen';
import MapScreen from './MapScreen';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="TakeQuiz" component={TakeQuizScreen} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} />
        <Stack.Screen name="CreateQuiz" component={CreateQuizScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Userprofile" component={Userprofile} />
        <Stack.Screen name="QuizList" component={QuizListScreen} />
        <Stack.Screen name="UpdateQuizz" component={UpdateQuizzScreen} />
        <Stack.Screen name="ViewQuizzes" component={ViewQuizzesScreen} />
        <Stack.Screen name="Maps" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
