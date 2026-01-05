import React from "react";
import BottomTabs from "./BottomTabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();


export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}
