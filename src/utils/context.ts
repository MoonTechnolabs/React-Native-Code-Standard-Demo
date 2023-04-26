import React from 'react';
import { IContext } from 'interfaces/common';
import { theme } from 'common/theme';

const context: IContext = {
  theme: theme,
  darkMode: false,
  setDarkMode: () => { },
  isOffline: false,
};

const ContextData = React.createContext(context);

export default ContextData;
