import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createBooking,
  fetchBookedSlots,
  fetchCustomerBookings,
} from "../../../../Redux/Booking/action";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import ServiceCard from "./ServiceCard";
import { Alert, Button, Divider, Modal, Snackbar } from "@mui/material";
import { isServiceSelected } from "../../../../util/isServiceSelected";
import {
  ArrowRight,
  RemoveShoppingCart,
  ShoppingCart,
} from "@mui/icons-material";
import SelectedServiceList from "./SelectedServiceList";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchServicesBySalonId } from "../../../../Redux/Salon Services/action";
import { getTodayDate } from "../../../../util/getTodayDate";
// import { getTodayDate } from "@mui/x-date-pickers/internals";
const SalonServiceDetails = () => {
  const { salon, service, category, booking } = useSelector((store) => store);
  const handleCloseSnackbar = () => setSnackbarOpen(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookingData, setBookingData] = useState({
    services: [],
    time: null,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);



  const handleSelectService = (service) => {
    setBookingData((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
  };

  const handleRemoveService = (id) => {
    setBookingData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }));
  };

  const handleSelectCategory = (id) => () => {
    setSelectedCategory(id);
  };


  const navigate = useNavigate();

  const handleBooking = () => {
    const serviceIds = bookingData.services.map((service) => service.id);

    dispatch(
      createBooking({
        bookingData: { serviceIds, startTime: bookingData.time ,  },
        salonId: id,
        jwt: localStorage.getItem("jwt"),
        navigate, // ✅ Pass navigate
      })
    );

    console.log("booking data ", bookingData);
  };

  useEffect(() => {
    dispatch(
      fetchBookedSlots({
        salonId: id,
        date: bookingData.time?.split("T")[0] || getTodayDate(),
        jwt: localStorage.getItem("jwt"),
      })
    );
    console.log("booked slots ", bookingData.time?.split("T")[0] || getTodayDate)
  }, [id, bookingData.time]);



  useEffect(() => {
    dispatch(
      fetchServicesBySalonId({
        salonId: id,
        jwt: localStorage.getItem("jwt"),
        categoryId: selectedCategory,
      })
    );
  }, [id, selectedCategory]);

  useEffect(() => {
    if (booking.error) {
      setSnackbarOpen(true)
    }
  }, [booking.error])

  return (
    <div className="lg:flex gap-5 h-[90vh] mt-10 ">
      <section className="space-y-5 border-r lg:w-[25%] pr-5">
        <CategoryCard
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
          item={{
            id: null,
            name: "ALL",
            image:
              "https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_640.jpg",
          }}
        />
        {Array.isArray(category?.categories) &&
          category.categories.map((item) => (
            <CategoryCard
              key={item.id}
              selectedCategory={selectedCategory}
              handleSelectCategory={handleSelectCategory}
              item={item}
            />
          ))}

      </section>
      <section className="space-y-2 lg:w-[50%] px-5 lg:px-20 overflow-y-auto">
        {service.services.map((item) => (
          <div key={item.id} className="space-y-4">
            <ServiceCard
              onRemove={handleRemoveService}
              onSelect={handleSelectService}
              service={item}
              isSelected={isServiceSelected(bookingData.services, item.id)}
            />
            <Divider />
          </div>
        ))}
      </section>
      <section className="lg:w-[25%] ">
        <div className="border rounded-md p-5">
          {bookingData.services.length ? (
            <div className="">
              <div className="flex items-center gap-2">
                <ShoppingCart sx={{ fontSize: "30px", color: "green" }} />
                <h1 className="font-thin text-sm">Selected Services</h1>
              </div>

              <SelectedServiceList
                handleRemoveService={handleRemoveService}
                services={bookingData.services}
              />

              <Button
                onClick={handleOpenModal}
                sx={{ py: ".7rem" }}
                fullWidth
                variant="contained"
              >
                {console.log("booking data ", bookingData)}
                Book now
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center">
              <RemoveShoppingCart sx={{ fontSize: "30px", color: "green" }} />
              <h1>not selected</h1>
            </div>
          )}
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[600px] bg-white shadow-lg p-4 lg:flex gap-5">
          <div className="w-[50%] border-r pr-5">
            <h1 className="text-xl font-bold">Time Slot Not Available</h1>
            <ul className="mt-5 space-y-2 font-semibold">
              {booking.slots?.length > 0 ? booking.slots.map((item) => (
                <li key={item.id}>
                  <ArrowRight /> {item.startTime?.split("T")[1]} To{" "}
                  {item.endTime?.split("T")[1]}
                </li>
              )) : <div className="flex justify-center items-center">
                <h1 className="text-primary-color">All Slots Are Available</h1></div>}
            </ul>
          </div>
          <div className="space-y-5">
            <SelectedServiceList
              handleRemoveService={handleRemoveService}
              services={bookingData.services}
            />
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ width: "100%" }}
                fullWidth
                onChange={(value) => {
                  if (value) {
                    const localDate = value.format("YYYY-MM-DDTHH:mm:ss");

                    console.log("Selected (Local):", localDate);

                    setBookingData((prev) => ({ ...prev, time: localDate }));
                  }
                }}
                label="Basic date time picker"
              />
            </LocalizationProvider>
            <div>
              <Button
                sx={{ py: ".7rem" }}
                fullWidth
                variant="outlined"
                onClick={handleBooking}
              >
                {console.log("booking data ", bookingData)}
                
                Book
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={true ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {booking.error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SalonServiceDetails;






