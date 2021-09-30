import http from "./http-common";
import { UserActions } from "../store/User-slice";

export function singup(data) {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await http.post("/users/", data);
      return response.data;
    };

    try {
      const data = await fetchData();
    } catch (error) {
      console.log(error);
    }
  };
}

export function login(userName, pass) {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await http
        .get(`/users?userName=${userName}&password=${pass}`)
        .then((resp) => {
          return resp;
        });
      return response.data;
    };

    try {
      const data = await fetchData();
      dispatch(UserActions.setUserSession(data[0]));
    } catch (error) {
      console.log(error);
    }
  };
}
