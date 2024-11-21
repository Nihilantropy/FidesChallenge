package com.sergio.storiesapp.service;

public class Sanitizer {

    // Validates the userId input
    public static void sanitizeUserId(Long userId) {
        // Check if the userId is null
        if (userId == null) {
            throw new IllegalArgumentException("userId cannot be null.");
        }

        // Check if the userId is an instance of Integer
        if (!(userId instanceof Long)) {
            throw new IllegalArgumentException("userId must be an integer.");
        }

        // Check if the userId is within the valid range of integers
        if (userId < Integer.MIN_VALUE || userId > Integer.MAX_VALUE) {
            throw new IllegalArgumentException("userId is out of the valid range.");
        }
    }
}
