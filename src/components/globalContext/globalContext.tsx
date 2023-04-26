import React, { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";

import { theme, darkTheme } from 'common/theme';
import ContextData from 'utils/context';

const GlobalContext = (props: { children: any; }) => {

  const [darkMode, setDarkMode] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);

  // Handle Network State
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected/*  && state.isInternetReachable */);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, [])


  const themeData = {
    theme: darkMode ? darkTheme : theme,
    darkMode,
    setDarkMode,
    isOffline,
  };

  return (
    <ContextData.Provider value={themeData}>
      {props.children}
    </ContextData.Provider>
  );
};


export default GlobalContext;
