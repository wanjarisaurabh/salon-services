import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import BecomePartnerFormStep1 from "./BecomePartnerFormStep1";
import BecomePartnerFormStep2 from "./BecomePartnerFormStep3";
import BecomePartnerFormStep3 from "./BecomePartnerFormStep2";
import { useDispatch } from "react-redux";
import { createSalon } from "../../../Redux/Salon/action";
import { useNavigate } from "react-router-dom";

const steps = ["Owner Details", "Salon Details", "Salon Address"];

const SalonForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleStep = (value) => {
    setActiveStep(activeStep + value);
  };


  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      
      salonAddress: {
        phoneNumber: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
        email: "",
      },
      salonDetails: {
        name: "",
        openTime: "",
        closeTime: "",
        images:[]
      },
    },
    // validationSchema: FormSchema,
    onSubmit: (values) => {
     
      const openTime=getLocalTime(values.salonDetails.openTime)
      const closeTime=getLocalTime(values.salonDetails.closeTime)

      const ownerDetails={
        fullName:values.fullName,
        email: values.email,
        password: values.password,
        role:"SALON_OWNER",
        username:values.email.split("@")[0]
      }

      const salonDetails={
        ...values.salonDetails,
        openTime: openTime,
        closeTime: closeTime,
        ...values.salonAddress
      }

      dispatch(createSalon({ownerDetails,salonDetails,navigate}))

      console.log("ownerDetails: ",  ownerDetails)
      console.log("salonDetails: ",  salonDetails)

    },
  });

  const handleOtpChange = (otpValue) => {
    formik.setFieldValue("salonDetails.openTime", otpValue);
  };

  const handleSubmit = () => {
    //submit form data to server
    formik.handleSubmit();
    console.log("Form Submitted");
  };

  const getLocalTime=(time)=>{
    let hour = time?.$H;
    let minute = time.$m;
    let second = time.$s;

    const localTime = `${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
    return localTime;
  }

  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-20 space-y-10">
        <div>
          {activeStep === 0 ? (
            <BecomePartnerFormStep1 formik={formik} />
          ) : activeStep === 1 ? (
            <BecomePartnerFormStep3 formik={formik} />
          ) : (
            <BecomePartnerFormStep2 formik={formik} />
            // <div>setp 2</div>
          )}
        </div>

        <div className="flex items-center justify-between ">
          <Button
            disabled={activeStep === 0}
            onClick={() => handleStep(-1)}
            variant="contained"
          >
            Back
          </Button>
          <Button
            disabled={false}
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit
                : () => handleStep(1)
            }
            variant="contained"
          >
            {activeStep === steps.length - 1 ? (
              false ? (
                <CircularProgress
                  size="small"
                  sx={{ width: "27px", height: "27px" }}
                />
              ) : (
                "create account"
              )
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>{" "}
    </div>
  );
};

export default SalonForm;
