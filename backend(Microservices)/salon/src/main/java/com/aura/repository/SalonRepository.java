package com.aura.repository;

import com.aura.modal.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
//rishab
public interface SalonRepository extends JpaRepository<Salon,Long> {
    Salon findByOwnerId(Long ownerId);
    @Query("SELECT s FROM Salon s WHERE " +
            "(LOWER(s.city) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(s.address) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
            "s.active = true")
    List<Salon> searchSalons(@Param("keyword") String keyword); //@param line the query keyword and method paramenter keyword if both are same , not need but both are diff then give best prcatice
}
