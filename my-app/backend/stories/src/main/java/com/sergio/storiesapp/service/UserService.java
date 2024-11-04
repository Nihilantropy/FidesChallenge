package com.sergio.storiesapp.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final String USER_SERVICE_URL = "http://backend-users:3000/profile";

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
            ResponseEntity<Map> response = restTemplate.exchange(USER_SERVICE_URL, HttpMethod.GET, requestEntity, Map.class);

            // Check if response status is 200 (OK)
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, String> userInfo = new HashMap<>();
                userInfo.put("id", (String) response.getBody().get("id"));
                userInfo.put("username", (String) response.getBody().get("username"));
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
