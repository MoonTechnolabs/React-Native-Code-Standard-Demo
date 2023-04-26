import { put, call } from 'redux-saga/effects';

import STRINGS from 'common/strings';

import { IAction } from 'interfaces/common';
import { STATUS_CODE } from 'services/apiConfig';
import { IChangePasswordResponseData } from 'interfaces/ApiInterface';

import { noInternet, toastError, toastRemoveData, toastSuccess } from '../actions/common';
import { changePassword } from 'services/changePassword';
import { changePasswordFailure, changePasswordSuccess } from '../actions/changePassword';


export function* changePasswordUser(data: IAction) {
  try {
    // clearing internet reducer state before API call
    yield put(noInternet());
    yield put(toastRemoveData());

    const response: IChangePasswordResponseData = yield call(changePassword, data.payload);
    console.log('Change Password Response', response?.data);

    if (response?.data?.code === STATUS_CODE.success) {
      yield put(changePasswordSuccess(response?.data?.msg));
      yield put(toastSuccess(response?.data?.msg));
    } else if (response?.data?.code === STATUS_CODE.noInternet) {
      yield put(noInternet(STRINGS.errorNoNetwork));
      yield put(toastError(STRINGS.errorNoNetwork));
    } else {
      yield put(changePasswordFailure(response?.data?.msg));
      yield put(toastError(response?.data?.msg));
    }
  } catch (error: any) {
    yield put(changePasswordFailure(STRINGS.errorNetwork));
    yield put(toastError(STRINGS.errorNetwork));
  }
}
