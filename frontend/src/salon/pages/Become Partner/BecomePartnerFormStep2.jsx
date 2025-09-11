import React, { useState } from "react";
import { Box, CircularProgress, IconButton, Stack, TextField } from "@mui/material";
import {
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";
import { AddPhotoAlternate, Close } from "@mui/icons-material";

const BecomePartnerFormStep3 = ({ formik }) => {
  const [uploadImage, setUploadingImage] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    // const image = URL.createObjectURL(file);
    formik.setFieldValue("salonDetails.images", [
      ...formik.values.salonDetails.images,
      image,
    ]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.salonDetails.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("salonDetails.images", updatedImages);
  };
  return (
    <Box className="space-y-5 ">
      <div className="flex flex-wrap gap-5">
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <label className="relative" htmlFor="fileInput">
          <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
            <AddPhotoAlternate className="text-gray-700" />
          </span>
          {uploadImage && (
            <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </label>

        <div className="flex flex-wrap gap-2">
          {formik.values?.salonDetails?.images.map((image, index) => (
            <div className="relative">
              <img
                className="w-24 h-24 object-cover"
                key={index}
                src={image}
                alt={`ProductImage ${index + 1}`}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                className=""
                size="small"
                color="error"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  outline: "none",
                }}
              >
                <Close sx={{ fontSize: "1rem" }} />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
      <TextField
        fullWidth
        name="salonDetails.name"
        label="Salon Name"
        value={formik.values.salonDetails.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
       
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <TimePicker
            label="Open Time"
            onChange={(newValue) => {
              if (newValue) {
                formik.setFieldValue("salonDetails.openTime", newValue);
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileTimePicker
            label="Close Time"
            // value={formik.salonDetails.openTime}
            onChange={(newValue) => {
              console.log("open time", newValue);
              formik.setFieldValue("salonDetails.closeTime", newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};

export default BecomePartnerFormStep3;
