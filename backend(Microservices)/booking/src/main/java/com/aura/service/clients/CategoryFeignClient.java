package com.aura.service.clients;

import com.aura.payload.dto.CategoryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("CATEGORY")
public interface CategoryFeignClient { //interface

    @GetMapping("/api/categories/{id}") // full path
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id); //only header
}
