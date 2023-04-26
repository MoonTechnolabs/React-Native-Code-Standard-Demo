import { StyleSheet } from 'react-native';

import COLORS from 'common/colors';
import { ITheme } from 'interfaces/common';
import common from 'common/common.styles';

const styles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    ...common.horizontalMargin,
    paddingBottom: 10,
  },
  inputContainer: {
    marginTop: theme.isPortrait ? 15 : 10,
  },
  forgotPasswordView: {
    alignItems: 'flex-end',
    marginTop: theme.isPortrait ? 15 : 10,
  },
  footerText: {
    ...common.font_16_24,
    color: theme.colors.text,
    textDecorationLine: 'underline',
  },
  buttonStyle: {
    marginHorizontal: 15,
  },
  errorText: {
    color: COLORS.red,
  },
});

export default styles;
