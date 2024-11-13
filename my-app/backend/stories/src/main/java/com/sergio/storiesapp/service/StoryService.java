package com.sergio.storiesapp.service;

import com.sergio.storiesapp.exception.InvalidStoryNameException;
import com.sergio.storiesapp.exception.StoryUpdateException;
import com.sergio.storiesapp.model.Story;
import com.sergio.storiesapp.repository.StoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Random;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StoryService {

	private static final Logger logger = LoggerFactory.getLogger(StoryService.class);

	@Autowired
	private StoryRepository storyRepository;

	/**
	 * Validates the title and content of a story.
	 * 
	 * @param title   the story title
	 * @param content the story content
	 * 
	 * @throws StoryUpdateException if validation fails
	 */
	public void validateStoryData(String title, String content, String authorVisibleStr) {
		if (title == null || title.trim().isEmpty()) {
			throw new StoryUpdateException("The title field should not be empty");
		}
		if (content == null || content.trim().isEmpty()) {
			throw new StoryUpdateException("The content field should not be empty");
		}
		if (authorVisibleStr == null || authorVisibleStr.trim().isEmpty()) {
			throw new StoryUpdateException("The author_visible field should not be empty");
		}
		if (title.length() > 100) {
			throw new StoryUpdateException("Title cannot be longer than 100 characters");
		}
		if (content.length() > 1500) {
			throw new StoryUpdateException("Content cannot be longer than 1500 characters");
		}
		if (authorVisibleStr != "true" || authorVisibleStr != "false") {
			throw new StoryUpdateException("author_visible should be either 'true' or 'false'");
		}
	}

	/**
	 * Validates the given story ID.
	 * 
	 * Ensures the story ID is positive and does not exceed Integer.MAX_VALUE.
	 * 
	 * @param storyId the ID of the story to validate
	 * 
	 * @throws IllegalArgumentException if the ID is invalid
	 */
	public void validateStoryId(int storyId) {
		if (storyId <= 0) {
			throw new IllegalArgumentException("Story ID must be a positive integer.");
		}
		if (storyId > Integer.MAX_VALUE) {
			throw new IllegalArgumentException("Story ID exceeds maximum allowed value.");
		}
	}

	/**
	 * Helper method to map and validate the StoryData
	 * @param storyData the Story object passed from the user request
	 * @return a Map with parsed data
	 * @throws StoryUpdateException if validation fails
	 */
	public Map<String, Object> mapStoryData(Map<String, String> storyData) throws StoryUpdateException {
		Map<String, Object> storyMap = new HashMap<>();

		String title = Optional.ofNullable(storyData.get("title")).orElse(null);
		String content = Optional.ofNullable(storyData.get("content")).orElse(null);
		String authorVisibleStr = Optional.ofNullable(storyData.get("author_visible")).orElse("false");

		try {
			validateStoryData(title, content, authorVisibleStr); // Reuse the existing validation logic
		}
		catch (StoryUpdateException e) {
			throw new StoryUpdateException(e.getMessage());
		}

		// Set title and content in the map
		storyMap.put("title", title);
		storyMap.put("content", content);

		// Set authorVisible based on role and request data
		Boolean authorVisible = Boolean.parseBoolean(authorVisibleStr);
		logger.info("authorVisible as boolean is: ", authorVisible);

		// Set author_visible in the map
		storyMap.put("author_visible", authorVisible);

		return storyMap;
	}

	/**
	 * Creates and saves a new story with the provided details.
	 * 
	 * @param title the title of the story
	 * @param content the content of the story
	 * @param authorId the ID of the author
	 * @param authorName the name of the author
	 * @param authorRoleId the role ID of the author (1 for admin, 2 for user)
	 * @param authorVisible whether the author is visible
	 * 
	 * @return true if the story is created and saved successfully
	 * 
	 * @throws StoryUpdateException if there is an error during the creation process, such as invalid role ID or failing to save the story
	 * @throws InvalidStoryNameException if a story with the same title already exists for the author
	 */
	public boolean createStory(Map<String, Object> storyMap) {

		String	title = (String) storyMap.get("title");
		String	content = (String) storyMap.get("content");
		Boolean	authorVisible = (Boolean) storyMap.get("author_visible");
		String	authorName = (String) storyMap.get("author_name");
		Integer	authorId = (Integer) storyMap.get("author_id");
		Integer	authorRoleId = (Integer) storyMap.get("author_role_id");


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
			throw new StoryUpdateException("Could not save the story. Please try again.");
		}
	}

	/**
	 * Updates the details of an existing story.
	 * 
	 * @param storyId the ID of the story to update
	 * @param title the new title for the story
	 * @param content the new content for the story
	 * @param authorVisible the visibility status of the author
	 * 
	 * @throws StoryUpdateException if the story with the given ID is not found
	 */
	public void updateStory(int storyId, Map<String, Object> storyInfoMap) {
		String	title = (String) storyInfoMap.get("title");
		String	content = (String) storyInfoMap.get("content");
		Boolean	authorVisible = (Boolean) storyInfoMap.get("author_visible");

		Story story = storyRepository.findById(storyId)
				.orElseThrow(() -> new StoryUpdateException("Story not found"));

		story.setTitle(title);
		story.setContent(content);
		story.setAuthorVisible(authorVisible);
		
		storyRepository.save(story);  // Persist updated story
	}

	/**
	 * Retrieves a list of stories for a specific author by their ID.
	 * 
	 * @param authorId the ID of the author
	 * @return a list of stories mapped to basic information for the specified author
	 */
	public List<Map<String, Object>> getUserStoriesByAuthorId(int authorId) {
		List<Story> stories = storyRepository.findByAuthorId(authorId);
		return stories.stream()
				.map(this::mapBasicStoryInfoToResponse)
				.collect(Collectors.toList());
	}

	/**
	 * Retrieves the latest stories up to the specified limit.
	 * 
	 * @param limit the maximum number of stories to retrieve
	 * @return a list of stories, mapped to basic information, up to the limit
	 */
	public List<Map<String, Object>> getLatestStories(int limit) {
		if (limit <= 0) {
			return List.of(); // Return an empty list if limit is non-positive
		}

		List<Story> stories = fetchStories(limit);
		return stories.stream()
				.map(this::mapBasicStoryInfoToResponse)
				.collect(Collectors.toList());
	}

	/**
	 * Retrieves a limited number of stories, ordered by creation date.
	 * 
	 * @param limit the maximum number of stories to fetch
	 * @return a list of stories, up to the specified limit
	 */
	private List<Story> fetchStories(int limit) {
		return storyRepository.findAllByOrderByCreatedAtDesc().stream()
				.limit(limit)
				.collect(Collectors.toList());
	}

	/**
	 * Maps basic story details (id, title, and creation date) to a response format.
	 * 
	 * @param story the story to map
	 * @return a map containing the story's id, title, and creation date
	 */
	private Map<String, Object> mapBasicStoryInfoToResponse(Story story) {
		return Map.of(
			"id", story.getId(),
			"title", story.getTitle(),
			"created_at", story.getCreatedAt()
		);
	}

	/**
	 * Retrieves a random story from the database.
	 * 
	 * @return an Optional containing the story details if found, or empty if no stories exist
	 */
	public Optional<Map<String, Object>> getRandomStory() {
		List<Story> allStories = storyRepository.findAll();
		
		if (allStories.isEmpty()) {
			return Optional.empty();
		}

		Random random = new Random();
		Story randomStory = allStories.get(random.nextInt(allStories.size()));

		return Optional.of(mapStoryToResponse(randomStory));
	}

	/**
	 * Retrieves a story by its ID.
	 * 
	 * @param storyId the ID of the story to retrieve
	 * @return an Optional containing a map with the story details if found, or an empty Optional if not
	 */
	public Optional<Map<String, Object>> getStoryById(int storyId) {
		Optional<Story> storyOpt = storyRepository.findById(storyId);
		
		return storyOpt.map(this::mapStoryToResponse);
	}

	/**
	 * Maps a Story object to a response format.
	 * 
	 * @param story the story to map
	 * @return a map containing all relevant story details
	 */
	private Map<String, Object> mapStoryToResponse(Story story) {
		return Map.of(
			"id", story.getId(),
			"title", story.getTitle(),
			"content", story.getContent(),
			"author_id", story.getAuthorId(),
			"author_role_id", story.getAuthorRoleId(),
			"author_name", story.getAuthorName(),
			"author_visible", story.getAuthorVisible(),
			"created_at", story.getCreatedAt()
		);
	}
}
