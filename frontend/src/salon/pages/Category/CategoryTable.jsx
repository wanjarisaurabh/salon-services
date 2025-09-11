import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  styled,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import UpdateCategoryForm from "./UpdateCategoryForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CategoryTable() {
  const navigate = useNavigate();
  const { category } = useSelector((store) => store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);
  const [openUpdateCategoryForm, setUpdateCategoryForm] = useState(false);
  const handleOpenUpdateCategoryForm = (id) => () => {
    navigate(`/salon-dashboard/category/${id}`);
    setUpdateCategoryForm(true);
  };
  const handleCloseUpdateCategoryForm = () => setUpdateCategoryForm(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  React.useEffect(() => {
    if (category.updated || category.error) {
      setOpenSnackbar(true);
    }
  }, [category.updated, category.error]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>

              <StyledTableCell align="right">Update</StyledTableCell>
              {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {category.categories.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex gap-1 flex-wrap">
                    <img className="w-20 rounded-md" src={item.image} alt="" />
                  </div>
                </StyledTableCell>
                <StyledTableCell>{item.name}</StyledTableCell>

                <StyledTableCell align="right">
                  <IconButton
                    onClick={handleOpenUpdateCategoryForm(item.id)}
                    color="primary"
                    className="bg-primary-color"
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                {/* <StyledTableCell align="right">
                  <IconButton
                    onClick={() => console.log("delete servcie")}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openUpdateCategoryForm}
        onClose={handleCloseUpdateCategoryForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateCategoryForm onClose={handleCloseUpdateCategoryForm} />
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={category.updated ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {category.updated
            ? "category updated successfully"
            : category.error
            ? category.error
            : ""}
        </Alert>
      </Snackbar>
    </>
  );
}
