import { put, call } from 'redux-saga/effects';

import STRINGS from 'common/strings';

import { IAction } from 'interfaces/common';
import { STATUS_CODE } from 'services/apiConfig';
import { ISignUpResponseData } from 'interfaces/ApiInterface';

import { noInternet, toastError, toastRemoveData, toastSuccess } from '../actions/common';
import { signUp } from 'services/signUp';
import { signUpFailure, signUpSuccess } from '../actions/signUp';


export function* signUpUser(data: IAction) {
  try {
    // clearing internet reducer state before API call
    yield put(noInternet());
    yield put(toastRemoveData());

    const response: ISignUpResponseData = yield call(signUp, data.payload);
    if (response?.data?.code === STATUS_CODE.success) {
      yield put(signUpSuccess(response?.data?.data));
      yield put(toastSuccess(response.data.msg));
    } else if (response?.data?.code === STATUS_CODE.noInternet) {
      yield put(noInternet(STRINGS.errorNoNetwork));
      yield put(toastError(STRINGS.errorNoNetwork));
    } else {
      yield put(signUpFailure(response?.data?.msg));
      yield put(toastError(response?.data?.msg));
    }
  } catch (error: any) {
    yield put(signUpFailure(STRINGS.errorNetwork));
    yield put(toastError(STRINGS.errorNetwork));
  }
}
