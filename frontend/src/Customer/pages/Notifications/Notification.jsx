// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import { addNotification } from "../../../Redux/Notifications/action";
// import NotificationCard from "./NotificationCard";

// const Notification = ({ type }) => {
//   const dispatch = useDispatch();
//   const { auth, notification } = useSelector((store) => store);
//   const [stompClient, setStompClient] = useState(null);


//   const unreadCount = notification.unreadCount;

//   // useEffect(() => {
//   //   if (unreadCount === 0) {
//   //     // Delay to allow any async dispatch/rendering to complete
//   //     setTimeout(() => {
//   //       window.location.reload();
//   //     }, 500); // Optional delay (in ms)
//   //   }
//   // }, [unreadCount]);


//   useEffect(() => {
//     const sock = new SockJS("http://localhost:5000/api/notifications/ws");
//     const stomp = Stomp.over(sock);
//     setStompClient(stomp);

//     return () => {
//       if (stomp.connected) {
//         stomp.disconnect(() => console.log("WebSocket disconnected"));
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (stompClient && auth.user?.id) {
//       stompClient.connect({}, () => {
//         const subscription = stompClient.subscribe(
//           `/notification/user/${auth.user.id}`,
//           (payload) => {
//             const receivedNotification = JSON.parse(payload.body);
//             console.log("Received:", receivedNotification);
//             dispatch(addNotification(receivedNotification));
//           },
//           (error) => console.error("Subscription error:", error)
//         );

//         console.log("Subscribed to", `/notification/user/${auth.user.id}`);

//         // Cleanup subscription on unmount
//         return () => subscription.unsubscribe();
//       });
//     }
//   }, [stompClient, auth.user?.id]);

//   return (
//     <div className="flex justify-center px-5 md:px-20 py-5 md:py-10">
//       <div className="space-y-5 w-full lg:w-1/2">
//         <h1 className="text-2xl font-bold text-center">Notifications</h1>
//         {console.log("Notification data:", notification.notifications)}
//         {console.log("Notifications:", notification)}
//         {notification.notifications.map((item) => (
//           <NotificationCard key={item.id} type={type} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notification;

// export default Notification;



// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import { addNotification } from "../../../Redux/Notifications/action";
// import NotificationCard from "./NotificationCard";

// const Notification = ({ type }) => {
//   const dispatch = useDispatch();
//   const { auth, notification } = useSelector((store) => store);
//   const stompClientRef = useRef(null);

//   useEffect(() => {
//     if (!auth.user?.id) return; // Wait for user to load

//     const socket = new SockJS("http://localhost:5000/api/notifications/ws");
//     const stomp = Stomp.over(socket);
//     stomp.debug = null; // Optional: disable console spam
//     stompClientRef.current = stomp;

//     stomp.connect({}, () => {
//       const topic = `/user/notification/${auth.user.id}`;
//       console.log("Connected to:", topic);

//       stomp.subscribe(topic, (payload) => {
//         const receivedNotification = JSON.parse(payload.body);
//         console.log("Received:", receivedNotification);
//         dispatch(addNotification(receivedNotification));
//       });
//     }, (error) => {
//       console.error("WebSocket connection error:", error);
//     });

//     return () => {
//       if (stompClientRef.current?.connected) {
//         stompClientRef.current.disconnect(() => {
//           console.log("WebSocket disconnected.");
//         });
//       }
//     };
//   }, [auth.user?.id]);

//   return (
//     <div className="flex justify-center px-5 md:px-20 py-5 md:py-10">
//       <div className="space-y-5 w-full lg:w-1/2">
//         <h1 className="text-2xl font-bold text-center">Notifications</h1>
//         {notification.notifications.map((item) => (
//           <NotificationCard type={type} key={item.id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notification;




// // Notification.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import NotificationCard from "./NotificationCard";
// import useNotificationWebsocket from "../../../util/useNotificationWebsoket";

// export default function Notification({ type = "user" }) {
//   const { auth, notification } = useSelector((s) => s);
//   const userId = type === "user" ? auth.user?.id : auth.user?.salonId;

//   // useNotificationWebsocket(userId, type);
//   useNotificationWebsocket(userId, type);

//   return (
//     <div className="space-y-4">
//       <h2>Notifications</h2>
//       {/* console.log("Notifications:", notification.notifications);
      
//       */}

//       {console.log("Notification data:", notification.notifications)}
//       {notification.notifications.map((n) => (
//         <NotificationCard  item={n} />
//       ))}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "./NotificationCard";
import { fetchNotificationsByUser } from "../../../Redux/Notifications/action";
import { addNotification } from "../../../Redux/Notifications/action";
const Notification = ({ type }) => {
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);
  const auth = useSelector((state) => state.auth); // Adjust if auth reducer path is different
  const notification = useSelector((state) => state.notification);

  // Fetch old notifications on mount
  useEffect(() => {
    if (auth.user?.id && auth.jwt) {
      dispatch(fetchNotificationsByUser({ userId: auth.user.id, jwt: auth.jwt }));
      console.log("calling")
    }
  }, [auth.user?.id, auth.jwt, dispatch]);

  // Set up WebSocket connection once
  useEffect(() => {
    const sock = new SockJS("http://localhost:5000/api/notifications/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);

    return () => {
      if (stomp.connected) {
        stomp.disconnect(() => console.log("WebSocket disconnected"));
      }
    };
  }, []);

  // Subscribe to WebSocket when client is ready
  useEffect(() => {
    if (stompClient && auth.user?.id) {
      stompClient.connect({}, () => {
        const subscription = stompClient.subscribe(
          `/notification/user/${auth.user.id}`,
          (payload) => {
            const receivedNotification = JSON.parse(payload.body);
            console.log("Received notification:", receivedNotification);
            dispatch(addNotification(receivedNotification)); // Add to Redux
          },
          (error) => {
            console.error("WebSocket subscription error:", error);
          }
        );

        console.log("Subscribed to WebSocket");

        // Cleanup on unmount
        return () => {
          subscription.unsubscribe();
        };
      });
    }
  }, [stompClient, auth.user?.id, dispatch]);

  return (
    <div className="flex justify-center px-5 md:px-20 py-5 md:py-10">
      <div className="space-y-5 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold text-center">Notifications</h1>
        {notification.notifications.map((item) => (
          <NotificationCard key={item.id} type={type} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
