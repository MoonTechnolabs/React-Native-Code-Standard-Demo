import React, { useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SafeAreaContainer from 'components/safeAreaContainer';
import MainButton from 'components/button';
import InputBox from 'components/inputBox';
import CONSTANTS from 'common/constants';
import STRINGS from 'common/strings';

import { changePasswordUser } from 'store/actions/changePassword';
import { validateForm, validationLengthCheck } from 'utils/functions';
import { IAChangePasswordUser, INavigation, IStates } from 'interfaces/common';

import styles from './ChangePassword.styles';

interface IProps {
  navigation: INavigation
}
const ChangePasswordScreen = (props: IProps) => {
  console.log('ChangePasswordScreen props: ', props);

  const dispatch = useDispatch();

  const changePasswordReducer = useSelector((state: IStates) => state.changePasswordReducer);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState<string | boolean>(true);
  const [newPasswordError, setNewPasswordError] = useState<string | boolean>(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | boolean>(true);
  const oldPasswordRef = useRef<string | any>();
  const newPasswordRef = useRef<string | any>();
  const confirmPasswordRef = useRef<string | any>();

  const moveToFocus = (validation: Array<any> = []) => {
    if (validation[0] !== true) {
      onFocus(oldPasswordRef);
    } else if (validation[1] !== true) {
      onFocus(newPasswordRef);
    } else if (validation[2] !== true) {
      onFocus(confirmPasswordRef);
    } else {
      onFocus(oldPasswordRef);
    }
  };

  const submit = async () => {
    const validations = await Promise.all([
      validateForm(CONSTANTS.OLD_PASSWORD, oldPassword),
      validateForm(CONSTANTS.NEW_PASSWORD, newPassword),
      validateForm(CONSTANTS.CONFIRM_PASSWORD, confirmPassword),
    ]);
    setOldPasswordError(validations[0]);
    setNewPasswordError(validations[1]);
    setConfirmPasswordError(validations[2]);
    moveToFocus(validations);
    if (validationLengthCheck(validations)) {
      const bodyData: IAChangePasswordUser = {
        currentPassword: oldPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      };
      dispatch(changePasswordUser(bodyData));
    }
  };

  const onFocus = (refFocus: string | any) => {
    refFocus.current?.focus();
  };

  const onChangeText = (password = '', type = '') => {
    switch (type) {
      case CONSTANTS.OLD_PASSWORD:
        setOldPasswordError(validateForm(CONSTANTS.OLD_PASSWORD, password));
        setOldPassword(password);
        break;
      case CONSTANTS.NEW_PASSWORD:
        setNewPasswordError(validateForm(CONSTANTS.NEW_PASSWORD, password));
        setNewPassword(password);
        break;
      case CONSTANTS.CONFIRM_PASSWORD:
        setConfirmPasswordError(validateForm(CONSTANTS.NEW_PASSWORD, password));
        setConfirmPassword(password);
        break;
      default:
        break;
    }
  };

  const { changePassword, btnSubmit } = STRINGS;

  return (
    <SafeAreaContainer>
      <View style={{ flex: 1 }}>
        <ScrollView scrollEnabled={false}>
          <View style={styles.container}>
            <InputBox
              placeholder={changePassword.oldPassword}
              value={oldPassword}
              refInput={oldPasswordRef}
              returnKeyType="next"
              onChangeText={(text) => onChangeText(text, CONSTANTS.OLD_PASSWORD)}
              onSubmitEditing={() => onFocus(newPasswordRef)} />
            {oldPasswordError !== true &&
              <Text style={styles.errorText}>{oldPasswordError}</Text>
            }
            <View style={styles.inputWrapper}>
              <InputBox
                placeholder={changePassword.newPassword}
                value={newPassword}
                refInput={newPasswordRef}
                returnKeyType="next"
                onChangeText={(text) => onChangeText(text, CONSTANTS.NEW_PASSWORD)}
                onSubmitEditing={() => onFocus(confirmPasswordRef)} />
              {newPasswordError !== true &&
                <Text style={styles.errorText}>{newPasswordError}</Text>
              }
            </View>
            <View style={styles.inputWrapper}>
              <InputBox
                placeholder={changePassword.confirmPassword}
                value={confirmPassword}
                refInput={confirmPasswordRef}
                returnKeyType="done"
                onChangeText={(text) => onChangeText(text, CONSTANTS.CONFIRM_PASSWORD)}
                onSubmitEditing={submit}
              />
              {confirmPasswordError !== true &&
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              }
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonStyle}>
          <MainButton
            title={btnSubmit}
            onPress={submit}
            loading={changePasswordReducer.loading}
            disabled={changePasswordReducer.loading}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default ChangePasswordScreen;

