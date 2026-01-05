import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoordinateBox = ({ location }) => (
  <View style={styles.container}>
    {location ? (
      <>
        <Text style={styles.text}>Lat: {location.latitude.toFixed(6)}</Text>
        <Text style={styles.text}>Lon: {location.longitude.toFixed(6)}</Text>
      </>
    ) : (
      <Text style={styles.text}>Fetching location...</Text>
    )}
  </View>
);

export default CoordinateBox;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  text: { color: 'white', fontSize: 12, marginBottom: 2 },
});
