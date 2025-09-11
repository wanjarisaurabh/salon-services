  // // import React, { useEffect } from "react";
  // // import { services } from "../../../Data/Services";
  // // import HomeServiceCard from "./HomeServiceCard";
  // // import SalonList from "../Salon/SalonList";
  // // import Banner from "./Banner";
  // // import { useDispatch, useSelector } from "react-redux";
  // // import { fetchSalons } from "../../../Redux/Salon/action";

  // // const Home = () => {
  // //   const { salon } = useSelector((store) => store);
  // //   const dispatch = useDispatch();

  // //   useEffect(() => {
  // //     dispatch(fetchSalons());
  // //   }, []);
  // //   return (
  // //     <div className="space-y-20 ">
  // //       <section>
  // //         <Banner />
  // //       </section>
  // //       <section className="space-y-10 lg:space-y-0 lg:flex items-center gap-5 px-20">
  // //         <div className="w-full lg:w-1/2 ">
  // //           <h1 className="text-2xl font-semibold pb-9">
  // //             What are you looking for, Bestie? 👀
  // //           </h1>
  // //           <div className="flex flex-wrap justify-center items-center gap-5">
  // //             {services.map((item) => (
  // //               <HomeServiceCard key={item.id} item={item} />
  // //             ))}
  // //           </div>
  // //         </div>
  // //         <div className="w-full lg:w-1/2 border grid gap-3 grid-cols-2 grid-rows-12 h-[45vh] md:h-[90vh] ">
  // //           <div className="row-span-7">
  // //             <img
  // //               className="h-full w-full rounded-md"
  // //               src="https://images.pexels.com/photos/3998415/pexels-photo-3998415.jpeg?auto=compress&cs=tinysrgb&w=600"
  // //               alt=""
  // //             />
  // //           </div>
  // //           <div className="row-span-5">
  // //             <img
  // //               className="h-full w-full rounded-md"
  // //               src="https://images.pexels.com/photos/3331488/pexels-photo-3331488.jpeg?auto=compress&cs=tinysrgb&w=600"
  // //               alt=""
  // //             />
  // //           </div>
  // //           <div className="row-span-7">
  // //             <img
  // //               className="h-full w-full rounded-md"
  // //               src="https://images.pexels.com/photos/5069455/pexels-photo-5069455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  // //               alt=""
  // //             />
  // //           </div>
  // //           <div className="row-span-5">
  // //             <img
  // //               className="h-full w-full rounded-md"
  // //               src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=600"
  // //               alt=""
  // //             />
  // //           </div>
  // //         </div>
  // //       </section>
  // //       <section className="px-20">
  // //         <h1 className="text-3xl font-bold pb-10 ">Book Your Favorite Salon</h1>
  // //         <SalonList salons={salon.salons} />
  // //       </section>
  // //     </div>
  // //   );
  // // };

  // // export default Home;


  // import React, { useEffect } from "react";
  // import { services } from "../../../Data/Services";
  // import HomeServiceCard from "./HomeServiceCard";
  // import SalonList from "../Salon/SalonList";
  // import Banner from "./Banner";
  // import { useDispatch, useSelector } from "react-redux";
  // import { fetchSalons } from "../../../Redux/Salon/action";
  // import {motion} from "framer-motion";

  // const Home = () => {
  //   const { salon } = useSelector((store) => store);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchSalons());
  //   }, []);

  //   return (
  //     <div className="space-y-24">
  //       {/* Hero Section */}
  //       <section>
  //         <Banner />
  //       </section>

  //       {/* Services & Images */}
  //       <section className="px-6 md:px-10 lg:px-20 space-y-10 lg:space-y-0 lg:flex lg:items-center gap-10">
  //         {/* Services List */}
  //         <div className="w-full lg:w-1/2 space-y-6">
  //           <h1 className="text-3xl font-bold text-gray-800">
  //             What are you looking for, Bestie? 👀
  //           </h1>
  //           <div className="flex flex-wrap justify-center lg:justify-start gap-6">
  //             {services.map((item) => (
  //               <HomeServiceCard key={item.id} item={item} />
  //             ))}
  //           </div>
  //         </div>

  //         {/* Image Grid */}
  //         <div className="w-full lg:w-1/2 grid gap-4 grid-cols-2 grid-rows-12 h-[45vh] md:h-[80vh]">
  //           <div className="row-span-7">
  //             <img
  //               className="h-full w-full object-cover rounded-lg"
  //               src="https://images.pexels.com/photos/3998415/pexels-photo-3998415.jpeg?auto=compress&cs=tinysrgb&w=600"
  //               alt="salon1"
  //             />
  //           </div>
  //           <div className="row-span-5">
  //             <img
  //               className="h-full w-full object-cover rounded-lg"
  //               src="https://images.pexels.com/photos/3331488/pexels-photo-3331488.jpeg?auto=compress&cs=tinysrgb&w=600"
  //               alt="salon2"
  //             />
  //           </div>
  //           <div className="row-span-7">
  //             <img
  //               className="h-full w-full object-cover rounded-lg"
  //               src="https://images.pexels.com/photos/5069455/pexels-photo-5069455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt="salon3"
  //             />
  //           </div>
  //           <div className="row-span-5">
  //             <img
  //               className="h-full w-full object-cover rounded-lg"
  //               src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=600"
  //               alt="salon4"
  //             />
  //           </div>
  //         </div>
  //       </section>

  //       {/* Salon Listing */}
  //       <section className="px-6 md:px-10 lg:px-20">
  //         <h2 className="text-3xl font-bold text-gray-800 pb-8 border-b border-gray-300">
  //           Book Your Favorite Salon 💇‍♀️
  //         </h2>
  //         <div className="pt-8">
  //           <SalonList salons={salon.salons} />
  //         </div>
  //       </section>
  //     </div>
  //   );
  // };

  // export default Home;


  import React, { useEffect } from "react";
  import { services } from "../../../Data/Services";
  import HomeServiceCard from "./HomeServiceCard";
  import SalonList from "../Salon/SalonList";
  import Banner from "./Banner";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchSalons } from "../../../Redux/Salon/action";
  import { motion } from "framer-motion";

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const Home = () => {
    const { salon } = useSelector((store) => store);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchSalons());
    }, []);

    return (
      <div className="space-y-24">
        {/* Hero Section */}
        <motion.section {...fadeInUp}>
          <Banner />
        </motion.section>

        {/* Services & Images */}
        <motion.section
          className="px-6 md:px-10 lg:px-20 space-y-10 lg:space-y-0 lg:flex lg:items-center gap-10"
          {...fadeInUp}
        >
          {/* Services List */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.h1
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              What are you looking for, Buddy? 👀
            </motion.h1>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {services.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <HomeServiceCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <motion.div
            className="w-full lg:w-1/2 grid gap-4 grid-cols-2 grid-rows-12 h-[45vh] md:h-[80vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="row-span-7">
              <img
                className="h-full w-full object-cover rounded-lg"
                src="https://images.pexels.com/photos/3998415/pexels-photo-3998415.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="salon1"
              />
            </div>
            <div className="row-span-5">
              <img
                className="h-full w-full object-cover rounded-lg"
                src="https://images.pexels.com/photos/3331488/pexels-photo-3331488.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="salon2"
              />
            </div>
            <div className="row-span-7">
              <img
                className="h-full w-full object-cover rounded-lg"
                src="https://images.pexels.com/photos/5069455/pexels-photo-5069455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="salon3"
              />
            </div>
            <div className="row-span-5">
              <img
                className="h-full w-full object-cover rounded-lg"
                src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="salon4"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Salon Listing */}
        <motion.section
          className="px-6 md:px-10 lg:px-20"
          {...fadeInUp}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 pb-8 border-b border-gray-300">
            Book Your Favorite Salon 
          </h2>
          <div className="pt-8">
            <SalonList salons={salon.salons} />
          </div>
        </motion.section>
      </div>
    );
  };

  export default Home;
