import React from "react";
import { View, Text } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import commonStyles from "../../styles/commonStyles";

const ProfileScreen = () => {
  return (
    <ScreenWrapper>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Profile Screen</Text>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
