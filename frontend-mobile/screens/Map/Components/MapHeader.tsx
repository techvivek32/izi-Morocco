import { Text, View } from 'react-native';
import commonStyles from '../../../styles/commonStyles';
import { ConvertGameTime, useGameTimer } from '../utils/gameTimer';
import { RFValue } from '../../../utils/responsive';
import colors from '../../../styles/colors';

const MapHeader = ({ game, state }: { game: any; state: any }) => {
  const [timeLeft, formattedTime] = useGameTimer(game);

  return (
    <View
      style={[
        commonStyles.row,
        commonStyles.alignCenter,
        commonStyles.justifyBetween,
        {
          height: RFValue(50),
          paddingHorizontal: 16,
          backgroundColor: colors.white,
          gap: RFValue(10),
        },
      ]}
    >
      <View style={[commonStyles.fullFlex]}>
        <Text
          numberOfLines={1}
          style={[
            commonStyles.h3Text,
            { fontSize: RFValue(14), color: colors.black },
          ]}
        >
          {game?.game?.title}
        </Text>
      </View>
      <View
        style={[
          commonStyles.row,
          commonStyles.alignCenter,
          { gap: RFValue(5), width: RFValue(100) },
        ]}
      >
        <Text style={[commonStyles.h3Text, { fontSize: RFValue(14) }]}>
          ⏰{' '}
          {formattedTime ||
            ConvertGameTime(
              game?.game?.timeLimit,
              game?.game?.endTime,
              game?.game?.duration,
            )}
        </Text>
        <Text style={[commonStyles.h3Text, { fontSize: RFValue(14) }]}>
          🏆 {state.score}
        </Text>
      </View>
    </View>
  );
};

export default MapHeader;
