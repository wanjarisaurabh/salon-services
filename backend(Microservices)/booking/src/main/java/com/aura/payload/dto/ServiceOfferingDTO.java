package com.aura.payload.dto;

import lombok.Data;

@Data
public class ServiceOfferingDTO {


    private Long id;

    private String name;

    private String description;

    private int price;

    private int duration;

    private Long salon;

    private boolean available;

    private Long category;

    private String image;
}
