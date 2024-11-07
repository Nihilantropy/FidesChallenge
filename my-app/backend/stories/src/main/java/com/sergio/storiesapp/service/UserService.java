package com.sergio.storiesapp.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final String USER_SERVICE_URL = "http://backend-users:3000/users/profile";

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, String> authenticateUser(String token) {
        // Create headers with the token
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create the request entity with headers
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        try {
            // Send a GET request to the backend-users service
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(USER_SERVICE_URL, HttpMethod.GET, requestEntity, new ParameterizedTypeReference<>() {});

            // Check if response status is 200 (OK) and the response body is not null
            Map<String, Object> responseBody = response.getBody();
            if (response.getStatusCode() == HttpStatus.OK && responseBody != null) {
                // Extract the id and username from the response body
                String userId = String.valueOf(responseBody.get("id"));  // Convert id to String if needed
                String username = (String) responseBody.get("username");

                // Prepare user info map with extracted values
                Map<String, String> userInfo = new HashMap<>();
                userInfo.put("id", userId);
                userInfo.put("username", username);

                return userInfo;
            }
        } catch (Exception e) {
            // Log or handle exception (e.g., backend-users service is unavailable)
            e.printStackTrace();
        }

        // Return null if authentication fails
        return null;
    }
}
