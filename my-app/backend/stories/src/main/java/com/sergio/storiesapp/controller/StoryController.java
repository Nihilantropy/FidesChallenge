package com.sergio.storiesapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/stories")
public class StoryController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public String checkDatabase() {
        String sql = "SELECT VERSION() as version";
        String version = jdbcTemplate.queryForObject(sql, String.class);
        return "Hello from MySQL " + version;
    }
}
