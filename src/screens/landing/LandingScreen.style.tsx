import { StyleSheet } from 'react-native';
import { ITheme } from 'interfaces/common';

import common from 'common/common.styles';

const styles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    ...common.horizontalMargin,
    backgroundColor: theme.colors.background,
    paddingBottom: 10,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  view: {
    height: theme.isPortrait ? 10 : 5,
  },
  logoStyle: { height: 200, width: 200 },
  textStyle: {
    ...common.font_16_20,
    textAlign: 'center',
    color: theme.colors.text,
    marginTop: 20,
  },
});

export default styles;
