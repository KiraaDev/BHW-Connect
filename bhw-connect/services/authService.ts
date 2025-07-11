import { useAuthStore } from '@/stores/useAuthStore';
import axios from './axiosInstance';
import Toast from 'react-native-toast-message';

export const login = async (email: string, password: string) => {
  const response = await axios.post('/users/login', { email, password });
  const { token, user } = response.data;

  useAuthStore.getState().setAuth(token, user);

  return user;
};

export const logout = async () => {
  try {
    await axios.post('/users/logout');
  } catch (error) {
    console.error('Logout request failed:', error);

    Toast.show({
      type: 'error',
      text1: 'Logout failed',
      text2: 'Please check your network and try again.',
      position: 'bottom',
    });
  }

  useAuthStore.getState().clearAuth();
};
