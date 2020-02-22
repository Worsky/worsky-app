import AsyncStorage from "@react-native-community/async-storage";

export const refreshedToken = async token => {
  try {
    await AsyncStorage.setItem("@UserCredentials:token", token);

    return true;
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};

export const postToken = async (token, refreshToken, username, password) => {
  try {
    await AsyncStorage.setItem("@UserCredentials:token", token);
    await AsyncStorage.setItem("@UserCredentials:refreshToken", refreshToken);
    await AsyncStorage.setItem("@UserCredentials:username", username);
    await AsyncStorage.setItem("@UserCredentials:password", password);

    return true;
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};

export const getToken = async () => ({
  token: await AsyncStorage.getItem("@UserCredentials:token"),
  refreshToken: await AsyncStorage.getItem("@UserCredentials:refreshToken"),
  username: await AsyncStorage.getItem("@UserCredentials:username"),
  password: await AsyncStorage.getItem("@UserCredentials:password")
});

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("@UserCredentials:token");
    await AsyncStorage.removeItem("@UserCredentials:refreshToken");
    await AsyncStorage.removeItem("@UserCredentials:username");
    await AsyncStorage.removeItem("@UserCredentials:password");

    return true;
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};
