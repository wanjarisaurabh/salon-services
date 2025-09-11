import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { redableDateTime } from "../../../util/redableDateTime";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalonBookings } from "../../../Redux/Booking/action";

export default function TransactionTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { booking } = useSelector((store) => store);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchSalonBookings({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Customer Details</TableCell>
              <TableCell>Booking</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking.bookings.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">
                  <div className="space-y-1">
                    <h1 className="font-medium">
                      {item.startTime.split("T")[0]}
                    </h1>
                    
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="space-y-2">
                    <h1>{item.customer.fullName}</h1>
                    <h1 className="font-semibold">{item.customer.email}</h1>
                    <h1 className="font-bold text-gray-600">
                      {item.customer.mobile}
                    </h1>
                  </div>
                </TableCell>
                <TableCell>
                  Booking Id : <strong> {item.id} </strong>
                </TableCell>
                <TableCell align="right">₹{item.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
