import axios from "axios";
import { LocationActions } from "../store/Location-slice";
import { IndexActions } from "../store/Index-slice";

export function getUserLocation() {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await axios.get("https://geolocation-db.com/json/");
      return response.data["country_name"];
    };

    try {
      const data = await fetchData();
      dispatch(IndexActions.setUserRegion(data));
      dispatch(getLocationStates(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLocationStates(country) {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await axios
        .create({
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .post(`https://countriesnow.space/api/v0.1/countries/states`, {
          country: country,
        });
      return response.data["data"]["states"];
    };

    try {
      const data = await fetchData();
      dispatch(LocationActions.setLocationStates(data));
      dispatch(getCitiesState(country, data[0].name));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCitiesState(country, city) {
  return async (dispatch) => {
    const fetchData = async () => {
      let response = await axios
        .create({
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
          country: country,
          state: city,
        });
      return response.data["data"];
    };

    try {
      const data = await fetchData();
      dispatch(LocationActions.setStateCities(data));
    } catch (error) {
      console.log(error);
    }
  };
}
