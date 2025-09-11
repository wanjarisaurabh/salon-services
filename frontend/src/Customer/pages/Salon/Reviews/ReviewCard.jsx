import React from "react";
import { Avatar, Grid2, IconButton } from "@mui/material";
import { Rating, Box, Typography, Grid } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import { deleteReview } from "../../../../Redux/Review/action";
import { useDispatch, useSelector } from "react-redux";



const ReviewCard = ({ item }) => {
  const [value, setValue] = React.useState(4.5);
  const { auth, user } = useSelector(store => store);
  const dispatch = useDispatch()
  const handleDeleteReview = () => {
    dispatch(deleteReview({ reviewId: item.id, jwt: localStorage.getItem("jwt") || "" }))
  };
  return (
    <div className="flex justify-between">
      <Grid2 container spacing={2} gap={3}>
        <Grid2 item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              alt={item.user?.fullName}
              src=""
            >
              {item.user.fullName[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid2>
        <Grid2 item xs={9}>
          <div className="space-y-2">
            <div className="">
              <p className="font-semibold text-lg">{item.user?.fullName}</p>
              <p className="opacity-70">{item.createdAt}</p>
            </div>
            <div>


              <Rating
                readOnly
                value={item.rating}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              />

            </div>
            <p>
              {item.reviewText}
            </p>
           
          </div>
        </Grid2>
      </Grid2>
      {item.user?.id === auth.user?.id && <div className="">
        <IconButton onClick={handleDeleteReview}>
          <DeleteIcon sx={{ color: red[700] }} />
        </IconButton>
      </div>}
    </div>
  );
};

export default ReviewCard;
