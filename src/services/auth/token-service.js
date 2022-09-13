class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.message.refresh_token;
  }
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.message.access_token;
  }
  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.message.access_token = token;
    localStorage.setItem("user", JSON.stringify(user));
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  setUser(user) {
    const userStorage = {isLogined: true,message: {...user}}
    // console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(userStorage));
  }
  removeUser() {
    localStorage.removeItem("user");
  }
}
export default new TokenService();
