import Cookies from "js-cookie";

export const setAuthCookies = (data) => {
  const { token } = data;
  Cookies.set("token", token, { expires: 14 }); // expires in 14 days
};

export const setDataInCookies = (key, data) => {
  Cookies.set(key, data, { expires: 7 });
};

export const getDataFromCookies = (key) => {
  return Cookies.get(key);
};

export const removeDataFromCookies = (keyOfCookies) => {
  return keyOfCookies.forEach((name) => Cookies.remove(name));
};

export const getAuthToken = () => {
  return Cookies.get("token");
};

export const removeAuthToken = () => {
  Cookies.remove("token");
};
