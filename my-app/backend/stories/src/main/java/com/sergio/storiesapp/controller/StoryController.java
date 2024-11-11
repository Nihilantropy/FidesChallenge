package com.sergio.storiesapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.sergio.storiesapp.exception.StoryCreationException;
import com.sergio.storiesapp.service.StoryService;
import com.sergio.storiesapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = {"http://expo-service:8081", "http://backend-users:3000"})
@RequestMapping("/stories")
public class StoryController {

	private static final Logger logger = LoggerFactory.getLogger(StoryController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private StoryService storyService;

	/**
	 * Creates a new story.
	 * 
	 * @param token       the authorization token in the request header
	 * @param storyData   the story data (title and content) in the request body
	 * @return a ResponseEntity with appropriate status and message
	 */
	@PostMapping("/")
	public ResponseEntity<String> createStory(
			@RequestHeader(value = "Authorization", required = false) String token,
			@RequestBody Map<String, String> storyData) {
	
		// Log the start of the method
		logger.debug("Starting createStory method");
	
		if (token == null || token.trim().isEmpty()) {
			logger.error("Authorization header is missing");
			return new ResponseEntity<>("Authorization header is missing", HttpStatus.UNAUTHORIZED);
		}
	
		logger.info("Received Authorization Token: {}", token);
	
		String title = Optional.ofNullable(storyData.get("title")).orElse(null);
		String content = Optional.ofNullable(storyData.get("content")).orElse(null);
		String authorVisibleStr = Optional.ofNullable(storyData.get("author_visible")).orElse("false");
	
		logger.debug("Story data received: title={}, content={}, author_visible={}", title, content, authorVisibleStr);
	
		if (title == null || content == null) {
			logger.error("Request body data insufficient. Expected: {title, content}");
			return new ResponseEntity<>("Request body data insufficient. Expected: {title, content}", HttpStatus.BAD_REQUEST);
		}
	
		if (title.trim().isEmpty()) {
			logger.error("The title field should not be empty");
			return new ResponseEntity<>("The title field should not be empty", HttpStatus.BAD_REQUEST);
		}
		if (content.trim().isEmpty()) {
			logger.error("The content field should not be empty");
			return new ResponseEntity<>("The content field should not be empty", HttpStatus.BAD_REQUEST);
		}
		if (title.length() > 100) {
			logger.error("Title cannot be longer than 100 characters");
			return new ResponseEntity<>("Title cannot be longer than 100 characters", HttpStatus.BAD_REQUEST);
		}
		if (content.length() > 1500) {
			logger.error("Content cannot be longer than 1500 characters");
			return new ResponseEntity<>("Content cannot be longer than 1500 characters", HttpStatus.BAD_REQUEST);
		}
	
		// Authenticate user
		logger.debug("Attempting to authenticate user with token");
		Map<String, String> userInfo = userService.authenticateUser(token);
		if (userInfo == null) {
			logger.error("Authentication failed: Invalid Authorization Token");
			return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
		}
	
		logger.debug("User authenticated: {}", userInfo);
	
		try {
			String authorName = userInfo.get("username");
			String authorIdStr = userInfo.get("id");
			String authorRoleIdStr = userInfo.get("role_id");
	
			logger.debug("User info: authorName={}, authorId={}, authorRoleId={}", authorName, authorIdStr, authorRoleIdStr);
	
			// Check if the values are present and valid
			if (authorName == null || authorIdStr == null || authorRoleIdStr == null) {
				logger.error("Missing or invalid user information: username={}, id={}, role_id={}", authorName, authorIdStr, authorRoleIdStr);
				return new ResponseEntity<>("Invalid author information", HttpStatus.BAD_REQUEST);
			}

			// Convert authorId and authorRoleId to integers
			Integer authorId = null;
			Integer authorRoleId = null;

			try {
				authorId = Integer.valueOf(authorIdStr);
				authorRoleId = Integer.valueOf(authorRoleIdStr);
			} catch (NumberFormatException e) {
				logger.error("Failed to parse user information: id={}, role_id={}", authorIdStr, authorRoleIdStr);
				return new ResponseEntity<>("Invalid author information", HttpStatus.BAD_REQUEST);
			}
	
			logger.debug("User info: authorName={}, authorId={}, authorRoleId={}", authorName, authorId, authorRoleId);
	
	
			// Set authorVisible based on role and request data
			Boolean authorVisible = (authorRoleId == 1) ? false : Boolean.parseBoolean(authorVisibleStr);
			logger.debug("Author visible set to: {}", authorVisible);
	
			// Create the story
			logger.debug("Creating the story with title={} and content={}", title, content);
			storyService.createStory(title, content, authorId, authorName, authorRoleId, authorVisible);
			logger.info("Story created successfully");
			return new ResponseEntity<>("Story created successfully", HttpStatus.CREATED);
		} catch (StoryCreationException e) {
			logger.warn("Story creation failed: " + e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT); // 409 Conflict for duplicate title
		} catch (Exception e) {
			logger.error("Error creating story: " + e.getMessage(), e);
			return new ResponseEntity<>("An error occurred while creating the story", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Retrieves all stories created by the authenticated user.
	 * 
	 * @param token the authorization token in the request header
	 * @return a ResponseEntity containing a list of stories with title and ID in JSON format
	 */
	@GetMapping("/user")
	public ResponseEntity<Object> getUserStories(
			@RequestHeader(value = "Authorization", required = false) String token) {

		if (token == null || token.trim().isEmpty()) {
			return new ResponseEntity<>("Authorization header is missing", HttpStatus.UNAUTHORIZED);
		}

		logger.info("Received Authorization Token for retrieving user stories: {}", token);

		// Authenticate user
		Map<String, String> userInfo = userService.authenticateUser(token);
		if (userInfo == null) {
			logger.error("Authentication failed: Invalid Authorization Token");
			return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
		}

		try {
			Integer authorId = Integer.valueOf(userInfo.get("id"));

			if (authorId == null) {
				logger.error("Invalid author ID: {}", authorId);
				return new ResponseEntity<>("Invalid author information", HttpStatus.BAD_REQUEST);
			}

			// Fetch user stories
			List<Map<String, Object>> userStories = storyService.getUserStoriesByAuthorId(authorId);

			if (userStories.isEmpty()) {
				return new ResponseEntity<>("No stories found for this user", HttpStatus.OK);
			}

			return new ResponseEntity<>(userStories, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error retrieving user stories: {}", e.getMessage(), e);
			return new ResponseEntity<>("An error occurred while retrieving stories", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Gets the latest stories (up to a fixed limit).
	 * 
	 * @return a ResponseEntity containing the latest stories in JSON format
	 */
	@GetMapping("/latest")
	public ResponseEntity<List<Map<String, Object>>> getLatestStories() {
		final int storyLimit = 5; // The server defines the limit (5 stories)

		try {
			// Fetch the latest stories
			List<Map<String, Object>> latestStories = storyService.getLatestStories(storyLimit);

			if (latestStories.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT); // No stories found
			}

			return new ResponseEntity<>(latestStories, HttpStatus.OK); // Return stories as JSON
		} catch (Exception e) {
			logger.error("Error fetching latest stories: {}", e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Handle any errors
		}
	}

	/**
	 * Gets a random story.
	 * 
	 * @return a ResponseEntity containing a random story in JSON format or NO_CONTENT if none is available
	 */
	@GetMapping("/random")
	public ResponseEntity<Map<String, Object>> getRandomStory() {
		try {
			return storyService.getRandomStory()
					.map(story -> new ResponseEntity<>(story, HttpStatus.OK))
					.orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
		} catch (Exception e) {
			logger.error("Error fetching random story: {}", e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
     * Retrieves a single story by its ID.
     * 
     * @param storyId the ID of the story to retrieve
     * @return a ResponseEntity containing the story in JSON format or a 404 status if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getStoryById(@PathVariable("id") int storyId) {
        Optional<Map<String, Object>> storyData = storyService.getStoryById(storyId);
        
        if (storyData.isPresent()) {
            return new ResponseEntity<>(storyData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Story not found
        }
    }

}

