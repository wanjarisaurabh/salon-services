package com.aura.service.client;

import com.aura.payload.dto.BookingDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("BOOKING")
public interface BookingFeignClient {

    @GetMapping("/api/bookings/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long bookingId);
}
