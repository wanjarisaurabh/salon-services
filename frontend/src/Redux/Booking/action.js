import axios from "axios";
import { addNotification, createNotification } from "../Notifications/action";

import {
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAILURE,
  FETCH_CUSTOMER_BOOKINGS_REQUEST,
  FETCH_CUSTOMER_BOOKINGS_SUCCESS,
  FETCH_CUSTOMER_BOOKINGS_FAILURE,
  FETCH_SALON_BOOKINGS_REQUEST,
  FETCH_SALON_BOOKINGS_SUCCESS,
  FETCH_SALON_BOOKINGS_FAILURE,
  FETCH_BOOKING_BY_ID_REQUEST,
  FETCH_BOOKING_BY_ID_SUCCESS,
  FETCH_BOOKING_BY_ID_FAILURE,
  UPDATE_BOOKING_STATUS_REQUEST,
  UPDATE_BOOKING_STATUS_SUCCESS,
  UPDATE_BOOKING_STATUS_FAILURE,
  GET_SALON_REPORT_REQUEST,
  GET_SALON_REPORT_SUCCESS,
  GET_SALON_REPORT_FAILURE,
  FETCH_BOOKED_SLOTS_REQUEST,
  FETCH_BOOKED_SLOTS_SUCCESS,
  FETCH_BOOKED_SLOTS_FAILURE,
} from "./actionTypes";
import api from "../../config/api";

const API_BASE_URL = "/api/bookings";

// export const createBooking = ({ jwt, salonId, bookingData , navigate }) => async (dispatch) => {

 

//   dispatch({ type: CREATE_BOOKING_REQUEST });
//   try {
//     const { data } = await api.post(
//       API_BASE_URL,
//       bookingData,
//       {
//         headers: { Authorization: `Bearer ${jwt}` },
//         params: { salonId, paymentMethod: "RAZORPAY" },
//       }
//     );
//     // window.location.href = data.payment_link_url //for razorpay payment
//     dispatch({ type: CREATE_BOOKING_SUCCESS, payload: data });
//     alert("Booking Successful");
//     setTimeout(() => navigate("/"), 1000);
//     console.log(" create booking ", data)
  
//   } catch (error) {
//     console.log("error creating booking ", error)
//     dispatch({ type: CREATE_BOOKING_FAILURE, payload: error.response?.data?.message });
//   }
// };



export const createBooking = ({ jwt, salonId, bookingData, navigate }) => async (dispatch) => {
  dispatch({ type: CREATE_BOOKING_REQUEST });

  try {
    const { data } = await api.post(
      API_BASE_URL,
      bookingData,
      {
        headers: { Authorization: `Bearer ${jwt}` },
        params: { salonId, paymentMethod: "RAZORPAY" },
      }
    );

    dispatch({ type: CREATE_BOOKING_SUCCESS, payload: data });
    dispatch(addNotification({
      type: "BOOKING_SUCCESS",
      message: "Booking confirmed successfully.",
      userId: bookingData.userId, // if available
      salonId: salonId,
    }));

    console.log("in the action os booking ")
    // ✅ Persist notification to backend
    dispatch(createNotification({
      notification: {
        type: "BOOKING_SUCCESS",
        description: "Booking confirmed successfully.",
        created_at: bookingData.startTime,
        userId: bookingData.userId,
        salonId: salonId,
        bookingId: data.id,
      },
      jwt,
    }));

    alert("Booking Successful");
    setTimeout(() => navigate("/"), 1000);
  } catch (error) {
    dispatch({ type: CREATE_BOOKING_FAILURE, payload: error.response?.data?.message });

    dispatch(addNotification({
      type: "BOOKING_FAILED",
      message: "Booking failed. Please try again.",
      userId: bookingData.userId, // if available
      salonId: salonId,
    }));

    // ❌ Failed booking notification
    dispatch(createNotification({
      notification: {
        type: "BOOKING_FAILED",
        description: "Booking failed. Please try again.",
        userId: bookingData.userId,
        salonId: salonId,
        bookingId: null,
      },
      jwt,
    }));
  }
};


export const fetchCustomerBookings = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_CUSTOMER_BOOKINGS_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/customer`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("customer bookings ", data)
    dispatch({ type: FETCH_CUSTOMER_BOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error ", error)
    dispatch({ type: FETCH_CUSTOMER_BOOKINGS_FAILURE, payload: error.message });
  }
};

export const fetchSalonBookings = ({ jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_SALON_BOOKINGS_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/salon`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("salon bookings ", data)
    dispatch({ type: FETCH_SALON_BOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error fetching salon bookings ", error)
    dispatch({ type: FETCH_SALON_BOOKINGS_FAILURE, payload: error.message });
  }
};


export const fetchBookingById = (bookingId) => async (dispatch) => {
  dispatch({ type: FETCH_BOOKING_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/${bookingId}`);
    dispatch({ type: FETCH_BOOKING_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BOOKING_BY_ID_FAILURE, payload: error.message });
  }
};

export const updateBookingStatus = ({ bookingId, status, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_BOOKING_STATUS_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/${bookingId}/status`, null, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { status },
    });
    console.log("update booking status ", data)
    dispatch({ type: UPDATE_BOOKING_STATUS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error updating booking status ", error)
    dispatch({ type: UPDATE_BOOKING_STATUS_FAILURE, payload: error.message });
  }
};

export const getSalonReport = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_SALON_REPORT_REQUEST });


    const response = await api.get('/api/bookings/report', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    dispatch({
      type: GET_SALON_REPORT_SUCCESS,
      payload: response.data,
    });
    console.log("bookings report ", response.data)
  } catch (error) {
    console.log("error ", error)

    dispatch({
      type: GET_SALON_REPORT_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};



export const fetchBookedSlotsRequest = () => ({
  type: FETCH_BOOKED_SLOTS_REQUEST,
});

export const fetchBookedSlotsSuccess = (slots) => ({
  type: FETCH_BOOKED_SLOTS_SUCCESS,
  payload: slots,
});

export const fetchBookedSlotsFailure = (error) => ({
  type: FETCH_BOOKED_SLOTS_FAILURE,
  payload: error,
});

// Thunk action to fetch booked slots
export const fetchBookedSlots = ({ salonId, date, jwt }) => async (dispatch) => {
  dispatch(fetchBookedSlotsRequest());

  try {
    const response = await api.get(
      `${API_BASE_URL}/slots/salon/${salonId}/date/${date}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log("fetch booked slots: ", response.data);
    dispatch(fetchBookedSlotsSuccess(response.data));
  } catch (error) {
    console.log("fetch booked slots error - : ", error);
    dispatch(fetchBookedSlotsFailure(error.message));
  }
};



