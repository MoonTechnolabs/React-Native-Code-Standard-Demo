import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { IStates, IContext } from 'interfaces/common';

import NoInternet from 'components/noInternet';
import CONSTANTS from 'common/constants';
import STRINGS from 'common/strings';
import ContextData from 'utils/context';
import Loader from 'components/loader';
import Toast from 'components/toast';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

const RootNavigation = () => {

  const context: IContext = useContext(ContextData);
  const { theme, setDarkMode, isOffline } = context;
  const toastRef = useRef<any>(null);

  const signInReducer = useSelector((state: IStates) => state.signInReducer);
  const commonReducer = useSelector((state: IStates) => state.commonReducer);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (commonReducer.isError) {
      toastRef?.current?.error(commonReducer.errorMessage);
    } else if (commonReducer.isError === false) {
      toastRef?.current?.success(commonReducer.SuccessMessage);
    }
  }, [commonReducer.isError]);

  useEffect(() => {
    STRINGS.setLanguage(commonReducer?.language ?? CONSTANTS.ENGLISH);
    setDarkMode(commonReducer?.isDarkMode);
    setLoading(false);
  }, []);

  return (
    <NavigationContainer>
      {signInReducer?.authToken === undefined ? <AuthStack theme={theme} /> : <AppStack theme={theme} />}
      <Toast ref={toastRef} />
      {(isOffline) && <NoInternet />}
      {loading && <Loader />}
    </NavigationContainer>
  );
};

export default RootNavigation;
