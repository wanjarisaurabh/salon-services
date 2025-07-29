package com.aura.service;

import com.aura.modal.Category;
import com.aura.payload.dto.SalonDTO;

import java.util.List;
import java.util.Set;

public interface CategoryService {

    // Create or Update a Category
    Category saveCategory(Category category, SalonDTO salon);

    // Get all Categories
    List<Category> getAllCategories();

    Set<Category> getAllCategoriesBySalon(Long id);

    // Get Category by ID
    Category getCategoryById(Long id) throws Exception;

    Category updateCategory(Long id,Category category) throws Exception;

    // Delete Category by ID
    void deleteCategory(Long id) throws Exception;
}
