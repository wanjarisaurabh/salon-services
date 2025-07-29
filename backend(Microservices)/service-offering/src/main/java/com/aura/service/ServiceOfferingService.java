package com.aura.service;

import com.aura.modal.ServiceOffering;
import com.aura.payload.dto.CategoryDTO;
import com.aura.payload.dto.SalonDTO;
import com.aura.payload.dto.ServiceDTO;

import java.util.Set;

public interface ServiceOfferingService {


    ServiceOffering createService(
            ServiceDTO service,
            SalonDTO salon,
            CategoryDTO category
    );

    com.aura.modal.ServiceOffering updateService(
            Long serviceId,
            ServiceOffering service
    ) throws Exception;

    Set<ServiceOffering> getAllServicesBySalonId(Long salonId,Long categoryId);

    com.aura.modal.ServiceOffering getServiceById(Long serviceId);

    Set<ServiceOffering> getServicesByIds(Set<Long> ids);
}
