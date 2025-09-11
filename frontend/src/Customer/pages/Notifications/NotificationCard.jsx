import { Card } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { markNotificationAsRead } from "../../../Redux/Notifications/action";

const NotificationCard = ({ item, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReadNotification = () => {
    console.log("Notification clicked:", item);
    if (type === "USER") {
      dispatch(markNotificationAsRead({
        notificationId: item,
        jwt: localStorage.getItem("jwt")
      }));
      navigate("/bookings");
    }
  };

  return (
    <Card
      onClick={handleReadNotification}
      sx={{
        bgcolor: item.isRead && type === "USER" ? "white" : "#EAF0F1",
      }}
      className="cursor-pointer p-5 flex items-center gap-5"
    >
      🛎️
      <div>
        <p>{item.description}</p>
        <div className="space-x-3">
          {/* {item.booking?.services?.map((service) => (
            <span key={service.id}>{service.name}</span>
          )) || <span>No services</span>} */}

          {item.message || <span>No message</span>}
          {/* {item.salonId || <span>No salon ID</span>} */}
        </div>
      </div>
    </Card>
  );
};

export default NotificationCard;


// export default NotificationCard;


// import { Card } from "@mui/material";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { markNotificationAsRead } from "../../../Redux/Notifications/action";
// import { useNavigate } from "react-router-dom";

// const NotificationCard = ({ item, type }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleReadNotification = () => {
//     if (type === "USER") {
//       dispatch(markNotificationAsRead({
//         notificationId: item.id,
//         jwt: localStorage.getItem("jwt")
//       }));
//       navigate("/bookings");
//     }
//   };

//   return (
//     <Card
//       onClick={handleReadNotification}
//       sx={{
//         bgcolor: item.isRead && type === "USER" ? "white" : "#EAF0F1",
//       }}
//       className="cursor-pointer p-5 flex items-center gap-5"
//     >
//       🛎️
//       <div>
//         <p>{item.description}</p>
//         <div className="space-x-3">
//           {item.booking?.services?.map((service) => (
//             <span key={service.id}>{service.name}</span>
//           ))}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default NotificationCard;


// import { Card, Typography, Avatar } from "@mui/material";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { markNotificationAsRead } from "../../../Redux/Notifications/action";
// import { useNavigate } from "react-router-dom";

// const NotificationCard = ({ item, type }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleReadNotification = () => {
//     dispatch(markNotificationAsRead({
//       notificationId: item.id,
//       jwt: localStorage.getItem("jwt"),
//     }));

//     if (type === "USER") {
//       navigate("/bookings");
//     } else if (type === "SALON") {
//       navigate("/salon-dashboard/bookings");
//     }
//   };

//   return (
//     <Card
//       onClick={handleReadNotification}
//       sx={{
//         bgcolor: item.isRead && type === "USER" ? "white" : "#EAF0F1",
//         transition: "all 0.2s",
//         "&:hover": {
//           boxShadow: 3,
//         },
//       }}
//       className="cursor-pointer p-5 flex items-start gap-4"
//     >
//       <Avatar sx={{ bgcolor: "#1e88e5" }}>🔔</Avatar>
//       <div>
//         <Typography variant="body1" fontWeight={500}>
//           {item.description}
//         </Typography>

//         {item.booking?.services?.length > 0 && (
//           <Typography variant="body2" color="text.secondary" mt={1}>
//             Services:{" "}
//             {item.booking.services.map((service) => (
//               <span key={service.id} className="mr-2">
//                 {service.name}
//               </span>
//             ))}
//           </Typography>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default NotificationCard;
