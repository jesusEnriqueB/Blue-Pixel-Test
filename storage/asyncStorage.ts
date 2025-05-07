import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemStorage = async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) as T : null;
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
};

export const setItemStorage = async <T>(key: string, value: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item:', error);
    }
};

export const removeItemStorage = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
};
