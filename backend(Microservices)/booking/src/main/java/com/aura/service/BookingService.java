package com.aura.service;

import com.aura.domain.BookingStatus;
import com.aura.modal.*;
import com.aura.payload.dto.SalonDTO;
import com.aura.payload.dto.ServiceOfferingDTO;
import com.aura.payload.dto.UserDTO;
import com.aura.payload.request.BookingRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingService {


    Booking createBooking(
            BookingRequest booking,
            UserDTO user,
            SalonDTO salon,
            Set<ServiceOfferingDTO> serviceOfferingSet) throws Exception;


    List<Booking> getBookingsByCustomer(Long customerId);


    List<Booking> getBookingsBySalon(Long salonId);


    Booking getBookingById(Long bookingId);

    Booking bookingSucess(PaymentOrder order);


    Booking updateBookingStatus(Long bookingId, BookingStatus status) throws Exception;

    SalonReport getSalonReport(Long salonId);

    List<Booking> getBookingsByDate(LocalDate date,Long salonId);
}
