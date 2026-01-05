import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/colors';
import { RFValue } from '../utils/responsive';

interface SplashButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  loadingText?: string;
}

const SplashButton: React.FC<SplashButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  loading = false,
  loadingText = 'Loading...',
}) => {
  return (
    <TouchableOpacity
      onPress={!loading ? onPress : undefined} // disable press while loading
      activeOpacity={loading ? 1 : 0.7} // no press effect if loading
      style={[
        commonStyles.row,
        commonStyles.alignCenter,
        commonStyles.justifyCenter,
        {
          width: '80%',
          borderRadius: 99,
          height: RFValue(55),
          backgroundColor: colors.secondary,
          opacity: loading ? 0.7 : 1, // visually indicate disabled
        },
        buttonStyle,
      ]}
    >
      {loading ? (
        <View style={[commonStyles.row, commonStyles.alignCenter, { gap: 8 }]}>
          <ActivityIndicator size="small" color={colors.white} />
          <Text
            style={[
              commonStyles.h2Text,
              { color: colors.white, fontFamily: 'Neue-Bold' },
            ]}
          >
            {loadingText}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            commonStyles.h2Text,
            { color: colors.white, fontFamily: 'Neue-Bold' },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SplashButton;
