import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import api from './api';

export const login = async (username: string, password: string) => {
  const response = await api.post('/login_check', { username, password });
  const token = response.data.token;
  await AsyncStorage.setItem('userToken', token);
  return token;
};

export const logout = async () => {
  await AsyncStorage.removeItem('userToken');
};

export const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

export const getUsernameFromToken = async (): Promise<string | null> => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.username || decoded.email || null;
  };
