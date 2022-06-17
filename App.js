import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native';
import MapsScreen from "./screens/MapsScreen";
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AddItemScreen from './screens/AddItemScreen';
import MapsDirectionsScreen from './screens/MapsDirectionsScreen';

const Stack = createNativeStackNavigator();

export default function App() {

    
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navStyling}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="Maps" component={MapsScreen} />
        <Stack.Screen name="MapsDirections" component={MapsDirectionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navStyling = {
  headerStyle: {
    backgroundColor: "#3e5efa",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textfont: {
    fontSize: 20,
  }
});
