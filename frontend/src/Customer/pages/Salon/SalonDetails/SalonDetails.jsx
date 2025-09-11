import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchServicesBySalonId } from "../../../../Redux/Salon Services/action";
import { useParams } from "react-router-dom";
import { fetchSalonById } from "../../../../Redux/Salon/action";
import { getCategoriesBySalon } from "../../../../Redux/Category/action";

import SalonDetail from "./SalonDetail";
import SalonServiceDetails from "./SalonServiceDetails";
import CreateReviewForm from "../Reviews/CreateReviewForm";
import Review from "../Reviews/Review";
import { fetchBookedSlots } from "../../../../Redux/Booking/action";

const tabs = [{ name: "All Services" }, { name: "Reviews" },{name:"Create Review"}];

const SalonDetails = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchSalonById(id));
    dispatch(
      getCategoriesBySalon({
        salonId: id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  
  }, [id]);

  const handleActiveTab = (tab) => () => {
    setActiveTab(tab);
  };

  return (
    <div className="px-5 lg:px-20">
      <SalonDetail />
      <div className="space-y-5">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
            // color="secondary"
              onClick={handleActiveTab(tab)}
              variant={tab.name === activeTab?.name ? "contained" : "outlined"}
            >
              {tab.name}
            </Button>
          ))}
        </div>
        <Divider />
        
      </div>
      <div>
          {activeTab?.name==="Create Review"?
          <div className="flex justify-center ">
            <CreateReviewForm/>
          </div>:activeTab.name==="Reviews"?<div>
            <Review/>
          </div>:<SalonServiceDetails/>}
        </div>
      
    </div>
  );
};

export default SalonDetails;
