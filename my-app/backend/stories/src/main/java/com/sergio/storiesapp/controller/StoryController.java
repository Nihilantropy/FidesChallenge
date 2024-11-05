package com.sergio.storiesapp.controller;

import com.sergio.storiesapp.exception.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.sergio.storiesapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://expo-service:8081", "http://localhost:8000", "http://backend-users:3000"})
@RequestMapping("/stories")
public class StoryController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createStory(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> storyData) {
        // Extract the title and content from the request body
        String title = storyData.get("title");
        String content = storyData.get("content");

        // Log incoming story data
        System.out.println("Received Story Creation Request:");
        System.out.println("Title: " + title);
        System.out.println("Content: " + content);
        
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
            return new ResponseEntity<>("Invalid Authorization Token", HttpStatus.UNAUTHORIZED);
        }

        // Log user info if authentication succeeds
        String userId = userInfo.get("id");
        String username = userInfo.get("username");
        System.out.println("Authentication successful.");
        System.out.println("User ID: " + userId);
        System.out.println("Username: " + username);

        // If authenticated, proceed with creating the story (placeholder message for now)
        return new ResponseEntity<>("User authenticated, ready to save story with title: " + title, HttpStatus.OK);
    }
}
