package com.sergio.storiesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://expo-service:8000")
public class HealthCheckController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/stories/healthz")
    public ResponseEntity<String> healthCheck() {
        if (checkDatabaseConnection()) {
            return ResponseEntity.ok("I'm happy and healthy");
        } else {
            return ResponseEntity.status(503).body("Service Unavailable");
        }
    }

    private boolean checkDatabaseConnection() {
        try {
            jdbcTemplate.execute("SELECT 1");
            return true;
        } catch (Exception e) {
            System.err.println("Database connection failed: " + e.getMessage());
            return false;
        }
    }
}
