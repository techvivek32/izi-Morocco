export const setDataInSessionStorage = (key, value) => {
  return sessionStorage.setItem(key, value);
};

export const getSessionData = (key) => {
  return sessionStorage.getItem(key);
};

export const removeSessionData = (keys) => {
  return keys.map((key) => sessionStorage.removeItem(key));
};
