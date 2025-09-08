package com.aura.repository;

import com.aura.modal.Review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findReviewsByUserId(Long userId);
    List<Review> findReviewsBySalonId(Long productId);
}
