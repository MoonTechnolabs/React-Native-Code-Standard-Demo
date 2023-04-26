import { Platform } from 'react-native';
import SIZES from 'utils/sizes';

//! for Animations
const useNativeDriver = Platform.select({ ios: false, default: true });

const CONSTANTS = {

  // screen names
  LANDING_SCREEN: 'LandingScreen',
  SIGN_IN_SCREEN: 'SignInScreen',
  SIGN_UP_SCREEN: 'SignUpScreen',
  FORGOT_PASSWORD_SCREEN: 'ForgotPasswordScreen',
  HOME_SCREEN: 'HomeScreen',
  ROOT: 'Root',
  CHANGE_PASSWORD_SCREEN: 'ChangePasswordScreen',
  PROFILE_SCREEN: 'ProfileScreen',

  // image resize mode
  IMAGE_CENTER: 'center',
  IMAGE_CONTAIN: 'contain',
  IMAGE_COVER: 'cover',
  IMAGE_REPEAT: 'repeat',
  IMAGE_STRETCH: 'stretch',

  // language code
  ENGLISH: 'en',
  HINDI: 'hi',

  LARGE: 'large',
  SMALL: 'small',

  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  OLD_PASSWORD: 'oldPassword',
  NEW_PASSWORD: 'newPassword',
  CONFIRM_PASSWORD: 'confirmPassword',

  // Toast Message Type
  SUCCESS: 'success',
  ERROR: 'error',

  //! for Animations
  useNativeDriver,

  //! For Animation Open
  Animation_Open: {
    toValue: SIZES.tostHight,
    duration: 350,
    useNativeDriver: useNativeDriver,
  },

  //! For animation close
  Animation_Close: {
    toValue: SIZES.tostBackHight,
    duration: 350,
    delay: SIZES.tostTime,
    useNativeDriver: useNativeDriver,
  },

  HEADER_HEIGHT: 50,
};

export default CONSTANTS;
