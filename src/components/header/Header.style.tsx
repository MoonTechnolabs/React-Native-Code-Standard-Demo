import { StyleSheet } from 'react-native';

import { getStatusBarHeight } from 'common/statusBar';
import { ITheme } from 'interfaces/common';

import CONSTANTS from 'common/constants';
import common from 'common/common.styles';
import COLORS from 'common/colors';

const styles = (theme: ITheme) => StyleSheet.create({
  container: {
    height: CONSTANTS.HEADER_HEIGHT + getStatusBarHeight(true),
    paddingTop: getStatusBarHeight(true),
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.borderColor,
    backgroundColor: COLORS.white,
  },
  leftContainer: {
    width: 60,
    paddingLeft: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  leftIcon: {
    ...common.image30,
  },
  menuIcon: {
    ...common.image24,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    ...common.font_16_20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  rightContainer: {
    width: 70,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 16,
    backgroundColor: COLORS.white,
  },
  profileIcon: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
  },
});

export default styles;
