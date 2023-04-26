import { StyleSheet } from 'react-native';

import { ITheme } from 'interfaces/common';
import common from 'common/common.styles';

const styles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  changePasswordStyle: {
    ...common.font_16_20,
    color: theme.colors.text,
    marginVertical: 20,
  },
});

export default styles;
