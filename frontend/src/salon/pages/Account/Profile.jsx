import React, { useEffect, useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
} from "@mui/material";
import ProfileFildCard from "./ProfileFildCard";

import { useSelector } from "react-redux";


export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const { salon,auth } = useSelector((store) => store);
  const [open, setOpen] = React.useState(false);
  const [selectedForm, setSelectedForm] = useState("persionalDetails");
  const handleClose = () => setOpen(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleOpen = (formName) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      // case "personalDetails":
        // return <PersonalDetailsForm onClose={handleClose} />;
      // case "businessDetails":
      //   return <BusinessDetailsForm onClose={handleClose} />;
      // case "pickupAddress":
      //   return <PickupAddressForm onClose={handleClose} />;
      // case "bankDetails":
      //   return <BankDetailsForm onClose={handleClose} />;
      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };



  return (
    <div className="lg:px-20 lg:pb-20 space-y-20">
      <div className="w-full lg:w-[70%]  ">

        <h1 className="text-5xl font-bold pb-5">{salon.salon?.name}</h1>

        {/* <div className="grid grid-cols-2 mb-20 gap-3">
          <div className="col-span-2">
            <img className="w-full rounded-md h-[15rem] object-cover" src={salon.salon?.images[0]} alt="" />
          </div>
          <div className="col-span-1">
            <img className="w-full  rounded-md h-[15rem] object-cover" src={salon.salon?.images[1]} alt="" />
          </div>
          <div className="col-span-1">
            <img className="w-full  rounded-md h-[15rem] object-cover" src={salon.salon?.images[2]} alt="" />
          </div>
        </div> */}


        <div className="grid grid-cols-2 mb-20 gap-3">
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
        </div>


        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Owner Details
          </h1>
          <div>
            
          </div>
        </div>
        <div className="space-y-5">
         
          <div>
            <ProfileFildCard
              keys={"Owner Name"}
              value={auth.user?.fullName}
            />
            <Divider />
            <ProfileFildCard
              keys={"Owner Email"}
              value={auth.user?.email}
            />
            <Divider />
            <ProfileFildCard
              keys={"Role"}
              value={"SALON_OWNER"}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Salon Details
          </h1>
          {/* <div>
            <Button
              onClick={() => handleOpen("businessDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div> */}
        </div>

        <div className=" ">
          <ProfileFildCard
            keys={"Salon Name"}
            value={salon.salon?.name}
          />
          <Divider />
          <ProfileFildCard
            keys={"Salon Address"}
            value={salon.salon?.address || "not provided"}
          />
          <Divider />
          
          <ProfileFildCard
            keys={"Open Time"}
            value={salon.salon?.openTime}
          />
            <Divider />
          
          <ProfileFildCard
            keys={"Close Time"}
            value={salon.salon?.closeTime}
          />
        </div>
      </div>
    
    

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={salon.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {salon.error ? salon.error : "Profile Updated Successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
