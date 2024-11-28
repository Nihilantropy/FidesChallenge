package com.sergio.storiesapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class GlobalCorsConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			// Local Development Origins
			.allowedOrigins(
							"http://localhost", 
							"http://localhost:30000", 
							"https://localhost", 
							"http://localhost:8000", 
							"https://localhost:8000",
							
							// Kubernetes Service Names
							"http://backend-users:3000", 
							"http://frontend-expo:8081",
							
							// Ingress Controller Service Names
							"http://ingress-nginx-controller"
			)
			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
			.allowedHeaders("Content-Type", "Authorization", "X-Requested-With")
			.allowCredentials(true)
			.maxAge(3600);
	}
}
