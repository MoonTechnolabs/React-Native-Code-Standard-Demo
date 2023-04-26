import React, { useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import FastImage, { ResizeMode, ImageStyle } from 'react-native-fast-image';

import Clickable from 'components/clickable';
import Loader from 'components/loader';
import images from 'common/images';

import styles from './CustomImage.style';

interface IProps {
  source: { uri: string } | number,
  containerStyle?: StyleProp<ViewStyle>,
  imageStyle?: StyleProp<ImageStyle>,
  showLoader?: boolean
  resizeMode?: ResizeMode,
  tintColor?: string,
  onPress?: () => void
}

const DefaultProps = {
  source: images.ic_user,
  containerStyle: {},
  imageStyle: {},
  showLoader: false,
  resizeMode: FastImage.resizeMode.contain,
  onPress: () => { },
};

const CustomImage = (props: IProps) => {
  const [loading, setLoading] = useState(true);

  const { source, resizeMode, containerStyle, imageStyle, onPress, showLoader, tintColor } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Clickable onPress={onPress} activeOpacity={1}>
        <FastImage
          source={source || images.ic_user}
          defaultSource={images.ic_user}
          style={[styles.image, imageStyle]}
          resizeMode={resizeMode}
          tintColor={tintColor}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </Clickable>
      {(showLoader && loading) && <Loader after={true} size="small" />}
    </View>
  );
};

CustomImage.defaultProps = DefaultProps;

export default CustomImage;
