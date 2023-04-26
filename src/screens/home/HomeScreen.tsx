import React, { useContext } from 'react';
import { View, Switch, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { IStates, IContext, INavigation } from 'interfaces/common';
import { setLanguage, setThemeMode } from 'store/actions/common';
import { useOrientation } from 'utils/useOrientation';

import SafeAreaContainer from 'components/safeAreaContainer';
import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import ContextData from 'utils/context';

import STYLES from './Home.style';
import Clickable from 'components/clickable';
import common from 'common/common.styles';

interface IProps {
  navigation: INavigation
}

const HomeScreen = (props: IProps) => {
  console.log('HomeScreen props: ', props);

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const { theme, darkMode, setDarkMode } = context;
  const styles = STYLES({ ...theme, isPortrait });

  const dispatch = useDispatch();

  const commonReducer = useSelector((state: IStates) => state.commonReducer);
  const currentLanguage = commonReducer.language;

  const onChangeTheme = (value: boolean) => {
    setDarkMode(value);
    dispatch(setThemeMode(value));
  };

  const onChangeLanguage = (value: string) => {
    STRINGS.setLanguage(value);
    dispatch(setLanguage(value));
  };

  const RenderLanguage = (language: string = CONSTANTS.ENGLISH, string: string = STRINGS.english) => {
    return (
      <Clickable
        onPress={() => onChangeLanguage(language)}
        containerStyle={[styles.languageView, { backgroundColor: currentLanguage === language ? COLORS.purple : COLORS.gray }]}
      >
        <Text style={styles.languageText} >{string}</Text>
      </Clickable>
    );
  };

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.textStyle}>{STRINGS.hello}</Text>
        </View>
        <View style={styles.languageContainer}>
          {RenderLanguage(CONSTANTS.ENGLISH)}
          {RenderLanguage(CONSTANTS.HINDI, STRINGS.hindi)}
        </View>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchText]}>{STRINGS.theme}</Text>
          <Switch value={darkMode} onValueChange={(val) => onChangeTheme(val)} />
        </View>
        <Clickable containerStyle={[common.shadow, styles.btnStyle]}>
          <Text>Click Me!</Text>
        </Clickable>
      </View>
    </SafeAreaContainer>
  );
};

export default HomeScreen;
