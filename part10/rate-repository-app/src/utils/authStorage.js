import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.key = `${this.namespace}:token`;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(
      this.key
    );

    return token || "";
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      this.key,
      accessToken
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.key)
  }
}

export default AuthStorage;