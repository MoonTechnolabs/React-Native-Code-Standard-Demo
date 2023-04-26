import React, { useContext, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SafeAreaContainer from 'components/safeAreaContainer';
import MainButton from 'components/button';
import CONSTANTS from 'common/constants';
import InputBox from 'components/inputBox';
import STRINGS from 'common/strings';
import ContextData from 'utils/context';

import { signInUser } from 'store/actions/signIn';
import { IASignInUser, IContext, INavigation, IStates } from 'interfaces/common';
import { validateForm, validationLengthCheck } from 'utils/functions';
import { useOrientation } from 'utils/useOrientation';

import STYLES from './SignIn.style';

interface IProps {
  navigation: INavigation
}

const SignInScreen = (props: IProps) => {

  const { login } = STRINGS;
  const dispatch = useDispatch();

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const { theme } = context;

  const styles = STYLES({ ...theme, isPortrait });

  const signInReducer = useSelector((state: IStates) => state.signInReducer);

  const userNameRef = useRef<string | any>(null);
  const passwordRef = useRef<string | any>(null);

  const [user, setUser] = useState({ email: 'developer1@yopmail.com', password: 'Moon@123' });
  const [userError, setUserError] = useState({ email: '', password: '' });

  const onPressForgotPassword = () => {
    props.navigation.navigate(CONSTANTS.FORGOT_PASSWORD_SCREEN);
  };

  const setFocus = (refFocus: string | any) => {
    refFocus.current?.focus();
  };

  // const moveToFocus = (validation: Array<any> = []) => {
  //   if (validation[0] !== '') {
  //     setFocus(userNameRef);
  //   } else if (validation[1] !== '') {
  //     setFocus(passwordRef);
  //   } else {
  //     setFocus(userNameRef);
  //   }
  // };

  const handleSignIn = async () => {
    const validations = await Promise.all([
      validateForm(CONSTANTS.EMAIL, user.email),
      validateForm(CONSTANTS.PASSWORD, user.password),
    ]);

    if (validationLengthCheck(validations)) {
      const bodyData: IASignInUser = { username: user.email, password: user.password };
      dispatch(signInUser(bodyData));
    } else {
      setUserError({
        email: validations[0],
        password: validations[1],
      })
    }
  };

  const onChangeText = (name = '', type = '') => {
    switch (type) {
      case CONSTANTS.EMAIL:
        setUserError({ ...userError, email: validateForm(CONSTANTS.EMAIL, name) });
        setUser({ ...user, email: name });
        break;
      case CONSTANTS.PASSWORD:
        setUserError({ ...userError, password: validateForm(CONSTANTS.PASSWORD, name) });
        setUser({ ...user, password: name });
        break;
      default:
        break;
    }
  };

  const RenderInputBox = (key: string, value: string, placeholder: string, ref: any, focusNext: any, errorMsg: string, isLastField: boolean = false) => {
    return (
      <View style={styles.inputContainer}>
        <InputBox
          placeholder={placeholder}
          value={value}
          refInput={ref}
          autoFocus={key === CONSTANTS.EMAIL ? true : false}
          returnKeyType={isLastField ? 'done' : 'next'}
          onChangeText={(text) => onChangeText(text, key)}
          onSubmitEditing={() => isLastField ? handleSignIn() : setFocus(focusNext)}
        />
        {errorMsg !== '' &&
          <Text style={styles.errorText}>{errorMsg}</Text>}
      </View>
    );
  };

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <ScrollView scrollEnabled={false}>
          {RenderInputBox(CONSTANTS.EMAIL, user.email, login.email, userNameRef, passwordRef, userError.email)}
          {RenderInputBox(CONSTANTS.PASSWORD, user.password, login.password, passwordRef, null, userError.password, true)}
          <TouchableOpacity onPress={onPressForgotPassword} style={[styles.forgotPasswordView]}>
            <Text style={styles.footerText}>{login.forgotPassword}</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.buttonStyle}>
          <MainButton
            title={login.btnSignIn}
            onPress={handleSignIn}
            loading={signInReducer.loading}
            disabled={signInReducer.loading}
            loaderColor={theme.colors.buttonLoaderColor}
          />
        </View>
      </View>
    </SafeAreaContainer >
  );
};

export default SignInScreen;
