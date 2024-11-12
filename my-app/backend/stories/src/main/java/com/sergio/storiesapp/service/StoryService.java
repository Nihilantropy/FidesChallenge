package com.sergio.storiesapp.service;

import com.sergio.storiesapp.exception.InvalidStoryNameException;
import com.sergio.storiesapp.exception.StoryCreationException;
import com.sergio.storiesapp.model.Story;
import com.sergio.storiesapp.repository.StoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Random;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StoryService {

    private static final Logger logger = LoggerFactory.getLogger(StoryService.class);

    @Autowired
    private StoryRepository storyRepository;

    public boolean createStory(String title, String content, int authorId, String authorName, Integer authorRoleId, Boolean authorVisible) {
        logger.info("Saving story: Title={}, Author ID={}, Author Name={}", title, authorId, authorName);
        
        if (authorRoleId != 1 && authorRoleId != 2) {
            logger.error("Invalid author role ID: {}", authorRoleId);
            throw new StoryCreationException("Invalid author role. Should either be 1 for admin or 2 for user");
        }

        // Check for an existing story with the same title by this author
        List<Story> existingStories = storyRepository.findByTitle(title);
        if (!existingStories.isEmpty()) {
            throw new InvalidStoryNameException("There already is a story with this title.");
        }
        
        try {
            Story story = new Story();
            story.setTitle(title);
            story.setContent(content);
            story.setAuthorRole(authorId, authorRoleId, authorName, authorVisible);
            
            logger.info("Story details before saving: {}", story);
            storyRepository.save(story);

            logger.info("Story saved successfully: ID={}, Title={}", story.getId(), title);
            return true;
        } catch (Exception e) {
            logger.error("Failed to save story: {}", e.getMessage(), e);
            throw new StoryCreationException("Could not save the story. Please try again.");
        }
    }

    public List<Map<String, Object>> getUserStoriesByAuthorId(int authorId) {
        List<Story> stories = storyRepository.findByAuthorId(authorId);
        return stories.stream()
                .map(this::mapBasicStoryInfoToResponse)
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getLatestStories(int limit) {
        if (limit <= 0) {
            return List.of(); // Return an empty list if limit is non-positive
        }

        List<Story> stories = fetchStories(limit);
        return stories.stream()
                .map(this::mapBasicStoryInfoToResponse)
                .collect(Collectors.toList());
    }

    private List<Story> fetchStories(int limit) {
        return storyRepository.findAllByOrderByCreatedAtDesc().stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    private Map<String, Object> mapBasicStoryInfoToResponse(Story story) {
        return Map.of(
            "id", story.getId(),
            "title", story.getTitle(),
            "createdAt", story.getCreatedAt()
        );
    }

    public Optional<Map<String, Object>> getRandomStory() {
        List<Story> allStories = storyRepository.findAll();
        
        if (allStories.isEmpty()) {
            return Optional.empty();
        }

        Random random = new Random();
        Story randomStory = allStories.get(random.nextInt(allStories.size()));

        return Optional.of(mapStoryToResponse(randomStory));
    }

    public Optional<Map<String, Object>> getStoryById(int storyId) {
        Optional<Story> storyOpt = storyRepository.findById(storyId);
        
        return storyOpt.map(this::mapStoryToResponse);
    }

    private Map<String, Object> mapStoryToResponse(Story story) {
        return Map.of(
            "id", story.getId(),
            "title", story.getTitle(),
            "content", story.getContent(),
            "author_id", story.getAuthorId(),
            "author_role_id", story.getAuthorRoleId(),
            "author_name", story.getAuthorName(),
            "author_visible", story.getAuthorVisible(),
            "createdAt", story.getCreatedAt()
        );
    }
}
