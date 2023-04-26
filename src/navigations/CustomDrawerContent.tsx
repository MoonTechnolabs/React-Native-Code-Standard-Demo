import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import { signOutUser } from 'store/actions/signIn';
import { ITheme } from 'interfaces/common';

import CustomImage from 'src/components/customImage';
import images from 'common/images';

import common from 'common/common.styles';

interface IProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
  theme: ITheme,
}

const CustomDrawerContent = (props: IProps) => {

  const { theme } = props;
  const styles = STYLES({ ...theme });
  const dispatch = useDispatch();

  const onPressLogout = () => {
    dispatch(signOutUser());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{ marginTop: 10 }}>
          <CustomImage source={{ uri: images.ic_userUri }} imageStyle={styles.profileIcon} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.txtUsername}>Username</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props} >
        <View style={{}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity style={{ margin: 16 }} onPress={onPressLogout} >
        <Text style={styles.txtLogout}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.txtVersion} >{`v${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`}</Text>
      </View>
    </SafeAreaView>
  );
};

const STYLES = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.borderColor,
  },
  profileIcon: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
  bottomContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.borderColor,
  },
  txtUsername: {
    ...common.font_16_20,
    color: theme.colors.text,
  },
  txtLogout: {
    ...common.font_16_20,
    color: theme.colors.text,
  },
  txtVersion: {
    ...common.font_16_20,
    color: theme.colors.text,
  },
});

export default CustomDrawerContent;
