import React, { useEffect } from 'react'
import ServicesTable from './ServicesTable'
import { useDispatch } from 'react-redux';
import { fetchSalonByOwner } from '../../../Redux/Salon/action';


const Services = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSalonByOwner(localStorage.getItem("jwt")));
  }, []);
  
  return (
    <div>
      <ServicesTable/>
    </div>
  )
}

export default Services