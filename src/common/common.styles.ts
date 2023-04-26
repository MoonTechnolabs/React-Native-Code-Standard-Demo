import { StyleSheet } from 'react-native';

import responsivePixels from 'utils/responsivePixels';
import COLORS from 'common/colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalMargin: { marginHorizontal: 16 },
  shadow: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: COLORS.cynicalBlack,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  image100Per: {
    height: '100%',
    width: '100%',
  },
});

const texts = StyleSheet.create({
  font_10_14: {
    // fontFamily: FONTS.R_G_REGULAR,
    fontSize: responsivePixels.size10,
    lineHeight: responsivePixels.size14,
  },
  font_14_18: {
    // fontFamily: FONTS.R_G_REGULAR,
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size18,
  },
  font_16_20: {
    // fontFamily: FONTS.R_G_REGULAR,
    fontSize: responsivePixels.size16,
    lineHeight: responsivePixels.size20,
  },
  font_16_24: {
    // fontFamily: FONTS.R_G_REGULAR,
    fontSize: responsivePixels.size18,
    lineHeight: responsivePixels.size24,
  },
  font_20_26: {
    // fontFamily: FONTS.R_G_REGULAR,
    fontSize: responsivePixels.size20,
    lineHeight: responsivePixels.size26,
  },
});

const common = StyleSheet.create({
  ...styles,
  ...texts,
  image20: { width: 20, height: 20 },
  image24: { width: 24, height: 24 },
  image30: { width: 30, height: 30 },
  image40: { width: 40, height: 40 },
});



export default common;
