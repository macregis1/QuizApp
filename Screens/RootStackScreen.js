import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import QuizScreen from './QuizScreen';
import TakeQuizScreen from './TakeQuizScreen';
import QuizResultScreen from './QuizResult';
import CreateQuizScreen from './CreateQuizScreen';
import AdminDashboard from './AdminDashboard';
import Userprofile from './Userprofile';
import QuizListScreen from './QuizListScreen';
import UpdateQuizzScreen from './UpdateQuizzScreen';
import ViewQuizzesScreen from './ViewQuizzes';
import MapScreen from './MapScreen';
import SplashScreen from './SplashScreen';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import ViewResultScreen from './ViewResultScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
        <RootStack.Screen name="Quiz" component={QuizScreen} />
        <RootStack.Screen name="TakeQuiz" component={TakeQuizScreen} />
        <RootStack.Screen name="QuizResult" component={QuizResultScreen} />
        <RootStack.Screen name="CreateQuiz" component={CreateQuizScreen} />
        <RootStack.Screen name="AdminDashboard" component={AdminDashboard} />
        <RootStack.Screen name="Userprofile" component={Userprofile} />
        <RootStack.Screen name="QuizList" component={QuizListScreen} />
        <RootStack.Screen name="UpdateQuizz" component={UpdateQuizzScreen} />
        <RootStack.Screen name="ViewQuizzes" component={ViewQuizzesScreen} />
        <RootStack.Screen name="Maps" component={MapScreen} />
        <RootStack.Screen name="Results" component={ ViewResultScreen} />
    </RootStack.Navigator>
);


export default RootStackScreen;