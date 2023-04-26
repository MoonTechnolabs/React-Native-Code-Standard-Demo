import { put, call } from 'redux-saga/effects';

import STRINGS from 'common/strings';

import { IAction } from 'interfaces/common';
import { STATUS_CODE } from 'services/apiConfig';
import { IForgotPasswordResponseData } from 'interfaces/ApiInterface';

import { noInternet, toastError, toastRemoveData, toastSuccess } from '../actions/common';
import { forgotPassword } from 'services/forgotPassword';
import { forgotPasswordFailure, forgotPasswordSuccess } from '../actions/forgotPassword';


export function* forgotPasswordUser(data: IAction) {
  try {
    // clearing internet reducer state before API call
    yield put(noInternet());
    yield put(toastRemoveData());

    const response: IForgotPasswordResponseData = yield call(forgotPassword, data.payload);
    console.log('Forgot Password Response', response?.data);

    if (response?.data?.code === STATUS_CODE.success) {
      yield put(forgotPasswordSuccess(response?.data?.msg));
      yield put(toastSuccess(response?.data?.msg));
    } else if (response?.data?.code === STATUS_CODE.noInternet) {
      yield put(noInternet(STRINGS.errorNoNetwork));
      yield put(toastError(STRINGS.errorNoNetwork));
    } else {
      yield put(forgotPasswordFailure(response?.data?.msg));
      yield put(toastError(response?.data?.msg));
    }
  } catch (error: any) {
    yield put(forgotPasswordFailure(STRINGS.errorNetwork));
    yield put(toastError(STRINGS.errorNetwork));
  }
}
