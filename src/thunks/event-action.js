import http from "./http-common";
import { IndexActions } from "../store/Index-slice";

export function create(data) {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await http.post("/events/", data);
      return response.data;
    };

    try {
      const data = await fetchData();
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteEvent(id) {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await http.delete(`/events/${id}`);
      return response.data;
    };

    try {
      const data = await fetchData();
    } catch (error) {
      console.log(error);
    }
  };
}

export function get(id) {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await http.get(`/events/${id}`);
      return response.data;
    };

    try {
      const data = await fetchData();
      dispatch(IndexActions.getEvent(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAll() {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await http.get("/events");
      return response.data;
    };

    try {
      const data = await fetchData();
      dispatch(IndexActions.getAllEvents(data));
    } catch (error) {
      console.log(error);
    }
  };
}
