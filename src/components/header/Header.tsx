import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer';

import { ITheme } from 'interfaces/common';

import CustomImage from 'src/components/customImage';
import CONSTANTS from 'common/constants';
import images from 'common/images';
import COLORS from 'common/colors';

import STYLES from './Header.style';

interface IProps extends DrawerHeaderProps {
  children?: JSX.Element | JSX.Element[] | undefined,
  isAuthStack: boolean,
  theme: ITheme,
}

function isMenuScreen(routeName: string) {
  // NOTE: we can add more screen for show menu
  return routeName === CONSTANTS.HOME_SCREEN || routeName === CONSTANTS.PROFILE_SCREEN;
}

function isShowProfile(routeName: string) {
  // NOTE: we can add more screen for hide profile
  return routeName !== CONSTANTS.CHANGE_PASSWORD_SCREEN;
}

const Header = (props: IProps) => {

  const { route, navigation, options, children, isAuthStack, theme } = props;

  const styles = STYLES({ ...theme });

  const showMenu: boolean = isMenuScreen(route.name);
  const showProfile: boolean = isShowProfile(route.name);

  const onPressMenu = () => { navigation?.toggleDrawer(); };

  const onPressBack = () => { navigation.goBack(); };

  const onPressProfile = () => { navigation.navigate(CONSTANTS.PROFILE_SCREEN); };

  const RenderLeft = () => {
    if (showMenu) {
      return <CustomImage onPress={onPressMenu} source={images.ic_menu} imageStyle={styles.menuIcon} tintColor={COLORS.blue} />;
    }
    return <CustomImage onPress={onPressBack} source={images.ic_arrowLeft} imageStyle={styles.leftIcon} tintColor={COLORS.blue} />;
  };

  const RenderHeader = () => {
    return (
      <View><Text style={styles.title} >{options.title}</Text></View>
    );
  };

  const RenderRight = () => {
    return (
      <CustomImage onPress={onPressProfile} showLoader={true} source={{ uri: images.ic_userUri }} imageStyle={styles.profileIcon} />
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {RenderLeft()}
        </View>
        <View style={styles.titleContainer}>
          {RenderHeader()}
        </View>
        <View style={styles.rightContainer}>
          {!isAuthStack && showProfile && RenderRight()}
        </View>
        {children}
      </View>
    </>
  );
};

const DefaultProps = {
  isAuthStack: false,
};

Header.defaultProps = DefaultProps;

export default Header;
