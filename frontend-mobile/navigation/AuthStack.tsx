import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import SplashScreen1 from "../screens/Onboarding/SplashScreen1";
import SplashScreen2 from "../screens/Onboarding/SplashScreen2";
import SplashScreen3 from "../screens/Onboarding/SplashScreen3";
import OtpScreen from "../screens/Auth/OtpScreen";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ResetPassword from "../screens/Auth/ResetPassword";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash1" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash1" component={SplashScreen1} />
      <Stack.Screen name="Splash2" component={SplashScreen2} />
      <Stack.Screen name="Splash3" component={SplashScreen3} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      
    </Stack.Navigator>
  );
}
