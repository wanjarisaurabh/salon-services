import React, { useEffect, useState } from 'react'
import AdminRoutes from '../../../routes/AdminRoutes'
// import DrawerList from './DrawerList'
import Navbar from '../../../admin seller/components/navbar/Navbar'
import AdminDrawerList from '../../components/DrawerList'
import { Alert, Snackbar } from '@mui/material'


const AdminDashboard = () => {

  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  return (
    <>
      <div className="min-h-screen">
        <Navbar DrawerList={AdminDrawerList} />
        <section className="lg:flex lg:h-[90vh]">
          <div className="hidden lg:block h-full">
            <AdminDrawerList />
          </div>
          <div className="p-10 w-full lg:w-[80%]  overflow-y-auto">
            <AdminRoutes />
          </div>
        </section>

      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen} autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={false ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {"Category Updated successfully"}
        </Alert>
      </Snackbar>
    </>



  )
}

export default AdminDashboard