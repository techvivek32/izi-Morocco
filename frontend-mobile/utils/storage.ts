// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const Token = 'accessToken';

export const storage = {
  getAccessToken: () => AsyncStorage.getItem(Token),
  setTokens: async (access: string) => {
    const ops: [string, string][] = [[Token, access]];
    await AsyncStorage.multiSet(ops);
  },
  clearTokens: () => AsyncStorage.multiRemove([Token]),
};
