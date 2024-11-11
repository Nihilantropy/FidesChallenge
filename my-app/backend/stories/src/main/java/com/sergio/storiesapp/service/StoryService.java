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

	/**
	 * Creates and saves a new story.
	 * 
	 * @param title         the title of the story
	 * @param content       the content of the story
	 * @param authorId      the ID of the author
	 * @param authorName    the name of the author
	 * @param authorRoleId  the role ID of the author
	 * @param authorVisible the flag to check the author visibility on the story
	 * @return true if the story was saved successfully, otherwise false
	 */
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
			
			// Debug log the story object before saving
			logger.info("Story details before saving: {}", story);
			storyRepository.save(story);

			logger.info("Story saved successfully: ID={}, Title={}", story.getId(), title);
			return true;
		} catch (Exception e) {
			logger.error("Failed to save story: {}", e.getMessage(), e);
			throw new StoryCreationException("Could not save the story. Please try again.");
		}
	}

	/**
	 * Retrieves all stories created by a specific author.
	 * 
	 * @param authorId the ID of the author
	 * @return a list of maps containing each story's ID and title
	 */
	public List<Map<String, Object>> getUserStoriesByAuthorId(int authorId) {
		List<Story> stories = storyRepository.findByAuthorId(authorId);
		return stories.stream()
				.map(this::mapStoryToResponse)
				.collect(Collectors.toList());
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
		return stories.stream()
				.map(this::mapStoryToResponse)
				.collect(Collectors.toList());
	}

	/**
	 * Helper method to map a Story object to a structured response.
	 * 
	 * @param story the story to map
	 * @return a map with story details
	 */
	private Map<String, Object> mapStoryToResponse(Story story) {
		return Map.of(
			"id", story.getId(),
			"title", story.getTitle(),
			"createdAt", story.getCreatedAt()
		);
	}

	/**
	 * Retrieves a random story from the repository.
	 * 
	 * @return an Optional containing a map of the random story's details if available, otherwise an empty Optional
	 */
	public Optional<Map<String, Object>> getRandomStory() {
		List<Story> allStories = storyRepository.findAll();
		
		if (allStories.isEmpty()) {
			return Optional.empty(); // No stories available
		}

		// Get a random story
		Random random = new Random();
		Story randomStory = allStories.get(random.nextInt(allStories.size()));

		// Map the story to a structured response format
		Map<String, Object> storyMap = Map.of(
			"id", randomStory.getId(),
			"title", randomStory.getTitle(),
			"content", randomStory.getContent(),
			"author_id", randomStory.getAuthorRoleId(),
			"author_visible", randomStory.getAuthorVisible(),
			"createdAt", randomStory.getCreatedAt()
		);

		return Optional.of(storyMap);
	}

	/**
	 * Retrieves a story by its ID and maps it to a structured JSON format.
	 * 
	 * @param storyId the ID of the story to retrieve
	 * @return an Optional containing the story details if found, otherwise an empty Optional
	 */
	public Optional<Map<String, Object>> getStoryById(int storyId) {
		Optional<Story> storyOpt = storyRepository.findById(storyId);
		
		return storyOpt.map(this::mapStoryToResponse);
	}
}
