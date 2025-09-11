import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Grid } from "@mui/material";

// Validation schema

const BecomePartnerFormStep1 = ({ formik }) => {
  

  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">Owner Details</p>

      <div className="space-y-9">
        <TextField
          fullWidth
          name="fullName"
          label="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />

        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* <div className="space-y-2">
                    <p className="font-medium text-sm">
                        * Enter OTP sent to your mobile number
                    </p>
                    <OTPInput
                        length={6}
                        onChange={handleOtpChange}
                        error={false}
                    />
                    <p className="text-xs space-x-2">
                        Didn’t receive OTP?{" "}
                        <span onClick={handleResendOTP} className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold">
                            Resend OTP
                        </span>
                    </p>
                </div> */}

        <TextField
          fullWidth
          name="password"
          label="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
    </Box>
  );
};

export default BecomePartnerFormStep1;
