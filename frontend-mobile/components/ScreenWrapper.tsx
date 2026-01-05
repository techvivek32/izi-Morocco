import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import colors from "../styles/colors";

type Props = {
  children: React.ReactNode;
};

const ScreenWrapper = ({ children }: Props) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:colors.white
  },
});

export default ScreenWrapper;
