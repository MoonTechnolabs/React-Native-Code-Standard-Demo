import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ContextData from 'utils/context';
import SIZES from 'utils/sizes';
import CONSTANTS from 'common/constants';
import ProgressiveImage from 'components/progressiveImage';

import { IContext, INavigation } from 'interfaces/common';

import STYLES from './Profile.style';

interface IProps {
  navigation: INavigation
}
const ProfileScreen = (props: IProps) => {
  console.log('ProfileScreen props: ', props);

  const context: IContext = useContext(ContextData);
  const { theme } = context;
  const styles = STYLES({ ...theme });

  const onPressChangePassword = () => {
    props.navigation.navigate(CONSTANTS.CHANGE_PASSWORD_SCREEN);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressChangePassword}>
        <Text style={styles.changePasswordStyle}>{'Change Password'}</Text>
      </TouchableOpacity>
      <ProgressiveImage
        thumbnailSource={{ uri: `https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1600` }}
        source={{ uri: `https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1600` }}
        imageStyle={{ width: SIZES.deviceWidth, height: SIZES.deviceWidth }}
      />
    </View>
  );
};

export default ProfileScreen;
