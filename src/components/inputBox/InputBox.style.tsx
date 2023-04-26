import { StyleSheet } from 'react-native';

import { ITheme } from 'interfaces/common';

const styles = (theme: ITheme) => StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    marginTop: 0,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.borderColor,
  },
  inputContainerStyle: {
    height: '100%',
    borderBottomWidth: 0,
  },
  inputStyle: {
    color: theme.colors.text,
  },
});

export default styles;
