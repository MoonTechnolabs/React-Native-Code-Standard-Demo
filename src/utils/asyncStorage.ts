import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN = 'TOKEN';

export const setToken = async (dataString: string | undefined) => {
  await AsyncStorage.setItem(TOKEN, `${dataString}`);
};

export const removeToken = async () => await AsyncStorage.removeItem(TOKEN);

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN);
};
