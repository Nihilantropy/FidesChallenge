package com.sergio.storiesapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoryController {

    @GetMapping("/stories/exempleroute")
    public String sayHello() {
        return "Hello, World!";
    }
}