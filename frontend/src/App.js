// // import { ThemeProvider } from "@mui/material";

// // import greenTheme from "./Theme/greenTheme";
// // import { Route, Routes, useNavigate } from "react-router-dom";

// // import SalonDashboard from "./salon/pages/SellerDashboard/SalonDashboard";
// // import Auth from "./Auth/Auth";
// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getUser } from "./Redux/Auth/action";
// // import BecomePartner from "./salon/pages/Become Partner/BecomePartnerForm";
// // import CustomerRoutes from "./routes/CustomerRoutes";
// // import AdminRoutes from "./routes/AdminRoutes";
// // import AdminDashboard from "./Admin/pages/Dashboard/Dashboard";
// // import redTheme from "./Theme/redTheme";


// // function App() {
// //   const { auth } = useSelector((store) => store);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
// //   }, [auth.jwt]);


// //   useEffect(()=>{
// //     if(auth.user?.role==="ROLE_SALON_OWNER"){
// //       navigate("/salon-dashboard");
// //     }
// //   },[auth.user?.role])

// //   return (
// //     <ThemeProvider theme={greenTheme}>
// //       <div className="relative">

        
// //         <Routes>
// //           {<Route path="/salon-dashboard/*" element={<SalonDashboard />} />}
// //           <Route path="/login" element={<Auth />} />
// //           <Route path="/register" element={<Auth />} />
// //           <Route path="/become-partner" element={<BecomePartner />} />
// //           <Route path="/admin/*" element={<AdminDashboard/>} />
// //           <Route path="*" element={<CustomerRoutes />} />
// //         </Routes>
// //       </div>
// //     </ThemeProvider>
// //   );
// // }

// // export default App;


// import { ThemeProvider } from "@mui/material";
// import greenTheme from "./Theme/greenTheme";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import SalonDashboard from "./salon/pages/SellerDashboard/SalonDashboard";
// import Auth from "./Auth/Auth";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "./Redux/Auth/action";
// import BecomePartner from "./salon/pages/Become Partner/BecomePartnerForm";
// import CustomerRoutes from "./routes/CustomerRoutes";
// import AdminRoutes from "./routes/AdminRoutes";
// import AdminDashboard from "./Admin/pages/Dashboard/Dashboard";
// import redTheme from "./Theme/redTheme"; // ✅ import the route guard
// import SalonOwnerRoute from './Temp/SalonOwnerRoute';

// function App() {
//   const { auth } = useSelector((store) => store);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
//   }, [auth.jwt]);

//   useEffect(() => {
//     if (auth.user?.role === "ROLE_SALON_OWNER") {
//       navigate("/salon-dashboard");
//     }
//   }, [auth.user?.role]);

//   return (
//     <ThemeProvider theme={greenTheme}>
//       <div className="relative">
//         <Routes>
//           <Route
//             path="/salon-dashboard/*"
//             element={
//               <SalonOwnerRoute>
//                 <SalonDashboard />
//               </SalonOwnerRoute>
//             }
//           />
//           <Route path="/login" element={<Auth />} />
//           <Route path="/register" element={<Auth />} />
//           <Route path="/become-partner" element={<BecomePartner />} />
//           <Route path="/admin/*" element={<AdminDashboard />} />
//           <Route path="*" element={<CustomerRoutes />} />
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;


import { ThemeProvider } from "@mui/material";
import greenTheme from "./Theme/greenTheme";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SalonDashboard from "./salon/pages/SellerDashboard/SalonDashboard";
import Auth from "./Auth/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Redux/Auth/action";
import BecomePartner from "./salon/pages/Become Partner/BecomePartnerForm";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminDashboard from "./Admin/pages/Dashboard/Dashboard";
import SalonOwnerRoute from "./Temp/SalonOwnerRoute";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = auth.jwt || localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [auth.jwt]);

 

  return (
    <ThemeProvider theme={greenTheme}>
      <ScrollToTop />
      <div className="relative">
        <Routes>
          <Route
            path="/salon-dashboard/*"
            element={
              <SalonOwnerRoute>
                <SalonDashboard />
              </SalonOwnerRoute>
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<CustomerRoutes />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
