package com.sergio.storiesapp.controller;

import com.sergio.storiesapp.exception.DatabaseException; // Import the custom exception
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/stories")
public class StoryController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public Map<String, String> getMySQLVersion() {
        Map<String, String> response = new HashMap<>();
        try {
            String sql = "SELECT VERSION() AS version";
            String version = jdbcTemplate.queryForObject(sql, String.class);
            response.put("message", "Hello from MySQL " + version); // Correctly populate the map
            return response; // Return the response map
        } catch (Exception e) {
            // Throw custom DatabaseException instead of a generic error
            throw new DatabaseException("Could not retrieve MySQL version: " + e.getMessage());
        }
    }
}
