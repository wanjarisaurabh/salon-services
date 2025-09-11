import React from 'react';

const HomeServiceCard = ({ item }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 bg-white shadow-md rounded-xl w-36 h-52 transition-transform hover:scale-105 hover:shadow-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-full border border-gray-300"
      />
      
      <h1 className="text-center text-sm font-medium text-gray-800">{item.name}</h1>
    </div>
  );
};

export default HomeServiceCard;
// import React from 'react'

// const HomeServiceCard = ({ item }) => {
//   return (
//     <div className='flex justify-center items-center flex-col gap-4 rounded-lg p-5 bg-slate-100 w-32 h-48'>
//       <img className='w-20 h-20  rounded-lr' src={item.image} alt="" />
//       <h1 className='text-center'>{item.name}</h1>
//     </div>
//   )
// }

// export default HomeServiceCard