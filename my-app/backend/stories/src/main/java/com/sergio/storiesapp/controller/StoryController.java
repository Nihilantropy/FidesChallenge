package com.sergio.storiesapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.sergio.storiesapp.exception.InvalidInputException;
import com.sergio.storiesapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://expo-service:8081", "http://localhost:8000", "http://backend-users:3000"})
@RequestMapping("/stories")
public class StoryController {

    private static final Logger logger = LoggerFactory.getLogger(StoryController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> createStory(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> storyData) {
        // Log the incoming Authorization token (sanitize in production)
        logger.debug("Received Authorization Token: " + token);

        // Extract the title and content from the request body
        String title = storyData.get("title");
        String content = storyData.get("content");

        // Log incoming story data
        logger.debug("Received Story Creation Request:");
        logger.debug("Title: " + title);
        logger.debug("Content: " + content);

        // Validate inputs
        if (title == null || title.trim().isEmpty()) {
            throw new InvalidInputException("The title field should not be empty.");
        }
        if (content == null || content.trim().isEmpty()) {
            throw new InvalidInputException("The content field should not be empty.");
        }

        // Authenticate user and get user info
        Map<String, String> userInfo = userService.authenticateUser(token);
        if (userInfo == null) {
            // Return Unauthorized if authentication fails
            logger.error("Authentication failed: Invalid Authorization Token");
            return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
        }

        // Log user info if authentication succeeds
        String userId = userInfo.get("id");
        String username = userInfo.get("username");
        logger.debug("Authentication successful.");
        logger.debug("User ID: " + userId);
        logger.debug("Username: " + username);

        // If authenticated, proceed with creating the story (placeholder message for now)
        return new ResponseEntity<>("User authenticated, ready to save story with title: " + title, HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
    return new ResponseEntity<>("Test successful", HttpStatus.OK);
}

}
