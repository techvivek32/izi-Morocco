import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import commonStyles from '../../../styles/commonStyles';
import { RFValue } from '../../../utils/responsive';

const LoadingMap = ({ visible }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LottieView
            source={require('../../../assets/animation/Sandy Loading.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.84)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 25,
    width: '80%',
    alignItems: 'center',
  },
  lottie: {
    width: RFValue(200),
    height: RFValue(150),
    marginBottom: 20,
  },

});

export default LoadingMap;
