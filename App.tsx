import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import {TransactionProvider} from './TransactionContext';
import ReceiverScreen from './ReceiverScreen';
import {ReceiverProvider} from './ReceiverContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <ReceiverProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            <Stack.Screen name="Receiver" component={ReceiverScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReceiverProvider>
    </TransactionProvider>
  );
};

export default App;
