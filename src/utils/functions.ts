import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import STRINGS from 'common/strings';
import REGEX from 'common/regex';

/**
 * * For Add element in Array
 * @param arrayList [{a:1},{a:2},{a:3},{a:4},{a:5}]
 * @param data {a:6}
 * @param positionLast true
 * @returns [{a:1},{a:2},{a:3},{a:4},{a:5},{a:6}]
 */
export function addElementToArray(arrayList: Array<any>, data: object, positionLast: boolean = true): Array<any> {
  return positionLast ? [...arrayList, data] : [data, ...arrayList];
}

/**
 * * For Add array in Array
 * @param arrayMain [1,2,3,4,5]
 * @param arraySub [6,7]
 * @param positionLast true
 * @returns [1,2,3,4,5,6,7]
 */
export function addArrayToArray(arrayMain: Array<any>, arraySub: Array<any>, positionLast: boolean = true): Array<any> {
  return positionLast ? [...arrayMain, ...arraySub] : [...arraySub, ...arrayMain];
}

/**
 * * For get the Number in the "K" and "M" format
 * @Input = 100 => @Output = 100
 * @Input = 1500 => @Output = 1.5K
 * @Input = 1500000 => @Output = 1.5M
 */
export function numberConversation(numberValue: number = 0, floatCount: number = 1): string {
  const count_M = +(numberValue / 1000000).toFixed(floatCount);
  const count_K = +(numberValue / 1000).toFixed(floatCount);
  return (count_M >= 1) ? `${count_M}M` : (count_K >= 1) ? `${count_K}K` : `${numberValue}`;
}

/**
 * * For Fix the array gride blanc box with empty object
 * @param arrayData = [{id:1},{id:2},{id:2}]
 * @param grideCount = 2
 * @returns = [{id:1},{id:2},{id:2},{empty: true}]
 */
export function fillGride(arrayData: Array<any>, grideCount: number = 0): Array<any> {
  const numberOfFullRows = Math.floor(arrayData.length / grideCount);
  let numberOfElementsLastRow = arrayData.length - numberOfFullRows * grideCount;
  let finalArray = [...arrayData];
  while (
    numberOfElementsLastRow !== grideCount &&
    numberOfElementsLastRow !== 0
  ) {
    finalArray = [...finalArray, { empty: true }];
    numberOfElementsLastRow++;
  }
  return finalArray;
}

/**
 * * For find the percentage value
 * @param amountValue 100
 * @param Percent 10
 * @returns 10
 */
export function findPercentage(amountValue: number = 0, Percent: number = 0): number {
  return (amountValue * Percent) / 100;
}

/**
 * * validate the value is not a number
 * @param value EX.1=>demo2 || EX.2=>demo
 * @returns     Ex.1=>false || EX.2=>true
 */
export function isNAN(value: string = ''): boolean {
  return REGEX.isNAN.test(value);
}

/**
 * * validate email format
 * @param email Demo1@dome.com
 * @returns true
 */
export function validateEmail(email: string = ''): boolean {
  return REGEX.email.test(email);
}

/**
 * * validate password format
 * @param password Demo@123
 * @returns true
 */
export function validatePassword(password: string = ''): boolean {
  return REGEX.password.test(password);
}

/**
 * * validate password strength
 * @param N 1
 * @param passValue Demo1
 * @returns '60%'
 * N = 1 to get percentage
 * N = 2 to get color
 * N = 3 to get text
 */
export function validatePasswordStrength(N: number = 1, passValue: string = ''): string {
  const { passwordStrong, passwordMedium, passwordSoSo, passwordWeek } = REGEX;

  if (passwordStrong.test(passValue)) {
    return N === 1 ? '100%' : N === 2 ? COLORS.green : STRINGS.textStrong;
  } else if (passwordMedium.test(passValue)) {
    return N === 1 ? '80%' : N === 2 ? COLORS.yellow : STRINGS.textMedium;
  } else if (passwordSoSo.test(passValue)) {
    return N === 1 ? '60%' : N === 2 ? COLORS.orange : STRINGS.textSoSo;
  } else if (passwordWeek.test(passValue)) {
    return N === 1 ? '40%' : N === 2 ? COLORS.orange1 : STRINGS.textWeak;
  } else {
    return N === 1 ? '20%' : N === 2 ? COLORS.red : STRINGS.textVeryWeek;
  }
}

