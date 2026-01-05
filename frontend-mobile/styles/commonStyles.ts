import { StyleSheet, Dimensions, PixelRatio, Platform } from 'react-native';
import colors from './colors';

const { width, height } = Dimensions.get('window');

// Scale function for responsive sizes
const scale = (size: number): number => (width / 375) * size; // base 375 is iPhone X width
const verticalScale = (size: number): number => (height / 812) * size; // base iPhone X height
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width > 600 ? 30 : 15,
    backgroundColor: colors.background,
  },
  containerPadded: {
    flex: 1,
    paddingHorizontal: width > 600 ? 30 : 15,
    paddingVertical: height > 700 ? 30 : 15,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    // backgroundColor: colors.background,
  },


  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  h1Text: {
    fontSize: moderateScale(28),
    color: colors.textPrimary,
    fontFamily:'Neue-ExtraBold'
  },
  h2Text: {
    fontSize: moderateScale(20),
    color: colors.textPrimary,
    fontFamily:'Neue-ExtraBold'
  },
  h3Text: {
    fontSize: moderateScale(18),
    color: colors.textPrimary,
    fontFamily:'Neue-Bold'
  },
  pText: {
    fontSize: moderateScale(16),
    color: colors.textSecondary,
    marginTop: verticalScale(8),
    fontFamily: 'Neue-Regular'
  },

  button: {
    width: width * 0.8,
    paddingVertical: verticalScale(12),
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: colors.white,
  },

  card: {
    width: width > 600 ? width * 0.4 : width * 0.9, // 2-column layout on tablets
    padding: moderateScale(15),
    marginVertical: verticalScale(10),
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    width: '100%',
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(15),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    fontSize: moderateScale(14),
    color: colors.textPrimary,
    backgroundColor:colors.white,
  },
  image: {
    width: width * 0.9,
    height: verticalScale(200),
    resizeMode: 'cover',
    borderRadius: 12,
  },
  fullFlex: {
  flex: 1,
},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {
    flexDirection: 'column',
  },
  alignCenter:{
    alignItems:'center',
  },
  alignEnd:{
    alignItems:'flex-end',
  },
  justifyEnd:{
    justifyContent:'flex-end',
  },
  justifyCenter:{
    justifyContent:'center',
  },
  justifyBetween:{
    justifyContent:'space-between',
  },
  safeBottom: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
});

export default commonStyles;
