// import React from "react";
// import StarIcon from "@mui/icons-material/Star";
// import { useNavigate } from "react-router-dom";

// const SalonCard = ({salon}) => {
//     const navigate=useNavigate();
//   return (
//     <div onClick={()=>navigate(`/salon/${salon.id}`)}>
//       <div className="w-56 md:w-80 rounded-md bg-slate-100 ">
//         <img
//           className="w-full h-[15rem] object-cover rounded-t-md"
//           src={salon.images[0] || "https://images.pexels.com/photos/4625615/pexels-photo-4625615.jpeg?auto=compress&cs=tinysrgb&w=600"}
//           alt=""
//         />
//         <div className="p-5 space-y-2">
//           <h1 className="font-bold text-xl">{salon.name}</h1>
//           <div>
//             <div className=" text-white text-sm p-1 bg-green-700 rounded-full w-14 flex items-center justify-center gap-1">
//               4.5
//               <StarIcon sx={{ fontSize: "16px" }} />
//             </div>
//           </div>
//           <p>
//             {"Professional haircut and styling tailored to your preferences.".substring(
//               0,
//               24
//             ) + "..."}
//           </p>
//           <p>{salon.address} , {salon.city}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SalonCard;

import React from "react";
import { useNavigate } from "react-router-dom";

const SalonCard = ({ salon }) => {
  const navigate = useNavigate();
  
  const fallbackImage =
    "https://images.pexels.com/photos/4625615/pexels-photo-4625615.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <div
      onClick={() => navigate(`/salon/${salon.id}`)}
      className="w-60 md:w-72 rounded-xl bg-white shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <img
        src={salon.images?.[0] || fallbackImage}
        alt={salon.name}
        className="w-full h-48 object-cover rounded-t-xl"
        onError={(e) => (e.target.src = fallbackImage)}
      />
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold truncate">{salon.name}</h2>
        <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
          
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {salon.description || "Professional haircut and grooming services."}
        </p>
        <p className="text-xs text-gray-500 line-clamp-1">
          {salon.address}, {salon.city}
        </p>
      </div>
    </div>
  );
};

export default SalonCard;
