package com.aura.controller;

import com.aura.exception.UserException;
import com.aura.mapper.SalonMapper;
import com.aura.modal.Salon;
import com.aura.payload.dto.SalonDTO;
import com.aura.payload.dto.UserDTO;
import com.aura.service.SalonService;
import com.aura.service.clients.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {

    private final SalonService salonService;
    private final UserFeignClient userService;


    @PostMapping
    public ResponseEntity<SalonDTO> createSalon(
            @RequestHeader("Authorization") String jwt,
            @RequestBody SalonDTO salon) throws UserException {
        UserDTO user=userService.getUserFromJwtToken(jwt).getBody();


        Salon createdSalon = salonService.createSalon(salon,user);

        SalonDTO salonDTO=SalonMapper.mapToDTO(createdSalon,user);

        return new ResponseEntity<>(salonDTO, HttpStatus.CREATED);
    }


    @PutMapping("/{salonId}")
    public ResponseEntity<SalonDTO> updateSalon(
            @PathVariable Long salonId,
            @RequestBody Salon salon
            ) throws Exception {
        Salon updatedSalon = salonService.updateSalon(salonId, salon);
        UserDTO user=userService.getUserById(updatedSalon.getOwnerId()).getBody();

        SalonDTO salonDTO=SalonMapper.mapToDTO(updatedSalon,user);

        return new ResponseEntity<>(salonDTO, HttpStatus.OK);


    }


    @GetMapping
    public ResponseEntity<List<SalonDTO>> getAllSalons() throws UserException {
        List<Salon> salons = salonService.getAllSalons();
        List<SalonDTO> salonDTOS = new ArrayList<>();
        for (Salon salon1 : salons) {
            UserDTO owner = userService.getUserById(salon1.getOwnerId()).getBody();
            SalonDTO apply = SalonMapper.mapToDTO(salon1, owner);
            salonDTOS.add(apply);
        }
        return ResponseEntity.ok(salonDTOS);
    }


    @GetMapping("/{salonId}")
    public ResponseEntity<SalonDTO> getSalonById(@PathVariable Long salonId) throws Exception {
        Salon salon = salonService.getSalonById(salonId);
        if (salon==null) {
            throw new Exception("salon not exist with id "+ salonId);
        }
        UserDTO user=userService.getUserById(salon.getOwnerId()).getBody();

        SalonDTO salonDTO=SalonMapper.mapToDTO(salon,user);

        return ResponseEntity.ok(salonDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SalonDTO>> searchSalon(
            @RequestParam("city") String city) throws Exception {
        List<Salon> salons = salonService.searchSalonByCity(city);
        List<SalonDTO> salonDTOS = new ArrayList<>();
        for (Salon salon1 : salons) {
            UserDTO owner = userService.getUserById(salon1.getOwnerId()).getBody();
            SalonDTO apply = SalonMapper.mapToDTO(salon1, owner);
            salonDTOS.add(apply);
        }
        return ResponseEntity.ok(salonDTOS);
    }

    @GetMapping("/owner")
    public ResponseEntity<Salon> getSalonByOwner(
            @RequestHeader("Authorization")String jwt) throws Exception {
        UserDTO user=userService.getUserFromJwtToken(jwt).getBody();
        System.out.println("salon "+user);
        Salon salon = salonService.getSalonByOwnerId(user.getId());

        return ResponseEntity.ok(salon);
    }
}
