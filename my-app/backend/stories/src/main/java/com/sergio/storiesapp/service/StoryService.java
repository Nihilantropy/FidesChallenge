package com.sergio.storiesapp.service;

import com.sergio.storiesapp.exception.StoryCreationException;
import com.sergio.storiesapp.model.Story;
import com.sergio.storiesapp.repository.StoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StoryService {

    private static final Logger logger = LoggerFactory.getLogger(StoryService.class);

    @Autowired
    private StoryRepository storyRepository;

    /**
     * Creates and saves a new story.
     * 
     * @param title      the title of the story
     * @param content    the content of the story
     * @param authorId   the ID of the author
     * @param authorName the name of the author
     * @return true if the story was saved successfully, otherwise false
     */
    public boolean createStory(String title, String content, int authorId, String authorName) {
        logger.debug("Saving story: Title={}, Author ID={}, Author Name={}", title, authorId, authorName);

        // Check for an existing story with the same title by this author
        List<Story> existingStories = storyRepository.findByAuthorIdAndTitle(authorId, title);
        if (!existingStories.isEmpty()) {
            throw new StoryCreationException("You already have a story with this title.");
        }
        try {
            Story story = new Story();
            story.setTitle(title);
            story.setContent(content);
            story.setAuthorId(authorId);
            story.setAuthorName(authorName);

            storyRepository.save(story);

            logger.info("Story saved successfully: ID={}, Title={}", story.getId(), title);
            return true;
        } catch (Exception e) {
            logger.error("Failed to save story: {}", e.getMessage(), e);
            throw new StoryCreationException("Could not save the story. Please try again.");
        }
    }

    /**
     * Gets the latest stories up to a fixed limit.
     * 
     * @param limit the maximum number of stories to fetch
     * @return a list of stories mapped to a structured response
     */
    public List<Map<String, Object>> getLatestStories(int limit) {
        if (limit <= 0) {
            return List.of(); // Return an empty list if limit is non-positive
        }

        List<Story> stories = fetchStories(limit);
        return mapStoriesToResponse(stories);
    }

    /**
     * Fetches stories from the repository, ordered by creation date.
     * 
     * @param limit the maximum number of stories to fetch
     * @return a list of stories
     */
    private List<Story> fetchStories(int limit) {
        return storyRepository.findAllByOrderByCreatedAtDesc().stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    /**
     * Maps a list of stories to a structured response in JSON format.
     * 
     * @param stories the list of stories to map
     * @return a list of maps containing story details
     */
    private List<Map<String, Object>> mapStoriesToResponse(List<Story> stories) {
        return stories.stream().map(story -> {
            Map<String, Object> storyMap = Map.of(
                "id", story.getId(),
                "title", story.getTitle(),
                "content", story.getContent(),
                "createdAt", story.getCreatedAt()
            );
            return storyMap;
        }).collect(Collectors.toList());

    }
}


