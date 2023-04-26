import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';

import SafeAreaContainer from 'components/safeAreaContainer';
import MainButton from 'components/button';
import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';
import ContextData from 'utils/context';

import { IContext, INavigation } from 'interfaces/common';

import STYLES from './LandingScreen.style';
import images from 'common/images';
import CustomImage from 'src/components/customImage';

interface IProps {
  navigation: INavigation
}

const LandingScreen = (props: IProps) => {
  console.log('LandingScreen props: ', props);

  const { login, signUp } = STRINGS;

  const context: IContext = useContext(ContextData);
  const { theme, darkMode } = context;
  const styles = STYLES(theme);

  const onPressSignIn = () => {
    props.navigation.navigate(CONSTANTS.SIGN_IN_SCREEN);
  };

  const onPressSignUp = () => {
    props.navigation.navigate(CONSTANTS.SIGN_UP_SCREEN);
  };

  return (
    <>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaContainer>
        <View style={styles.container}>
          <CustomImage source={images.ic_bootsplash} imageStyle={styles.logoStyle} />
          <View style={styles.subContainer}>
            <View style={{}}>
              <MainButton title={login.btnSignIn} onPress={onPressSignIn} />
            </View>
            <View style={styles.view} />
            <View style={{}}>
              <MainButton title={signUp.btnSignUp} onPress={onPressSignUp} />
            </View>
          </View>
        </View>
      </SafeAreaContainer>
    </>
  );
};

export default LandingScreen;
