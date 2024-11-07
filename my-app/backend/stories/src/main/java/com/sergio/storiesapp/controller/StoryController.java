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

        if (token == null || token.trim().isEmpty()) {
            return new ResponseEntity<>("Authorization header is missing", HttpStatus.UNAUTHORIZED);
        }

        logger.debug("Received Authorization Token: {}", token);

        String title = storyData.get("title");
        String content = storyData.get("content");

        if (title == null || title.trim().isEmpty()) {
            return new ResponseEntity<>("The title field should not be empty", HttpStatus.BAD_REQUEST);
        }
        if (content == null || content.trim().isEmpty()) {
            return new ResponseEntity<>("The content field should not be empty", HttpStatus.BAD_REQUEST);
        }
        if (title.length() > 99) {
            return new ResponseEntity<>("Title cannot be longer than 99 characters", HttpStatus.BAD_REQUEST);
        }
        if (content.length() > 999) {
            return new ResponseEntity<>("Content cannot be longer than 999 characters", HttpStatus.BAD_REQUEST);
        }

        // Authenticate user
        Map<String, String> userInfo = userService.authenticateUser(token);
        if (userInfo == null) {
            logger.error("Authentication failed: Invalid Authorization Token");
            return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
        }

        try {
            String authorName = userInfo.get("username");
            int authorId = Integer.parseInt(userInfo.get("id"));
            storyService.createStory(title, content, authorId, authorName);
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
     * Gets the latest stories (up to a fixed limit).
     * 
     * @return a ResponseEntity containing the latest stories in JSON format
     */
    @GetMapping("/")
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
}
