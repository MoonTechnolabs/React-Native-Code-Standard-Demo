import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { generateRegExp, isIOS, validateForm, validationLengthCheck } from 'utils/functions';
import { IASignUpUser, INavigation, IStates } from 'interfaces/common';
import { signUpUser } from 'store/actions/signUp';

import InputBox from 'components/inputBox';
import MainButton from 'components/button';
import SafeAreaContainer from 'components/safeAreaContainer';
import CONSTANTS from 'common/constants';
import REGEX from 'common/regex';
import STRINGS from 'common/strings';

import styles from './SignUp.style';
interface IProps {
  navigation: INavigation
}

const SignUpScreen = (props: IProps) => {
  console.log('SignUpScreen props: ', props);

  const dispatch = useDispatch();

  const signUpReducer = useSelector((state: IStates) => state.signUpReducer);

  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [userError, setUserError] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // const onFocus = (refFocus: string | any) => {
  //   refFocus.current?.focus();
  // };

  const onChangeText = (name = '', type = '') => {
    switch (type) {
      case CONSTANTS.FIRST_NAME:
        setUserError({ ...userError, firstName: validateForm(CONSTANTS.FIRST_NAME, name) });
        setUser({ ...user, firstName: name?.replace(generateRegExp(REGEX.username), '') });
        break;
      case CONSTANTS.LAST_NAME:
        setUserError({ ...userError, lastName: validateForm(CONSTANTS.LAST_NAME, name) });
        setUser({ ...user, lastName: name?.replace(generateRegExp(REGEX.username), '') });
        break;
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

  const setFocus = (refFocus: string | any) => {
    refFocus.current?.focus();
  };

  // const handleFocus = (validations: Array<any> = []) => {
  //   if (validations[0] !== '') {
  //     setFocus(firstNameRef);
  //   } else if (validations[1] !== '') {
  //     setFocus(lastNameRef);
  //   } else if (validations[2] !== '') {
  //     setFocus(usernameRef);
  //   } else if (validations[3] !== '') {
  //     setFocus(passwordRef);
  //   } else {
  //     setFocus(firstNameRef);
  //   }
  // };

  const handleSignUp = async () => {
    const validations = await Promise.all([
      validateForm(CONSTANTS.FIRST_NAME, user.firstName),
      validateForm(CONSTANTS.LAST_NAME, user.lastName),
      validateForm(CONSTANTS.EMAIL, user.email),
      validateForm(CONSTANTS.PASSWORD, user.password),
    ]);

    if (validationLengthCheck(validations)) {
      const bodyData: IASignUpUser = {
        username: user.email,
        password: user.password,
        first_name: user.firstName,
        last_name: user.lastName,
        phone_number: '1234567890',
        country_id: '1',
        zip_code: '123456',
      };
      dispatch(signUpUser(bodyData));
    } else {
      setUserError({
        firstName: validations[0],
        lastName: validations[1],
        email: validations[2],
        password: validations[3],
      })
    }
  };

  const RenderInputBox = (key: string, value: string, placeholder: string, ref: any, focusNext: any, errorMsg: string, isLastField: boolean = false) => {
    return (
      <View style={styles.inputContainer}>
        <InputBox
          placeholder={placeholder}
          value={value}
          refInput={ref}
          autoFocus={key === CONSTANTS.FIRST_NAME ? true : false}
          returnKeyType={isLastField ? 'done' : 'next'}
          onChangeText={(text) => onChangeText(text, key)}
          onSubmitEditing={() => isLastField ? handleSignUp() : setFocus(focusNext)}
        />
        {errorMsg !== '' &&
          <Text style={styles.errorText}>{errorMsg}</Text>}
      </View>
    );
  };

  const { signUp } = STRINGS;
  console.log("render: ", userError);

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={[{ flex: 1 }, {}]}
          behavior={isIOS() ? 'padding' : null}
          enabled={isIOS() ? true : false}>
          <ScrollView>
            {RenderInputBox(CONSTANTS.FIRST_NAME, user.firstName, signUp.firstName, firstNameRef, lastNameRef, userError.firstName)}
            {RenderInputBox(CONSTANTS.LAST_NAME, user.lastName, signUp.lastName, lastNameRef, usernameRef, userError.lastName)}
            {RenderInputBox(CONSTANTS.EMAIL, user.email, signUp.email, usernameRef, passwordRef, userError.email)}
            {RenderInputBox(CONSTANTS.PASSWORD, user.password, signUp.password, passwordRef, null, userError.password, true)}
          </ScrollView>
          <View style={styles.buttonStyle}>
            <MainButton
              title={signUp.btnSignUp}
              loading={signUpReducer?.loading}
              disabled={signUpReducer?.loading}
              onPress={handleSignUp}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaContainer >
  );
};

export default SignUpScreen;
