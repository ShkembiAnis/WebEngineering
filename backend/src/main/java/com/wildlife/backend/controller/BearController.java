package com.wildlife.backend.controller;

import com.wildlife.backend.dto.BearDTO;
import com.wildlife.backend.service.BearService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bears")
public class BearController {

    private static final Logger log = LoggerFactory.getLogger(BearController.class);
    private final BearService bearService;
    
    public BearController(BearService bearService) {
        this.bearService = bearService;
    }

    /**
     * GET /api/bears
     * Fetches all bears from Wikipedia
     */
    @GetMapping
    public ResponseEntity<List<BearDTO>> getAllBears() {
        log.info("Received request to fetch all bears");
        
        List<BearDTO> bears = bearService.fetchBearsFromWikipedia();
        
        if (bears.isEmpty()) {
            log.warn("No bears found");
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(bears);
    }
}

