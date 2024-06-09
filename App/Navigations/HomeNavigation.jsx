import { View, Text } from 'react-native'
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusinessListByCategoryScreen from '../Screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
   <Stack.Navigator screenOptions={{
    headerShown:false
   }}>
        <Stack.Screen name='home' component={HomeScreen} />
        <Stack.Screen name='business-list' 
        component={BusinessListByCategoryScreen}/>
        <Stack.Screen name='business-detail' component={BusinessDetailsScreen} />
   </Stack.Navigator>
  )
}