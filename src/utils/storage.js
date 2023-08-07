export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access-token");
};

export const setAccessTokenToLocalStorage = (token) => {
  return localStorage.setItem("access-token", token);
};

export const getRoleFromStorage = () => {
  return localStorage.getItem("role");
};

export const setRoleToStorage = (role) => {
  return localStorage.setItem("role", role);
};
