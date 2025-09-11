// import React, { useEffect, useState } from 'react'
// import SockJS from 'sockjs-client';
// import { addNotification } from '../Redux/Notifications/action';
// import { useDispatch, useSelector } from 'react-redux';
// import Stomp from "stompjs";

// const useNotificationWebsoket = (userId,type) => {
    
 
//     const dispatch=useDispatch()

//     const [stompClient, setStompClient] = useState(null);
//     useEffect(() => {
//         if (!userId) return; // Only connect if userId is available
    
//         const sock = new SockJS("http://localhost:5000/api/notifications/ws");
//         const stomp = Stomp.over(sock);
//         setStompClient(stomp);
//       }, [userId]);
    
//       useEffect(() => {
//         if (stompClient) {
//           stompClient.connect(
//             {},
//             () => {
              
//               stompClient.subscribe(
//                 `/notification/${type}/${userId}`,
//                 onMessageRecive,
//                 (error) => {
//                   console.error("Subscription error:", error);
//                 }
//               );
//               console.log("Subscribed to notifications for user ID:", userId);
//             },
//             (error) => {
//               console.error("WebSocket error:", error);
//             }
//           );
//         }
    
//         return () => {
//           if (stompClient?.connected) {
//             stompClient.disconnect(() => {
//               console.log("Disconnected from WebSocket");
//             });
//           }
//         };
//       }, [stompClient, userId]);
    
//       const onMessageRecive = (payload) => {
//         console.log("New message received", payload);
//         const receivedMessage = JSON.parse(payload.body);
    
//         // Dispatch the new notification to Redux store
//         dispatch(addNotification(receivedMessage));
//       };
// }

// export default useNotificationWebsoket




import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch } from "react-redux";
import { addNotification } from "../Redux/Notifications/action";

const WS_URL = "http://localhost:5000/api/notifications/ws";

export default function useNotificationWebsocket(userId, type = "user") {
  const dispatch = useDispatch();
  const clientRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS(WS_URL);
    const stomp = Stomp.over(socket);
    stomp.debug = null;
    clientRef.current = stomp;

    stomp.connect({}, () => {
      const channel = type === "user"
        ? `/notification/user/${userId}`
        : `/notification/salon/${userId}`;
      stomp.subscribe(channel, (msg) => {
        const notification = JSON.parse(msg.body);
        dispatch(addNotification(notification));
      });
    }, (err) => console.error("STOMP connection error:", err));

    return () => {
      if (clientRef.current?.connected) {
        clientRef.current.disconnect(() =>
          console.log("STOMP client disconnected")
        );
      }
    };
  }, [userId, type, dispatch]);
}
