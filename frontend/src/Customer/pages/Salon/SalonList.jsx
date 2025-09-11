// // import React, { useEffect } from "react";
// // import SalonCard from "./SalonCard";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchSalons } from "../../../Redux/Salon/action";

// // const SalonList = ({salons}) => {

// //   return (
// //     <div className="flex gap-6 flex-wrap ">
// //       {salons?.map((item) => (
// //         <SalonCard key={item.id} salon={item}/>
// //       ))}
// //     </div>
// //   );
// // };

// // export default SalonList;

// import React from "react";
// import SalonCard from "./SalonCard";

// const SalonList = ({ salons }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
//       {salons?.map((item) => (
//         <div key={item.id} className="h-full">
//           <SalonCard salon={item} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SalonList;

import React from "react";
import SalonCard from "./SalonCard";

const SalonList = ({ salons }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 min-w-max px-2 py-4">
        {salons?.map((item) => (
          <div className="min-w-[250px]" key={item.id}>
            <SalonCard salon={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalonList;
