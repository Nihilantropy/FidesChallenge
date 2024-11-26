package com.sergio.storiesapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class GlobalCorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all paths
                .allowedOrigins("http://localhost", "http://localhost:30000", "https://localhost", "http://localhost:8000", "https://localhost:8000", "http://backend-users:3000", "http://frontend-expo:8081") // Match: Access-Control-Allow-Origin *
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Match: Access-Control-Allow-Methods
                .allowedHeaders("Content-Type", "Authorization") // Match: Access-Control-Allow-Headers
                .allowCredentials(true) // Match: Access-Control-Allow-Credentials
                .maxAge(3600); // Cache the preflight response for 1 hour
    }
}
