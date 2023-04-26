import { StyleSheet } from 'react-native';

import COLORS from 'common/colors';
import common from 'common/common.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...common.horizontalMargin,
    paddingBottom: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  buttonStyle: {
    marginHorizontal: 15,
  },
  errorText: {
    ...common.font_16_20,
    color: COLORS.red,
  },
});

export default styles;
