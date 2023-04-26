import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../Types';
import { IASignUpSuccess, IASignUpUser } from 'interfaces/common';

// SignIn User Actions

export const signUpUser = (user: IASignUpUser) => ({
  type: SIGNUP_REQUEST,
  payload: user,
});

export const signUpSuccess = (response: IASignUpSuccess) => ({
  type: SIGNUP_SUCCESS,
  payload: response,
});

export const signUpFailure = (error: string = '') => ({
  type: SIGNUP_FAILURE,
  error: error,
});



