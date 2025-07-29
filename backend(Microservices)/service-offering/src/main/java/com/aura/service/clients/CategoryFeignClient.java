package com.aura.service.clients;

import com.aura.payload.dto.CategoryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("CATEGORY")
public interface CategoryFeignClient {

    @GetMapping("/api/categories/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id);
}
