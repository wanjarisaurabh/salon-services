package com.aura.repository;

import com.aura.modal.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {

    Set<ServiceOffering> findBySalonId(Long id);
}
