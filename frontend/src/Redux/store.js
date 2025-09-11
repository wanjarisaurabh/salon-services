import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {thunk} from "redux-thunk";
import authReducer from "./Auth/reducer";
import serviceOfferingReducer from "./Salon Services/reducer";
import salonReducer from "./Salon/reducer";
import bookingReducer from "./Booking/reducer";
import categoryReducer from "./Category/reducer";
import reviewReducer from "./Review/reducer";
import notificationReducer from "./Notifications/reducer";
import { chartReducer } from "./Chart/reducer";





const rootReducers=combineReducers({

    auth:authReducer,
    service:serviceOfferingReducer,
    salon:salonReducer,
    booking:bookingReducer,
    category:categoryReducer,
    review: reviewReducer,
    notification:notificationReducer,
    chart:chartReducer



});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))