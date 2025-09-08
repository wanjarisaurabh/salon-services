package com.aura.service.impl;

import com.aura.modal.Salon;
import com.aura.payload.dto.SalonDTO;
import com.aura.payload.dto.UserDTO;
import com.aura.repository.SalonRepository;
import com.aura.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SalonServiceImp implements SalonService {

    private final SalonRepository salonRepository;

    @Override
    public Salon createSalon(SalonDTO req, UserDTO user) {

        Salon salon=new Salon();
        salon.setName(req.getName());
        salon.setImages(req.getImages());
        salon.setCity(req.getCity());
        salon.setAddress(req.getAddress());
        salon.setEmail(req.getEmail());
        salon.setPhoneNumber(req.getPhoneNumber());
        salon.setOpenTime(req.getOpenTime());
        salon.setCloseTime(req.getCloseTime());
        salon.setHomeService(true);
        salon.setOpen(true);
        salon.setOwnerId(user.getId());
        salon.setActive(true);

        return salonRepository.save(salon);
    }

    @Override
    public Salon updateSalon(Long salonId, Salon salon) throws Exception {

        Salon existingSalon = getSalonById(salonId);
        if (existingSalon!=null) {

            existingSalon.setName(salon.getName());
            existingSalon.setAddress(salon.getAddress());
            existingSalon.setPhoneNumber(salon.getPhoneNumber());
            existingSalon.setEmail(salon.getEmail());
            existingSalon.setCity(salon.getCity());
            existingSalon.setOpen(salon.isOpen());
            existingSalon.setHomeService(salon.isHomeService());
            existingSalon.setActive(salon.isActive());
            existingSalon.setOpenTime(salon.getOpenTime());
            existingSalon.setCloseTime(salon.getCloseTime());

            return salonRepository.save(existingSalon);
        }
        throw new Exception("salon not exist");
    }

    @Override
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    @Override
    public Salon getSalonById(Long salonId) {
        return salonRepository.findById(salonId).orElse(null);
    }

    @Override
    public Salon getSalonByOwnerId(Long ownerId) {
        return salonRepository.findByOwnerId(ownerId);
    }

    @Override
    public List<Salon> searchSalonByCity(String city) {
        return salonRepository.searchSalons(city);
    }


}
