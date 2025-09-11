// // routes/SalonOwnerRoute.js
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const SalonOwnerRoute = ({ children }) => {
//     const { auth } = useSelector((store) => store);

//     if (auth.user?.role !== "SALON_OWNER") {
//         // If not salon owner, redirect to home or not authorized page
//         return <Navigate to="/" />;
//     }

//     return children;
// };

// export default SalonOwnerRoute;


// Temp/SalonOwnerRoute.js

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SalonOwnerRoute = ({ children }) => {
    const { auth } = useSelector((store) => store);

    if (auth.user === undefined || auth.user === null) {
        // Optional: you can use a spinner instead of plain text
        return <div>Loading...</div>;
    }

    if (auth.user?.role !== "SALON_OWNER") {
        return <Navigate to="/" />;
    }

    return children;
};

export default SalonOwnerRoute;
