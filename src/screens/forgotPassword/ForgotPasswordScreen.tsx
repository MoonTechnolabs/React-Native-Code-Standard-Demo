import React, { useContext, useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SafeAreaContainer from 'components/safeAreaContainer';
import MainButton from 'components/button';
import InputBox from 'components/inputBox';
import CONSTANTS from 'common/constants';
import STRINGS from 'common/strings';
import ContextData from 'utils/context';

import { IAForgotPasswordUser, IContext, INavigation, IStates } from 'interfaces/common';
import { forgotPasswordUser } from 'store/actions/forgotPassword';
import { validateForm } from 'utils/functions';

import styles from './ForgotPassword.styles';


interface IProps {
  navigation: INavigation
}
const ForgotPasswordScreen = (props: IProps) => {
  console.log('ForgotPasswordScreen props: ', props);

  const dispatch = useDispatch();

  const context: IContext = useContext(ContextData);
  const { theme } = context;

  const forgotPasswordReducer = useSelector((state: IStates) => state.forgotPasswordReducer);

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState<string | boolean>(true);
  const userNameRef = useRef<string | any>();

  const submit = async () => {
    if (validateForm(CONSTANTS.EMAIL, username) === '') {
      const bodyData: IAForgotPasswordUser = {
        username,
      };
      dispatch(forgotPasswordUser(bodyData));
    } else {
      setUsernameError(validateForm(CONSTANTS.EMAIL, username));
      userNameRef.current.focus();
    }
  };

  const validate = (name = '', type = '') => {
    if (type === CONSTANTS.EMAIL) {
      setUsernameError(validateForm(CONSTANTS.EMAIL, name));
      setUsername(name);
    }
  };

  const { forgotPassword, btnSubmit } = STRINGS;

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <ScrollView scrollEnabled={false}>
          <View style={styles.inputContainer}>
            <InputBox
              placeholder={forgotPassword.email}
              value={username}
              refInput={userNameRef}
              returnKeyType="next"
              onChangeText={text => validate(text, CONSTANTS.EMAIL)}
              onSubmitEditing={submit} />
            {usernameError !== true &&
              <Text style={styles.errorText}>{usernameError}</Text>
            }
          </View>
        </ScrollView>
        <View style={styles.buttonStyle}>
          <MainButton
            title={btnSubmit}
            onPress={submit}
            loading={forgotPasswordReducer.loading}
            disabled={forgotPasswordReducer.loading}
            loaderColor={theme.colors.buttonLoaderColor}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default ForgotPasswordScreen;
