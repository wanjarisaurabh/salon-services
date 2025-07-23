package com.aura.service.clients;

import com.aura.exception.UserException;
import com.aura.payload.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient("USER")
public interface UserFeignClient {

    @GetMapping("/api/users/profile")
    public ResponseEntity<UserDTO> getUserFromJwtToken(
            @RequestHeader("Authorization") String jwt) throws UserException;

    @GetMapping("/api/users/{userId}")
    public ResponseEntity<UserDTO> getUserById(
            @PathVariable Long userId
    ) throws UserException;
}
