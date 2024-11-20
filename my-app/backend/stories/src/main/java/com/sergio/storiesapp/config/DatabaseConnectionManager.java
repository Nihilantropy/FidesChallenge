package com.sergio.storiesapp.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component
public class DatabaseConnectionManager {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseConnectionManager.class);
    private static final int MAX_ATTEMPTS = 6; // Max attempts to connect (2 minutes / 20 seconds)

    private boolean connected = false;
    private int attemptCount = 0;

    @Value("${MYSQL_HOST}")
    private String mysqlHost;

    @Value("${MYSQL_PORT}")
    private String mysqlPort;

    @Value("${MYSQL_DATABASE}")
    private String mysqlDatabase;

    @Value("${MYSQL_USER}")
    private String mysqlUser;

    @Value("${MYSQL_PASSWORD}")
    private String mysqlPassword;

    private DataSource dataSource;

    @PostConstruct
    public void init() {
        logger.info("Database Configuration: Host: {}, Port: {}, Database: {}, User: {}", mysqlHost, mysqlPort, mysqlDatabase, mysqlUser);
    }

    @Bean
    public DataSource dataSource() {
        if (dataSource == null) {
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl("jdbc:mysql://" + mysqlHost + ":" + mysqlPort + "/" + mysqlDatabase);
            config.setUsername(mysqlUser);
            config.setPassword(mysqlPassword);
            config.addDataSourceProperty("maximumPoolSize", "10");
            dataSource = new HikariDataSource(config);
        }
        return dataSource;
    }

    @Scheduled(fixedDelay = 2000) // Attempt to connect every 2 seconds
    public void tryConnectToDatabase() {
        if (connected || attemptCount >= MAX_ATTEMPTS) {
            return; // If connected or max attempts reached, exit
        }

        attemptCount++;
        try (Connection connection = dataSource().getConnection()) {
            connected = true; // Connection successful
            logger.info("Database connection successfully established.");
        } catch (SQLException e) {
            logger.error("Database connection attempt {} failed. Retrying...", attemptCount);
            if (attemptCount >= MAX_ATTEMPTS) {
                logger.error("Failed to establish a database connection after {} attempts. Shutting down the application.", MAX_ATTEMPTS);
                System.exit(1); // Shutdown the application
            }
        }
    }

    public boolean isConnected() {
        return connected;
    }
}
