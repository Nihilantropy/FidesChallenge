package com.sergio.storiesapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.sergio.storiesapp.exception.StoryCreationException;
import com.sergio.storiesapp.exception.DeleteStoryException;
import com.sergio.storiesapp.exception.InvalidInputException;
import com.sergio.storiesapp.exception.StoryUpdateException;
import com.sergio.storiesapp.exception.UnauthorizedDeleteException;
import com.sergio.storiesapp.service.Sanitizer;
import com.sergio.storiesapp.service.StoryService;
import com.sergio.storiesapp.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/stories")
@CrossOrigin(origins = {"http://localhost:8000", "https://my-self-signed-domain.com", "http://my-self-signed-domain.com"}, allowedHeaders = {"Content-Type", "Authorization"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE}, allowCredentials = "true")
public class StoryController {

	private static final Logger logger = LoggerFactory.getLogger(StoryController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private StoryService storyService;

	/**
	 * Creates a new story for an authenticated user.
	 * 
	 * @param authHeader the Authorization token (optional)
	 * @param storyData a map containing story data with keys "title", "content", and "author_visible"
	 * 
	 * @return a ResponseEntity containing:
	 *         - A success message with HTTP status 201 CREATED if the story is created successfully
	 *         - A message with HTTP status 400 BAD_REQUEST if the Authorization header is missing or invalid, 
	 *           or if there is invalid story data
	 *         - A message with HTTP status 409 CONFLICT if there is a conflict (e.g., duplicate title)
	 *         - A message with HTTP status 500 INTERNAL_SERVER_ERROR if an unexpected error occurs
	 */
	@PostMapping("/")
	public ResponseEntity<String> createStory(
			@RequestHeader(value = "Authorization", required = false) String authHeader,
			@RequestBody Map<String, String> storyData) {
	
		// Log the start of the method
		logger.debug("Starting createStory method");
	
		// Use UserService's isValidToken to validate and extract token
		String token = userService.isValidToken(authHeader);
		if (token == null) {
			 logger.error("Invalid or missing Authorization header");
			 return new ResponseEntity<>("Authorization header is missing or invalid", HttpStatus.UNAUTHORIZED);
		}
	
		logger.info("Received Authorization Token: {}", token);
	
		Map<String, Object>	storyInfoMap = new HashMap<>();

		try {
			// The flag specify if we are mapping a story for create or update (true == create, false == update)
			storyInfoMap = storyService.mapStoryData(storyData, true);
		}
		catch (InvalidInputException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

		// Debug print of the storyInfoMap
		System.out.println(storyInfoMap);

		logger.debug("Attempting to authenticate user with token");

		Map<String, Object>	authorMap = new HashMap<>(); 

		authorMap = userService.authenticateUser(token);
		if (authorMap == null) {
			logger.error("Authentication failed: Invalid Authorization Token");
			return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
		}
	
		logger.info("User authenticated: {}", authorMap);
	
		Map<String, Object> storyMap = new HashMap<>();
		try {
			storyMap.putAll(storyInfoMap);
			storyMap.putAll(authorMap);
			if (storyMap.containsKey("author_role_id") && storyMap.get("author_role_id").equals(1)) {
				storyMap.put("author_visible", false);
			}
		}
		catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		logger.info("full story map is {}", storyMap);

		try {
			// Create the story
			logger.debug("Creating the story with title={}", storyMap.get("title"));
			storyService.createStory(storyMap);
			logger.info("Story created successfully");
			return new ResponseEntity<>("Story created successfully", HttpStatus.CREATED);
		} catch (InvalidInputException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (IllegalArgumentException e) {
			logger.warn("Story creation failed: " + e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		} catch (StoryCreationException e) {
			logger.warn("Story creation failed: " + e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			logger.error("Error creating story: " + e.getMessage(), e);
			return new ResponseEntity<>("An error occurred while creating the story", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Updates an existing story with new title, content, and author visibility status.
	 * 
	 * @param storyId    the ID of the story to update, provided as a path variable
	 * @param authHeader the Authorization header containing the user's token
	 * @param storyData  a map containing updated story data: title, content, and author_visible
	 * 
	 * @return a ResponseEntity with an appropriate HTTP status and message:
	 *         - 200 OK if the update is successful
	 *         - 400 BAD_REQUEST if data validation fails
	 *         - 401 UNAUTHORIZED if the user is not authenticated
	 *         - 403 FORBIDDEN if the user is not authorized to modify the story
	 *         - 500 INTERNAL_SERVER_ERROR if an unexpected error occurs
	 */
	@PutMapping("/{id}")
	public ResponseEntity<String> updateStory(
			@PathVariable("id") Long storyIdL,
			@RequestHeader(value = "Authorization", required = false) String authHeader,
			@RequestBody Map<String, String> storyData) {

		try {
			Sanitizer.sanitizeUserId(storyIdL);  // Validate the ID
		} catch (IllegalArgumentException e) {
			logger.error("Invalid story ID: {}", storyIdL);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // Return error message in the response body
		}
		int	storyId = storyIdL.intValue();

		logger.debug("Starting updateStory method for storyId: {}", storyId);

		// Step 1: Validate and Extract Token
		String token = userService.isValidToken(authHeader);
		if (token == null) {
			logger.error("Invalid or missing Authorization header");
			return new ResponseEntity<>("Authorization header is missing or invalid", HttpStatus.UNAUTHORIZED);
		}
		logger.info("Received Authorization Token for updating story: {}", token);
		logger.info("Attempting to authenticate user with token");

		Map<String, Object>	authorMap = new HashMap<>(); 

		authorMap = userService.authenticateUser(token);
		if (authorMap == null) {
			logger.error("Authentication failed: Invalid Authorization Token");
			return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
		}

		logger.info("User authenticated: {}", authorMap);

		Map<String, Object>	storyInfoMap = new HashMap<>();

		try {
			// The flag specify if we are mapping a story for create or update (true == create, false == update)
			storyInfoMap = storyService.mapStoryData(storyData, false);
		}
		catch (StoryUpdateException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

		logger.info("Story info map is {}", storyInfoMap);


		try {
			// Step 4: Check Story Ownership
			Optional<Map<String, Object>> existingStory = storyService.getStoryById(storyId);
			logger.info("Existing story is {}", existingStory);
			logger.info("existing story author is {}", existingStory.get().get("author_id"));
			logger.info("story info map author is {}", authorMap.get("author_id"));
			if (existingStory.isEmpty() || !existingStory.get().get("author_id").equals(authorMap.get("author_id"))) {
				logger.info("Story with ID {} not found or not owned by user {}", storyId, storyInfoMap.get("authorId"));
				return new ResponseEntity<>("Story not found or you are not authorized to update this story", HttpStatus.FORBIDDEN);
			}
			else
				logger.info("control passed");

			// Step 5: Perform Update Operation
			storyService.updateStory(storyId, storyInfoMap);
			logger.info("Story with ID {} updated successfully by user {}", storyId, authorMap.get("author_name"));
			return new ResponseEntity<>("Story updated successfully", HttpStatus.NO_CONTENT);
		} catch (IllegalArgumentException e) {
			logger.warn("Story creation failed: " + e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		} catch (StoryUpdateException e) {
			logger.warn("Story creation failed: " + e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			logger.error("Error updating story: {}", e.getMessage(), e);
			return new ResponseEntity<>("An error occurred while updating the story", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Retrieves the stories of a user based on their authorization token.
	 * 
	 * @param authHeader the Authorization token (optional)
	 * 
	 * @return a ResponseEntity containing:
	 *         - A list of user stories with HTTP status 200 OK if found
	 *         - A message with HTTP status 401 UNAUTHORIZED if the Authorization header is missing or invalid
	 *         - A message with HTTP status 401 UNAUTHORIZED if authentication fails
	 *         - A message with HTTP status 500 INTERNAL_SERVER_ERROR if an error occurs
	 */
	@GetMapping("/user")
	public ResponseEntity<Object> getUserStories(
		@RequestHeader(value = "Authorization", required = false) String authHeader) {

		// Use UserService's isValidToken to validate and extract token
        String token = userService.isValidToken(authHeader);
        if (token == null) {
            logger.error("Invalid or missing Authorization header");
            return new ResponseEntity<>("Authorization header is missing or invalid", HttpStatus.UNAUTHORIZED);
        }

		logger.info("Received Authorization Token for retrieving user stories: {}", token);

		// Authenticate user
		Map<String, Object> authorMap = userService.authenticateUser(token);
		if (authorMap == null) {
			logger.error("Authentication failed: Invalid Authorization Token");
			return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
		}

		try {
			Integer authorId = (Integer) authorMap.get("author_id");
			List<Map<String, Object>> userStories = storyService.getUserStoriesByAuthorId(authorId);
	
			logger.info("Stories retrieved for authorId {}: {}", authorId, userStories);
			if (userStories.isEmpty()) {
				return new ResponseEntity<>("No stories found for this user", HttpStatus.NO_CONTENT);
			}
	
			return new ResponseEntity<>(userStories, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error retrieving user stories: {}", e.getMessage(), e);
			return new ResponseEntity<>("An error occurred while retrieving stories", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Retrieves the latest stories up to a predefined limit.
	 * 
	 * @return a ResponseEntity containing:
	 *         - A list of the latest stories in JSON format with an HTTP status of 200 OK if found
	 *         - 204 NO_CONTENT if no stories are available
	 *         - 500 INTERNAL_SERVER_ERROR if an unexpected error occurs
	 */
	@GetMapping("/latest")
	public ResponseEntity<List<Map<String, Object>>> getLatestStories() {
		final int storyLimit = 5; // The server defines the limit (5 stories)

		try {
			// Fetch the latest stories
			List<Map<String, Object>> latestStories = storyService.getLatestStories(storyLimit);
			logger.info("Latest stories retrieved: {}", latestStories);

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
	 * Retrieves a random story from the available stories.
	 * 
	 * @return a ResponseEntity containing:
	 *         - The random story data in JSON format with an HTTP status of 200 OK if found
	 *         - 204 NO_CONTENT if no stories are available
	 *         - 500 INTERNAL_SERVER_ERROR if an unexpected error occurs
	 */
	@GetMapping("/random")
	public ResponseEntity<Map<String, Object>> getRandomStory() {
		try {
            Optional<Map<String, Object>> story = storyService.getRandomStory();
            story.ifPresent(s -> logger.info("Random story retrieved: {}", s));

            return story.map(s -> new ResponseEntity<>(s, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
        } catch (Exception e) {
            logger.error("Error fetching random story: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}

	/**
	 * Retrieves a story by its unique ID.
	 * 
	 * @param storyId the ID of the story to retrieve, provided as a path variable
	 * 
	 * @return a ResponseEntity containing:
	 *         - The story data in JSON format with an HTTP status of 200 OK if found
	 *         - 404 NOT_FOUND if the story with the specified ID does not exist
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> getStoryById(
		@PathVariable("id") Long storyIdL) {

		// Validate the storyId before processing
		try {
			Sanitizer.sanitizeUserId(storyIdL);  // Validate the ID
		} catch (IllegalArgumentException e) {
			logger.error("Invalid story ID: {}", storyIdL);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // Return bad request if validation fails
		}
		int	storyId = storyIdL.intValue();
		
		Optional<Map<String, Object>> storyData = storyService.getStoryById(storyId);
		
		if (storyData.isPresent()) {
			logger.info("Story retrieved by ID {}: {}", storyId, storyData.get());
			return new ResponseEntity<>(storyData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Story not found", HttpStatus.NOT_FOUND); // Story not found
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteStoryById(
		@RequestHeader(value = "Authorization", required = false) String authHeader,
		@PathVariable("id") Long storyIdL) {
			
		// Validate the storyId before processing
		try {
			Sanitizer.sanitizeUserId(storyIdL);  // Validate the ID
		} catch (IllegalArgumentException e) {
			logger.error("Invalid story ID: {}", storyIdL);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // Return bad request if validation fails
		}
		int	storyId = storyIdL.intValue();

		// Use UserService's isValidToken to validate and extract token
		String token = userService.isValidToken(authHeader);
		if (token == null) {
			logger.error("Invalid or missing Authorization header");
			return new ResponseEntity<>("Authorization header is missing or invalid", HttpStatus.UNAUTHORIZED);
		}

		logger.info("Received Authorization Token for retrieving user stories: {}", token);

		// Authenticate user
		Map<String, Object> authorMap = userService.authenticateUser(token);
		if (authorMap == null) {
			logger.error("Authentication failed: Invalid Authorization Token");
			return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
		}

		try {
			storyService.deleteStory(storyId, authorMap);
			return new ResponseEntity<>("Story deleted succesfully", HttpStatus.NO_CONTENT);
		}
		catch (UnauthorizedDeleteException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
		catch (DeleteStoryException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

