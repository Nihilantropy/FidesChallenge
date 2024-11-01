package com.sergio.storiesapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StoriesApplication {
    public static void main(String[] args) {
        SpringApplication.run(StoriesApplication.class, args);
    }
}
