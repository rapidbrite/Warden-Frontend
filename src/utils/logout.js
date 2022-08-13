export const logout = () => {
    localStorage.clear();
    console.log(window.location.pathname);
    window.location.pathname = "/login";
};
  