import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { RFValue } from '../utils/responsive';
import colors from '../styles/colors';

type Props = {
  title?: string;
};

const BackHeader = ({ title }: Props) => {
  const navigation = useNavigation<any>();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.header}>
      {canGoBack ? (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={RFValue(22)} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      {title ? <Text style={styles.title}>{title}</Text> : <View />}

      {/* Spacer to keep the title centred */}
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(12),
    backgroundColor: 'transparent',
  },
  backBtn: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f7',
  },
  spacer: {
    width: RFValue(40),
    height: RFValue(40),
  },
  title: {
    fontSize: RFValue(18),
    color: colors.textPrimary,
    fontFamily: 'Neue-ExtraBold',
  },
});

export default BackHeader;
