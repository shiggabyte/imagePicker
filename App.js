import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//screens
import HomeScreen from "./src/screen/HomeScreen";
const Stack = createNativeStackNavigator();

const navStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'upload image' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navStack;