package com.aura.payload.dto;

import lombok.Data;

@Data
public class KeycloakUserinfo {

    private String sub;
    private String email;
    private String preferred_username;

}
