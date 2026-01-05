import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from '../../utils/responsive';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import SplashButton from '../../components/SplashButton';
import ScreenWrapper from '../../components/ScreenWrapper';

const { width, height } = Dimensions.get('window');

const SplashScreen1 = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <ScreenWrapper>
      <LinearGradient
        colors={[
          colors.white,
          colors.white,
          colors.primaryLight,
          colors.primary,
        ]}
        style={[commonStyles.containerPadded, { position: 'relative' }]}
      >
        <View style={[commonStyles.fullFlex, commonStyles.justifyBetween]}>
          {/* Main content */}
          <Animated.View
            style={[
              styles.mainContent,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Logo container with glow effect */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/logo/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* App name */}
            <Animated.View
              style={[
                styles.titleContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={[commonStyles.h2Text]}>IZI Morocco</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.descriptionContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text
                style={[
                  commonStyles.pText,
                  { color: colors.black, textAlign: 'center' },
                ]}
              >
                Welcome to your amazing journey. Experience something
                extraordinary with our innovative platform.
              </Text>
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <SplashButton
              title={'Continue'}
              onPress={() => {
                navigation.navigate('Splash2');
              }}
            />
          </Animated.View>
        </View>
      </LinearGradient>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: RFValue(32),
  },
  logo: {
    width: RFValue(200),
    height: RFValue(200),
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: RFValue(14),
  },
  descriptionContainer: {
    alignItems: 'center',
    paddingHorizontal: RFValue(10),
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
});

export default SplashScreen1;
