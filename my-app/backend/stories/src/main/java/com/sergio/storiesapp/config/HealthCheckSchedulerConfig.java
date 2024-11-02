package com.sergio.storiesapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

@Component
@EnableScheduling
public class HealthCheckSchedulerConfig {

    private static final Logger logger = Logger.getLogger(HealthCheckSchedulerConfig.class.getName());

    private static final int MAX_ATTEMPTS = 20;
    private static final long RETRY_DELAY_MS = 5000;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Runs every minute to check the database health status
    @Scheduled(fixedRate = 60000)
    public void scheduleHealthCheck() {
        if (checkDatabaseConnection()) {
            logger.info("Database connection is healthy.");
        } else {
            logger.warning("Database connection lost. Attempting to reconnect...");
            performReconnect();
        }
    }

    // Checks the database connection status
    private boolean checkDatabaseConnection() {
        try {
            jdbcTemplate.execute("SELECT 1");
            return true;
        } catch (Exception e) {
            logger.warning("Database connection failed: " + e.getMessage());
            return false;
        }
    }

    // Reconnection logic with retry attempts
    private void performReconnect() {
        for (int attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            if (checkDatabaseConnection()) {
                logger.info("Database reconnection successful on attempt " + attempt);
                return; // Exit if reconnected
            }
            logger.warning("Reconnection attempt " + attempt + " failed. Retrying in " + RETRY_DELAY_MS + " ms...");
            try {
                TimeUnit.MILLISECONDS.sleep(RETRY_DELAY_MS);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                logger.severe("Reconnection retry interrupted.");
                return;
            }
        }
        logger.severe("Failed to reconnect to the database after " + MAX_ATTEMPTS + " attempts.");
    }
}
