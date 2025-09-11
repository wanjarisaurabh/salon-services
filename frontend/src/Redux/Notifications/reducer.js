import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    FETCH_NOTIFICATIONS_BY_USER_REQUEST,
    FETCH_NOTIFICATIONS_BY_USER_SUCCESS,
    FETCH_NOTIFICATIONS_BY_USER_FAILURE,
    FETCH_NOTIFICATIONS_BY_SALON_REQUEST,
    FETCH_NOTIFICATIONS_BY_SALON_SUCCESS,
    FETCH_NOTIFICATIONS_BY_SALON_FAILURE,
    CREATE_NOTIFICATION_REQUEST,
    CREATE_NOTIFICATION_SUCCESS,
    CREATE_NOTIFICATION_FAILURE,
    MARK_NOTIFICATION_AS_READ_REQUEST,
    MARK_NOTIFICATION_AS_READ_SUCCESS,
    MARK_NOTIFICATION_AS_READ_FAILURE,
    DELETE_NOTIFICATION_REQUEST,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAILURE,
    ADD_NOTIFICATION,
  } from "./actionTypes";
  
  const initialState = {
    notifications: [],
    loading: false,
    error: null,
    unreadCount:0
  };
  
  // Reducer function
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      // Fetch all notifications
      case FETCH_NOTIFICATIONS_REQUEST:
      case FETCH_NOTIFICATIONS_BY_USER_REQUEST:
      case FETCH_NOTIFICATIONS_BY_SALON_REQUEST:
      case CREATE_NOTIFICATION_REQUEST:
      case MARK_NOTIFICATION_AS_READ_REQUEST:
      case DELETE_NOTIFICATION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case FETCH_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: action.payload,
        };
      case FETCH_NOTIFICATIONS_BY_USER_SUCCESS:
      case FETCH_NOTIFICATIONS_BY_SALON_SUCCESS:
        const unreadCount = action.payload.filter((n) => !n.isRead).length;
        return {
          ...state,
          loading: false,
          notifications: action.payload,
          unreadCount,
        };
        case ADD_NOTIFICATION:
            return {
              ...state,
              notifications: [action.payload, ...state.notifications],
              unreadCount: state.unreadCount + 1, 
           
            };
      case CREATE_NOTIFICATION_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: [...state.notifications, action.payload],
        };
      case MARK_NOTIFICATION_AS_READ_SUCCESS:
        return {
          ...state,
          loading: false,
          unreadCount: Math.max(0, state.unreadCount - 1),
        };


      case DELETE_NOTIFICATION_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: state.notifications.filter(
            (notification) => notification.id !== action.payload
          ),
        };
  
      case FETCH_NOTIFICATIONS_FAILURE:
      case FETCH_NOTIFICATIONS_BY_USER_FAILURE:
      case FETCH_NOTIFICATIONS_BY_SALON_FAILURE:
      case CREATE_NOTIFICATION_FAILURE:
      case MARK_NOTIFICATION_AS_READ_FAILURE:
      case DELETE_NOTIFICATION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  