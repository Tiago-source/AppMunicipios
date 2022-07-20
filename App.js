/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import Notas from './src/screens/Notas';
import Listagem from './src/screens/Listagem';
import Edit from './src/screens/Edit';
import Register from './src/screens/Register';
import Map from './src/screens/Map';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'App Municipios',
            headerStyle: {
              backgroundColor: '#456990',
              }}}
        />
        <Stack.Screen name="Notes" component={Notas} 
        options={{
        headerStyle: {
          backgroundColor: '#456990',
          }}}/>
        <Stack.Screen name="List" component={Listagem}
           options={{
            headerStyle: {
              backgroundColor: '#456990',
              }}}/>
        <Stack.Screen name="Edit" component={Edit} 
          options={{
            headerStyle: {
              backgroundColor: '#456990',
              }}}/>
        <Stack.Screen name="Register" component={Register}
          options={{
            headerStyle: {
              backgroundColor: '#456990',
              }}} />
        <Stack.Screen name="Map" component={Map} 
          options={{
            headerStyle: {
              backgroundColor: '#456990',
              }}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
