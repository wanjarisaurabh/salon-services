package com.aura.payload.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewDTO {

    private Long id;

    private Long property;

    private UserDTO user;

    private SalonDTO salon;

    private String reviewText;

    private double rating;

    private LocalDateTime createdAt;
}
