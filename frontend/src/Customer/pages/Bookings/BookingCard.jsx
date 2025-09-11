// import React from "react";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import { Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { updateBookingStatus } from "../../../Redux/Booking/action";

// const BookingCard = ({ booking }) => {
//   const dispatch = useDispatch();

//   const handleCancelBooking = () => {
//     // const status=booking.status==="CANCELLED"?"PENDING":"CANCELLED"
//     dispatch(
//       updateBookingStatus({
//         bookingId: booking.id,
//         status: "CANCELLED",
//         jwt: localStorage.getItem("jwt"),
//       })
//     );
//   };
//   return (
//     <div className="p-5 rounded-md bg-slate-100 md:flex items-center justify-between">
//       <div className="space-y-2">
//         <h1 className="text-2xl font-bold">{booking.salon.name}</h1>
//         <div>
//           {booking.services.map((service) => (
//             <li key={service.id}>{service.name}</li>
//           ))}
//         </div>
//         <div>
//           <p className="font-semibold">
//             Time & Date <ArrowRightAltIcon /> {booking.startTime?.split("T")[0]}{" "}
//           </p>
//           <p className="text-slate-700">
//             {booking.startTime?.split("T")[1]} To{" "}
//             {booking.endTime?.split("T")[1]}
//           </p>
//         </div>
//       </div>
//       <div className="space-y-2">
//         <img className="h-28 w-28" src={booking.salon.images[0]} alt="" />
//         <p className="text-center">₹{booking.totalPrice}</p>
//         <Button
//           onClick={handleCancelBooking}
//           color="error"
//           fullWidth
//           variant={booking.status==="CANCELLED"?"contained":"outlined"}
//         >
//           {booking.status==="CANCELLED"?"CANCELLED":"Cancel"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default BookingCard;


import React, { useEffect } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateBookingStatus } from "../../../Redux/Booking/action";

const BookingCard = ({ booking }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("📦 BookingCard Mounted for ID:", booking.id);
    console.log("📝 Booking Details:", booking);
  }, [booking]);

  const handleCancelBooking = () => {
    console.log("❌ Cancel button clicked for booking ID:", booking.id);
    dispatch(
      updateBookingStatus({
        bookingId: booking.id,
        status: "CANCELLED",
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  const { salon, services, startTime, endTime, totalPrice, status } = booking;

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 flex flex-col md:flex-row md:justify-between gap-4 hover:shadow-lg transition-all">
      {/* Left Side: Info */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{salon.name}</h2>

        <ul className="text-gray-600 text-sm md:text-base list-disc pl-5">
          {services.map((service) => (
            <li key={service.id}>{service.name}</li>
          ))}
        </ul>

        <div className="text-gray-700 text-sm md:text-base">
          <p className="flex items-center font-semibold">
            Time & Date <ArrowRightAltIcon className="mx-1 text-gray-500" />
            {startTime?.split("T")[0]}
          </p>
          <p className="text-gray-600">
            {startTime?.split("T")[1]} – {endTime?.split("T")[1]}
          </p>
        </div>
      </div>

      {/* Right Side: Image, Price, Cancel */}
      <div className="flex flex-col items-center md:items-end gap-2">
        <img
          className="h-28 w-28 rounded-lg object-cover border border-gray-200"
          src={salon.images?.[0]}
          alt="Salon"
        />
        <p className="text-lg font-bold text-gray-800">₹{totalPrice}</p>

        <Button
          onClick={handleCancelBooking}
          color="error"
          fullWidth
          size="small"
          variant={status === "CANCELLED" ? "contained" : "outlined"}
          disabled={status === "CANCELLED"}
        >
          {status === "CANCELLED" ? "CANCELLED" : "Cancel"}
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;
