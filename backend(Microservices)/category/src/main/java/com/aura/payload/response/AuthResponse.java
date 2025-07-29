package com.aura.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.aura.domain.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {
	private String jwt;
	private String message;
	private String title;
	private UserRole role;
	
}
