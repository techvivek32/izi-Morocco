// screens/Auth/SignInScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import CustomInput from '../../components/CustomInput';
import { RFValue } from '../../utils/responsive';
import SplashButton from '../../components/SplashButton';
import ScreenWrapper from '../../components/ScreenWrapper';

const { height } = Dimensions.get('window');

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setLoading(true);

    // fake API call delay
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SignIn');
    }, 1000);
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LinearGradient
            colors={[
              colors.white,
              colors.white,
              colors.primaryLight,
              colors.primary,
            ]}
            style={[
              commonStyles.containerPadded,
              { position: 'relative', minHeight: height },
            ]}
          >
            <View
              style={[
                commonStyles.fullFlex,
                commonStyles.col,
                commonStyles.justifyBetween,
                { paddingHorizontal: RFValue(15) },
              ]}
            >
              <View
                style={[
                  commonStyles.col,
                  commonStyles.justifyCenter,
                  commonStyles.alignCenter,
                  { flex: 2, width: '100%' },
                ]}
              >
                <View style={{ marginBottom: RFValue(40) }}>
                  <Text style={[commonStyles.h1Text, { textAlign: 'center' }]}>
                    Reset Password
                  </Text>
                  <Text style={[commonStyles.pText, { textAlign: 'center' }]}>
                    Secure your account to continue
                  </Text>
                </View>

                <CustomInput
                  label="New Password"
                  placeholder="Enter your new password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                <CustomInput
                  label="Confirm Password"
                  placeholder="Enter your confirm password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                <SplashButton
                  onPress={handleReset}
                  loading={loading}
                  loadingText="Loading..."
                  buttonStyle={{
                    backgroundColor: colors.primarydark,
                    borderRadius: 8,
                    height: RFValue(50),
                    width: '100%',
                    marginTop: RFValue(20),
                  }}
                  title="Reset Password"
                />
              </View>

              <View
                style={[
                  commonStyles.row,
                  commonStyles.justifyCenter,
                  commonStyles.alignEnd,
                  { gap: 10, flex: 1 },
                ]}
              >
                <Text
                  style={[
                    { textAlign: 'center', width: '90%', color: colors.white },
                  ]}
                >
                  By logging in, you agree to the{' '}
                  <Text style={{ textDecorationLine: 'underline' }}>
                    Term of Use
                  </Text>{' '}
                  and{' '}
                  <Text style={{ textDecorationLine: 'underline' }}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
