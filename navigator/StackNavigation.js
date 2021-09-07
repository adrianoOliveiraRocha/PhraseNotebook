import * as React from 'react';
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './../screens/Home';
import InsertPhrase from './../screens/InsertPhrase';
import GetPhrases from './../screens/GetPhrases';
import GetPhrase from './../screens/GetPhrase';

const forFad = ({ current, next }) => {
  const opacity = Animated(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  });

  return {
    leftButtonStyle: { opacity },
    rigthButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity }
  };
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: "black",
          headerStyle: {backgroundColor: '#fff'}
        }}
      />

      <Stack.Screen
        name="Inserir Frase"
        component={InsertPhrase}
        options={{ headerStyleInterpolator: forFad }}
      />

      <Stack.Screen
        name="Todas"
        component={GetPhrases}
        options={{
          headerTintColor: "black",
          headerStyle: {backgroundColor: '#fff'}
        }}
      />

      <Stack.Screen
        name="Dê-me uma Frase"
        component={GetPhrase}
        options={{
          headerTintColor: "black",
          headerStyle: {backgroundColor: '#fff'}
        }}
      />

    </Stack.Navigator>
  );
}

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
