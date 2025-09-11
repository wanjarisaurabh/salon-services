import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  GET_ALL_CUSTOMERS_REQUEST,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_FAILURE,
} from "./actionTypes";
import api, { API_BASE_URL } from "../../config/api";

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  console.log("auth action - ",userData)
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      userData.userData
    );
    const user = response.data;
    if (user.data?.jwt) {
      localStorage.setItem("jwt", user.data.jwt);
      userData.navigate("/");
    }
    console.log("registerr :- ", user);
    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (error) {
    console.log("error ", error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      userData.data
    );
    const user = response.data;
    if (user.data?.jwt) {
      localStorage.setItem("jwt", user.data.jwt);
      if (user.data?.role === "ROLE_ADMIN") {
        userData.navigate("/admin");
      } else if (user.data?.role === "ROLE_SALON_OWNER") {
        userData.navigate("/salon-dashboard");
      }
      else{
        userData.navigate("/");
      }
    }

    console.log("login ", user);
    dispatch(loginSuccess(user));
  } catch (error) {
    console.log("error ", error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

//  get user from token
export const getAllCustomers = (token) => {
  return async (dispatch) => {
    console.log("jwt - ", token);
    dispatch({ type: GET_ALL_CUSTOMERS_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const users = response.data;
      dispatch({ type: GET_ALL_CUSTOMERS_SUCCESS, payload: users });
      console.log("All Customers", users);
    } catch (error) {
      const errorMessage = error.message;
      console.log(error);
      dispatch({ type: GET_ALL_CUSTOMERS_FAILURE, payload: errorMessage });
    }
  };
};

export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await api.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};


//additional for cancalation 
// export const cancelBookingByUser = ({ bookingId, jwt, salonId, salonOwnerId }) => async (dispatch) => {
//   try {
//     await api.put(`${API_BASE_URL}/${bookingId}/cancel`, null, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });

//     dispatch(addNotification({
//       type: "BOOKING_CANCELLED",
//       message: "A customer cancelled their booking.",
//       salonId: salonId,
//       recipientId: salonOwnerId, // or use userId of salon owner
//     }));
//   } catch (error) {
//     console.log("Cancel by user error", error);
//   }
// };
