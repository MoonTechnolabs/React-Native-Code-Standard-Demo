import { StyleSheet } from 'react-native';

import { ITheme } from 'interfaces/common';
import common from 'common/common.styles';
import COLORS from 'common/colors';

const styles = (theme: ITheme) => StyleSheet.create({
  container: {
    ...common.horizontalMargin,
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  titleView: {
    marginTop: 10,
    alignSelf: 'center',
  },
  textStyle: {
    ...common.font_20_26,
    color: theme.colors.text,
  },
  languageContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  languageView: {
    width: 100,
    padding: 10,
  },
  languageText: {
    ...common.font_16_24,
    color: theme.colors.text,
    textAlign: 'center',
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: theme.isPortrait ? 20 : 10,
  },
  switchText: {
    ...common.font_16_24,
    color: theme.colors.text,
    marginRight: 10,
  },
  btnStyle: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
});

export default styles;
