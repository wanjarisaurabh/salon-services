package com.aura.payload.dto;

import com.aura.domain.BookingStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class BookingDTO {

    private Long id;

    private Long salonId;

    private Long customerId;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Set<Long> servicesIds;

    private BookingStatus status;

    private int totalPrice;
}
