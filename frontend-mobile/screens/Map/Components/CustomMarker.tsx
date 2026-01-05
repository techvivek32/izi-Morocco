import React from 'react';
import { View, Image } from 'react-native';
import commonStyles from '../../../styles/commonStyles';
import { RFValue } from '../../../utils/responsive';

const CustomMarker = ({ icon }) => {
  if (!icon || typeof icon !== 'string') {
    return (
      <View
        style={[
          commonStyles.alignCenter,
          commonStyles.justifyCenter,
          { width: RFValue(60), height: RFValue(60), borderRadius: 20, backgroundColor: '#ddd' },
        ]}
      />
    );
  }

  return (
    <View style={[commonStyles.alignCenter, commonStyles.justifyCenter]}>
      <Image
        source={{ uri: `https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/${icon}` }}
        style={{ width: RFValue(60), height: RFValue(60), borderRadius: 20 }}
        resizeMode="contain"
        onError={() => console.warn('Image failed to load:', icon)}
      />
    </View>
  );
};

export default CustomMarker;
