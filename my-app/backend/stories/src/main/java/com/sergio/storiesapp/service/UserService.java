package com.sergio.storiesapp.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sergio.storiesapp.exception.InvalidInputException;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

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
	public void validateUserData(String username, String userId, String userRoleId) {
		if (username == null || username.trim().isEmpty()) {
			throw new InvalidInputException("The username field should not be empty");
		}
		if (userId == null || userId.trim().isEmpty()) {
			throw new InvalidInputException("The userId field should not be empty");
		}
		if (userRoleId == null || userRoleId.trim().isEmpty()) {
			throw new InvalidInputException("The userRoleId field should not be empty");
		}
		if (userRoleId != "1" || userRoleId != "2") {
			throw new InvalidInputException("The userRoleId should either be '1' or '2'");
		}
	}

	public Map<String, Object> authenticateUser(String token) {
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
				String username = (String) responseBody.get("username");
				String userIdStr = (String) (responseBody.get("id"));
				String userRoleIdStr = (String) (responseBody.get("role_id"));

				try {
					validateUserData(username, userIdStr, userRoleIdStr);
				}
				catch (InvalidInputException e) {
					return null;
				}

				Integer	userId;
				Integer	userRoleId;

				try {
					userId = Integer.valueOf(userIdStr);
					userRoleId = Integer.valueOf(userRoleIdStr);
				} catch (NumberFormatException e) {
					return null;
				}

				// Prepare user info map with extracted values
				Map<String, Object> userInfo = new HashMap<>();
				userInfo.put("username", username);
				userInfo.put("id", userId);
				userInfo.put("role_id", userRoleId);

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
