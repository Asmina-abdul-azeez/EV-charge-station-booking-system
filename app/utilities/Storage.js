import AsyncStorage from '@react-native-async-storage/async-storage';

const storeDataItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

const retrieveDataItem = async key => {
  let value;
  try {
    value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const item = JSON.parse(value);
      return item;
    }
    return value;
  } catch (error) {
    return value;
  }
};

export {storeDataItem, retrieveDataItem};
