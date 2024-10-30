package com.sergio.storiesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class HealthCheckService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean checkDatabaseConnection() {
        try {
            jdbcTemplate.execute("SELECT 1");
            return true;
        } catch (Exception e) {
            System.err.println("Database connection failed: " + e.getMessage());
            return false;
        }
    }

    public void performHealthCheck() throws InterruptedException {
        int attempts = 300;
        for (int i = 0; i < attempts; i++) {
            if (checkDatabaseConnection()) {
                System.out.println("Database is up and running!");
                return; // Exit if connected
            }
            System.err.println("Database is not reachable, attempting to reconnect...");
            TimeUnit.SECONDS.sleep(2); // Wait for 1 second before retrying
        }
        System.err.println("Failed to connect to the database after 60 seconds. Shutting down the application...");
        System.exit(1); // Exit the application if not connected
    }
}
