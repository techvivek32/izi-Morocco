// components/Header.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type HeaderProps = {
  title: string;
  backgroundColor?: string;
  textColor?: string;
};

const Header = ({
  title,
  backgroundColor = "#4a90e2",
  textColor = "#fff",
}: HeaderProps) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.contentWrapper}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    letterSpacing: 1,
  },
});
