import axios from "axios";
import {
  CREATE_SALON_REQUEST,
  CREATE_SALON_SUCCESS,
  CREATE_SALON_FAILURE,
  UPDATE_SALON_REQUEST,
  UPDATE_SALON_SUCCESS,
  UPDATE_SALON_FAILURE,
  FETCH_SALONS_REQUEST,
  FETCH_SALONS_SUCCESS,
  FETCH_SALONS_FAILURE,
  FETCH_SALON_BY_ID_REQUEST,
  FETCH_SALON_BY_ID_SUCCESS,
  FETCH_SALON_BY_ID_FAILURE,
  FETCH_SALON_BY_OWNER_REQUEST,
  FETCH_SALON_BY_OWNER_SUCCESS,
  FETCH_SALON_BY_OWNER_FAILURE,
  SEARCH_SALONS_REQUEST,
  SEARCH_SALONS_SUCCESS,
  SEARCH_SALONS_FAILURE,
} from "./actionTypes";
import api from "../../config/api";

const API_BASE_URL = "/api/salons";

export const createSalon = (reqData ) => async (dispatch) => {
  dispatch({ type: CREATE_SALON_REQUEST });
  try {
    const response = await api.post(`/auth/signup`, reqData.ownerDetails);

    console.log("response ", response.data);

    localStorage.setItem("jwt", response.data.data.jwt);

    const { data } = await api.post(API_BASE_URL, reqData.salonDetails, {
      headers: { Authorization: `Bearer ${response.data.data.jwt}` },
    });

    reqData.navigate("/salon-dashboard");

    console.log("salon created successfully", data);
    dispatch({ type: CREATE_SALON_SUCCESS, payload: data });
  } catch (error) {
    console.log("error creating salon", error);
    alert("Error creating salon. Please try again.");
    dispatch({ type: CREATE_SALON_FAILURE, payload: error.message });
    reqData.navigate("/");
  }
};

export const updateSalon = (salonId, salon) => async (dispatch) => {
  dispatch({ type: UPDATE_SALON_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/${salonId}`, salon,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    });
    dispatch({ type: UPDATE_SALON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_SALON_FAILURE, payload: error.message });
  }
};

export const fetchSalons = () => async (dispatch) => {
  dispatch({ type: FETCH_SALONS_REQUEST });
  try {
    const { data } = await api.get(API_BASE_URL,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    });
    console.log("all salons ",data)
    dispatch({ type: FETCH_SALONS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error fetching salons", error);
    dispatch({ type: FETCH_SALONS_FAILURE, payload: error.message });
  }
};

export const fetchSalonById = (salonId) => async (dispatch) => {
  dispatch({ type: FETCH_SALON_BY_ID_REQUEST }); 
  try {
    const { data } = await api.get(`${API_BASE_URL}/${salonId}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    });
    dispatch({ type: FETCH_SALON_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_SALON_BY_ID_FAILURE, payload: error.message });
  }
};

export const fetchSalonByOwner = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_SALON_BY_OWNER_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/owner`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("salon by owner - ", data);
    dispatch({ type: FETCH_SALON_BY_OWNER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error fetching salon by owner - ", error);
    dispatch({ type: FETCH_SALON_BY_OWNER_FAILURE, payload: error.message });
  }
};

export const searchSalon = ({jwt,city}) => async (dispatch) => {
  dispatch({ type: SEARCH_SALONS_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/search`, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { city: city },
    });
    console.log("Search salon - ", data);
    dispatch({ type: SEARCH_SALONS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error fetching salon by owner - ", error);
    dispatch({ type: SEARCH_SALONS_FAILURE, payload: error.message });
  }
};
