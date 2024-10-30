package com.sergio.storiesapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;

@Component
@EnableScheduling
public class HealthCheckSchedulerConfig {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Scheduled(fixedRate = 60000) // Schedule every minute
    public void scheduleHealthCheck() {
        if (!checkDatabaseConnection()) {
            System.err.println("Database connection lost!");
        } else {
            System.out.println("Database connection is healthy.");
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