/**
 * * For change the string format
 * @param stringValue 'test Key'
 * @param isFirstCap true
 * @param replace true
 * @param replaceWith ' '
 * @param replaceTo '-'
 * @returns 'Test-key'
 */
export function stringFormat(stringValue: string = '', isFirstCap: boolean = true, replace: boolean = false, replaceWith: string = ' ', replaceTo: string = '_'): string {
  let mainString = stringValue?.trim();
  if (isFirstCap) {
    mainString = mainString.charAt(0).toUpperCase() + mainString.slice(1).toLowerCase();
  }
  if (replace) {
    mainString = mainString.split(replaceWith).join(replaceTo);
  }
  return mainString;
}

/**
  * * validate if string is Empty
  * @param value 'test string'
  * @param isTrim true
  * @param isDash false
  * @param uppercase false
  * @returns 'test string'
  */
export function validateString(value: string = '', isTrim: boolean = true, isDash: boolean = false, uppercase: boolean = false) {
  let string = value ?? ''; // it(??) will check value !== undefined && value !== null
  string = value !== 'null' && value !== '' && value !== '' ? value : '';
  if (string === '') {
    string = isDash ? '-' : '';
  } else {
    if (isTrim) {
      string = (typeof string === 'string') ? string?.trim() : string;
    }
    if (uppercase) {
      string = (typeof string === 'string') ? string?.toUpperCase() : string;
    }
  }
  return string;
}

/**
 * * Pass the character which need to allow in the regular expression
 * @param value 'A-Za-z'
 * @param onlyAllow true
 * @returns /[^A-Za-z]/g
 */
export function generateRegExp(value: string = '', onlyAllow: boolean = true) {
  return new RegExp('[' + (onlyAllow ? '^' : '') + value + ']', 'g');
}


/**
 * * Check for internet connectivity
 */
export async function isConnected() {
  const state = await NetInfo.fetch();
  return state.isConnected;
}

/**
 * * Check for IOS Platform
 */
export function isIOS() {
  return (Platform.OS === 'ios');
}

/**
 *
 * @param key CONSTANT.EMAIL
 * @param val developer@yopmail.com
 * @returns string
 */
export function validateForm(key: string = '', val: string = '') {
  const { validation, changePassword } = STRINGS;
  switch (key) {
    case CONSTANTS.FIRST_NAME:
      return val.length === 0 ? validation.emptyFirstName : '';
    case CONSTANTS.LAST_NAME:
      return val.length === 0 ? validation.emptyLastName : '';
    case CONSTANTS.EMAIL:
      return val.length === 0 ? validation.emptyEmail : !validateEmail(val) ? validation.validEmail : '';
    case CONSTANTS.PASSWORD:
      return val.length === 0 ? validation.emptyPassword : !validatePassword(val) ? validation.validPassword : '';
    case CONSTANTS.OLD_PASSWORD:
      return val.length === 0 ? changePassword.emptyOldPassword : !validatePassword(val) ? changePassword.validOldPassword : '';
    case CONSTANTS.NEW_PASSWORD:
      return val.length === 0 ? changePassword.emptyNewPassword : !validatePassword(val) ? changePassword.validNewPassword : '';
    case CONSTANTS.CONFIRM_PASSWORD:
      return val.length === 0 ? changePassword.emptyConfirmPassword : !validatePassword(val) ? changePassword.validConfirmPassword : '';
    default:
      return '';
  }
}

/**
 * 
 * @param array [true, true]
 * @returns true
 */
export function validationLengthCheck(array: Array<any> = []) {
  return ((array?.filter(obj => obj !== ''))?.length === 0);
}
