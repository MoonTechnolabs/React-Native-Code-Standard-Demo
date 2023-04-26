import { StyleSheet } from 'react-native';

import COLORS from 'common/colors';
import common from 'common/common.styles';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  buttonStyle: {
    marginHorizontal: 15,
  },
  inputWrapper: {
    marginTop: 20,
  },
  errorText: {
    ...common.font_16_20,
    color: COLORS.red,
    marginTop: 10,
  },
});

export default styles;
