// import React, { useEffect } from "react";
// import BookingCard from "./BookingCard";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCustomerBookings } from "../../../Redux/Booking/action";

// const Bookings = () => {
//   const dispatch = useDispatch();
//   const { booking } = useSelector((store) => store);

//   useEffect(() => {
//     dispatch(fetchCustomerBookings(localStorage.getItem("jwt")));
//   }, []);

//   return (
//     <div className="px-5 md:flex flex-col items-center mt-10 min-h-screen">
//       <div>
//         <h1 className="text-3xl font-bold py-5">My Bookings</h1>
//       </div>
//       <div className="space-y-4 md:w-[35rem]">
//         {booking.bookings.map((item) => (
//           <BookingCard booking={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Bookings;



import React, { useEffect } from "react";
import BookingCard from "./BookingCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerBookings } from "../../../Redux/Booking/action";

const Bookings = () => {
  const dispatch = useDispatch();
  const { booking } = useSelector((store) => store);

  useEffect(() => {
    console.log("📥 Fetching customer bookings...");
    dispatch(fetchCustomerBookings(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="px-4 md:px-10 mt-12 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          My Bookings
        </h1>

        {booking.bookings.length > 0 ? (
          <div className="space-y-5">
            {booking.bookings.map((item) => (
              <BookingCard key={item.id} booking={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">You don't have any bookings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;


