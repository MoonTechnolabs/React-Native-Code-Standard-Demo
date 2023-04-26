/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ITheme } from 'interfaces/common';

import CONSTANTS from 'common/constants';
import Header from 'components/header';

import ChangePasswordScreen from 'screens/changePassword';
import ProfileScreen from 'screens/profile';
import HomeScreen from 'screens/home';

import CustomDrawerContent from './CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

interface IProps {
  theme: ITheme
}

const AppStack = (props: IProps) => {

  const { theme } = props;

  const SideDrawer = () => {
    return (
      <Drawer.Navigator
        initialRouteName={CONSTANTS.HOME_SCREEN}
        screenOptions={() => ({
          header: (props) => <Header {...props} theme={theme} />,
          drawerLabelStyle: { color: theme.colors.text },
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} theme={theme} />}
      >
        <Drawer.Screen name={CONSTANTS.HOME_SCREEN} component={HomeScreen} options={{ title: 'Home' }} />
        <Drawer.Screen name={CONSTANTS.PROFILE_SCREEN} component={ProfileScreen} options={{ title: 'Profile' }} />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator screenOptions={() => ({ header: (props) => <Header {...props} theme={theme} /> })}>
      <Stack.Screen name={CONSTANTS.ROOT} component={SideDrawer} options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name={CONSTANTS.CHANGE_PASSWORD_SCREEN} component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
    </Stack.Navigator>
  );
};

export default AppStack;
