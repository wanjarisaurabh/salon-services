import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalons } from '../../../Redux/Salon/action';
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';


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
const SalonTable = () => {
    const dispatch=useDispatch()
    const {salon}=useSelector(store=>store);

    useEffect(()=>{
dispatch(fetchSalons())
    },[])
  return (
    <>
    <h1 className="pb-5 font-bold text-xl">All Listed Salons</h1>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>image</StyledTableCell>
            <StyledTableCell >Title</StyledTableCell>
            <StyledTableCell >PRICE</StyledTableCell>
            <StyledTableCell >Owner</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>

   
          </TableRow>
        </TableHead>
        <TableBody>
          {salon.salons.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                <div className="flex gap-1 flex-wrap">
                  <img className="w-20 rounded-md" src={item.images[0]} alt="" />
                </div>
              </StyledTableCell>
              <StyledTableCell >{item.name}</StyledTableCell>
              <StyledTableCell >
                {" "}
                {item.address}
              </StyledTableCell>
              <StyledTableCell >
                <div className='space-y-2'>
                    <p><strong>name :</strong> {item.owner.fullName}</p>
                    <p><strong>email :</strong> {item.owner.email}</p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {item.city}
              </StyledTableCell>

             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default SalonTable