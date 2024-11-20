package com.sergio.storiesapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sergio.storiesapp.exception.InvalidInputException;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

	private static final Logger logger = LoggerFactory.getLogger(StoryService.class);

	private final String USER_SERVICE_URL = "http://backend-users:3000/users/profile";

	private final RestTemplate restTemplate = new RestTemplate();

	/**
	 * Checks if the authorization token is valid and properly formatted.
	 * 
	 * @param authHeader the authorization header value
	 * 
	 * @return the token string if valid, or null if the format is invalid or the header is missing
	 */
	public String isValidToken(String authHeader) {
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return null; // Invalid or missing header
		}

		// Extract the token part after "Bearer "
		String token = authHeader.substring(7).trim();
		logger.info("token is= {}", token);
		return token.isEmpty() ? null : token;
	}

	/**
	 * Validate user data.
	 * 
	 * @param username the name of the user
	 * @param userId the id of the user
	 * @param userRoleId the role id of the user (1 or 2)
	 * 
	 * @throws InvalidInputException
	 */
	public void validateUserData(String username, Integer userId, Integer userRoleId) {
		if (username == null || username.trim().isEmpty()) {
			throw new InvalidInputException("The username field should not be empty");
		}
		if (userId == null) {
			throw new InvalidInputException("The userId field should not be empty");
		}
		if (userRoleId == null) {
			throw new InvalidInputException("The userRoleId field should not be empty");
		}
		if (userRoleId != 1 && userRoleId != 2) {
			throw new InvalidInputException("The userRoleId should either be '1' or '2'");
		}
	}

	public Map<String, Object> authenticateUser(String token) {
		// Create headers with the token
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + token);
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
				String username = (String) responseBody.get("username");
				Integer userId = (Integer) responseBody.get("id");
				Integer userRoleId = (Integer) responseBody.get("role_id");

				try {
					validateUserData(username, userId, userRoleId);
				}
				catch (InvalidInputException e) {
					logger.debug(e.getMessage());
					return null;
				}

				// Prepare user info map with extracted values
				Map<String, Object> userInfo = new HashMap<>();
				userInfo.put("author_name", username);
				userInfo.put("author_id", userId);
				userInfo.put("author_role_id", userRoleId);
				
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
