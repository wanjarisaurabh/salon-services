package com.aura.controller;

import com.aura.payload.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/users/home")
    public ResponseEntity<ApiResponse> HomeControllerHandler() {
        
        return ResponseEntity.status(
                        HttpStatus.OK)
                .body(new ApiResponse(

                        "welcome to hema property booking system, user api"


                ));
    }
}
