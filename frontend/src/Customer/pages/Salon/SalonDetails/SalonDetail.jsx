import React from 'react'
import { useSelector } from 'react-redux'

const SalonDetail = () => {
    const {salon}=useSelector(store=>store)
  return (
    <div className="space-y-5 mb-20">
    {/* <section className="grid grid-cols-2  gap-3">
      <div className="col-span-2">
        <img
          className="w-full rounded-md h-[15rem] object-cover"
          src={salon.salon?.images[0]}
          alt=""
        />
      </div>
      <div className="col-span-1">
        <img
          className="w-full  rounded-md h-[15rem] object-cover"
          src={salon.salon?.images[1]}
          alt=""
        />
      </div>
      <div className="col-span-1">
        <img
          className="w-full  rounded-md h-[15rem] object-cover"
          src={salon.salon?.images[2]}
          alt=""
        />
      </div>
      </section> */}

      <section className="grid grid-cols-2 gap-3">
        {salon.salon?.images?.[0] && (
          <div className="col-span-2">
            <img
              className="w-full rounded-md h-[15rem] object-cover"
              src={salon.salon.images[0]}
              alt=""
            />
          </div>
        )}

        {salon.salon?.images?.[1] && (
          <div className="col-span-1">
            <img
              className="w-full rounded-md h-[15rem] object-cover"
              src={salon.salon.images[1]}
              alt=""
            />
          </div>
        )}

        {salon.salon?.images?.[2] && (
          <div className="col-span-1">
            <img
              className="w-full rounded-md h-[15rem] object-cover"
              src={salon.salon.images[2]}
              alt=""
            />
          </div>
        )}
      </section>

      



      <div className="space-y-3">
        <h1 className="font-bold text-3xl">{salon.salon?.name} </h1>
        <p>
          {salon.salon?.address}, {salon.salon?.city}
        </p>
        <p>
          <strong>Timing :</strong> {salon.salon?.openTime} To{" "}
          {salon.salon?.closeTime}
        </p>
      </div>
  
  </div>
  )
}

export default SalonDetail