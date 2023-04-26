import { StyleSheet } from 'react-native';

import common from 'common/common.styles';
import { ITheme } from 'interfaces/common';

const styles = (theme: ITheme) => StyleSheet.create({
  container: {},
  mainStyle: {
    backgroundColor: theme.colors.buttonBackground,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  viewStyle: {
    ...common.wrapper,
  },
  textStyle: {
    ...common.font_16_20,
    color: theme.colors.buttonText,
  },
});

export default styles;
