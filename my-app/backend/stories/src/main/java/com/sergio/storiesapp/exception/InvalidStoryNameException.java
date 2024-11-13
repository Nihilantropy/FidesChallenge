package com.sergio.storiesapp.exception;

public class InvalidStoryNameException extends RuntimeException {
    public InvalidStoryNameException(String message) {
        super(message);
    }
}
