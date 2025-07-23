package com.aura.mapper;

import com.aura.modal.Booking;
import com.aura.payload.dto.BookingDTO;
import com.aura.payload.dto.SalonDTO;
import com.aura.payload.dto.ServiceOfferingDTO;
import com.aura.payload.dto.UserDTO;

import java.util.Set;

public class BookingMapper {

    // Convert Booking entity to BookingDTO
    public static BookingDTO toDTO(Booking booking,
                                   Set<ServiceOfferingDTO> serviceOfferingDTOS,
                                   SalonDTO salonDTO,
                                   UserDTO userDTO
                                   ) {
        if (booking == null) {
            return null;
        }

        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setSalonId(booking.getSalonId());
        bookingDTO.setCustomerId(booking.getCustomerId());
        bookingDTO.setStartTime(booking.getStartTime());
        bookingDTO.setEndTime(booking.getEndTime());
        bookingDTO.setServicesIds(booking.getServiceIds());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setTotalPrice(booking.getTotalPrice());

        // If services mapping is needed (convert from serviceIds to ServiceOfferingDTOs)
        bookingDTO.setServices(serviceOfferingDTOS);
        bookingDTO.setCustomer(userDTO);
        bookingDTO.setSalon(salonDTO);

        return bookingDTO;
    }

    // Convert BookingDTO to Booking entity
    public static Booking toEntity(BookingDTO bookingDTO) {
        if (bookingDTO == null) {
            return null;
        }

        Booking booking = new Booking();
        booking.setId(bookingDTO.getId());
        booking.setSalonId(bookingDTO.getSalonId());
        booking.setCustomerId(bookingDTO.getCustomerId());
        booking.setStartTime(bookingDTO.getStartTime());
        booking.setEndTime(bookingDTO.getEndTime());
        booking.setServiceIds(bookingDTO.getServicesIds());
        booking.setStatus(bookingDTO.getStatus());
        booking.setTotalPrice(bookingDTO.getTotalPrice());

        // Additional logic for mapping services can be added here if needed.

        return booking;
    }
}