package com.sergio.storiesapp.service;

import com.sergio.storiesapp.exception.StoryCreationException;
import com.sergio.storiesapp.exception.StoryNotFoundException;
import com.sergio.storiesapp.exception.StoryUpdateException;
import com.sergio.storiesapp.exception.UnauthorizedDeleteException;
import com.sergio.storiesapp.exception.DeleteStoryException;
import com.sergio.storiesapp.exception.InvalidInputException;
import com.sergio.storiesapp.model.Story;
import com.sergio.storiesapp.repository.StoryRepository;

import jakarta.transaction.Transactional;

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
import java.time.LocalDateTime;

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
	 * @param authorVisibleStr the author visible string ("true"/"false")
	 * @param flag A flag to check if the validation is being made for a POST or a PUT request
	 * 
	 * @throws InvalidInputException if validation fails
	 */
	public void validateStoryData(String title, String content, String authorVisibleStr, Boolean flag) {
		
		if (flag == true) {
			if (title == null || title.trim().isEmpty()) {
				throw new InvalidInputException("The title field should not be empty");
			}
			if (content == null || content.trim().isEmpty()) {
				throw new InvalidInputException("The content field should not be empty");
			}
		}
		if (authorVisibleStr == null || authorVisibleStr.trim().isEmpty()) {
			throw new InvalidInputException("The author_visible field should not be empty");
		}
		if (title.length() > 100) {
			throw new InvalidInputException("Title cannot be longer than 100 characters");
		}
		if (content.length() > 3000) {
			throw new InvalidInputException("Content cannot be longer than 3000 characters");
		}
		if (!"true".equals(authorVisibleStr) && !"false".equals(authorVisibleStr)) {
			throw new InvalidInputException("author_visible should be either 'true' or 'false'");
		}
	}

	/**
	 * Check if the title story exist on the db
	 * 
	 * @param title
	 * 
	 * @return The story if it exist, otherwise return null
	 */
	public Story checkIfStoryExist(String title) {
		// Check for an existing story with the same title by this author
		Story story = storyRepository.findByTitle(title);
		if (story != null) {
			return story;
		}
		else
			return null;
	}

	/**
	 * Helper method to map and validate the StoryData
	 * @param storyData the Story object passed from the user request
	 * 
	 * @return a Map with parsed data
	 * 
	 * @throws InvalidInputException if validation fails
	 */
	public Map<String, Object> mapStoryData(Map<String, String> storyData, Boolean flag) throws InvalidInputException {
		Map<String, Object> storyMap = new HashMap<>();

		String title = Optional.ofNullable(storyData.get("title")).orElse(null);
		String content = Optional.ofNullable(storyData.get("content")).orElse(null);
		String authorVisibleStr = Optional.ofNullable(storyData.get("author_visible")).orElse("false");
		
		try {
			validateStoryData(title, content, authorVisibleStr, flag);
		}
		catch (InvalidInputException e) {
			throw new InvalidInputException(e.getMessage());
		}

		logger.info("Update story title and content succesfully validated");

		// Set title and content in the map
		storyMap.put("title", title);
		storyMap.put("content", content);

		// Set authorVisible based on role and request data
		Boolean authorVisible = Boolean.parseBoolean(authorVisibleStr);

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
	 * @throws IllegalArgumentException if there is an error during the creation process, such as invalid role ID or failing to save the story
	 */
	public boolean createStory(Map<String, Object> storyMap) {

		String	title = (String) storyMap.get("title");
		String	content = (String) storyMap.get("content");
		Boolean	authorVisible = (Boolean) storyMap.get("author_visible");
		String	authorName = (String) storyMap.get("author_name");
		Integer	authorId = (Integer) storyMap.get("author_id");
		Integer	authorRoleId = (Integer) storyMap.get("author_role_id");

		Story existingStory = checkIfStoryExist(title);
		if (existingStory != null) {
			throw new InvalidInputException("There's already a story with this title");
		}

		try {
			Story story = new Story();
			story.setTitle(title);
			story.setContent(content);
			story.setAuthor(authorId, authorRoleId, authorName, authorVisible);
			
			try {
				storyRepository.save(story);
			} catch (IllegalArgumentException e) {
				throw new IllegalArgumentException(e.getMessage());
			}
			return true;
		} catch (Exception e) {
			logger.error("Failed to save story: {}", e.getMessage(), e);
			throw new StoryCreationException("Could not save the story. Please try again.");
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
	@Transactional
	public void updateStory(int storyId, Map<String, Object> storyInfoMap) {
		String	title = (String) storyInfoMap.get("title");
		String	content = (String) storyInfoMap.get("content");
		Boolean	authorVisible = (Boolean) storyInfoMap.get("author_visible");
		
		// Check if the new title already exists and doesn't belong to the current story
		if (title != null && !title.isEmpty()) {
			Story existingStory = checkIfStoryExist(title);
			if (existingStory != null && existingStory.getId() != storyId) {
				throw new InvalidInputException("There's already a story with this title");
			}
		}
	
		logger.info("Story check passed");
		logger.info("proceed updating...");

		try {
			Story story = storyRepository.findById(storyId)
					.orElseThrow(() -> new StoryUpdateException("Story not found"));
			// Update fields if they are non-empty
			if (title != null && !title.isEmpty()) {
				story.setTitle(title);
			}
			if (content != null && !content.isEmpty()) {
				story.setContent(content);
			}
			// Always update author visibility if provided
			if (authorVisible != null) {
				story.setAuthorVisible(authorVisible);
			}
			story.setUpdatedAt(LocalDateTime.now());
			
			storyRepository.save(story);

		}
		catch (IllegalArgumentException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
		catch (Exception e) {
			logger.error("Failed to save story: {}", e.getMessage(), e);
			throw new StoryUpdateException("Could not save the story. Please try again.");
		}

	}


	/**
	 * Soft deletes a story by marking it as removed with the current timestamp.
	 * 
	 * @param storyId the ID of the story to delete
	 * @param authorMap a map containing the author's ID to verify the requester
	 * 
	 * @throws DeleteStoryException if the story with the given ID is not found or if the delete request is unauthorized
	 * @throws UnauthorizedDeleteException if the requester is not the author of the story
	 * @throws IllegalArgumentException when an IllegalArgumentException is cought
	 * 
	 * Note: This method does not perform a hard delete, but instead sets the <code>removedAt</code> timestamp,
	 * allowing for potential recovery of the story in the future. Soft deleting the story ensures data integrity
	 * while providing the possibility of restoring the story by nullifying the <code>removedAt</code> field if needed.
	 */
	public void deleteStory(int storyId, Map<String, Object> authorMap) {
		Integer	authorId = (Integer) authorMap.get("author_id");

		try {
			Story story = storyRepository.findById(storyId)
					.orElseThrow(() -> new DeleteStoryException("Story not found"));
	
			if (story.getAuthorId() != authorId) {
				throw new UnauthorizedDeleteException("This user is not the author of the story. Delete request rejected");
			}

			story.setRemovedAt(LocalDateTime.now());
			storyRepository.save(story);
		}
		catch (IllegalArgumentException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
		catch (Exception e) {
			logger.error("Failed to save story: {}", e.getMessage(), e);
			throw new DeleteStoryException("Could not delete the story. Please try again.");
		}
	}

	/**
	 * Retrieves a list of stories for a specific author by their ID, excluding stories
	 * that have been soft deleted (where removed_at is not null).
	 * 
	 * @param authorId the ID of the author
	 * @return a list of stories mapped to basic information for the specified author
	 */
	public List<Map<String, Object>> getUserStoriesByAuthorId(int authorId) {
		List<Story> stories = storyRepository.findByAuthorId(authorId);
		return stories.stream()
				.filter(story -> story.getRemovedAt() == null)  // Exclude deleted stories
				.map(this::mapBasicStoryInfoToResponse)
				.collect(Collectors.toList());
	}

	/**
	 * Retrieves the latest stories up to the specified limit, excluding stories that
	 * have been soft deleted (where removed_at is not null).
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
				.filter(story -> story.getRemovedAt() == null)  // Exclude deleted stories
				.map(this::mapBasicStoryInfoToResponse)
				.collect(Collectors.toList());
	}


	/**
	 * Retrieves a random story from the database, excluding soft-deleted stories.
	 * 
	 * @return an Optional containing the story details if found, or empty if no stories exist
	 */
	public Optional<Map<String, Object>> getRandomStory() {
		List<Story> allStories = storyRepository.findAll().stream()
				.filter(story -> story.getRemovedAt() == null)  // Exclude deleted stories
				.collect(Collectors.toList());
		
		if (allStories.isEmpty()) {
			return Optional.empty();
		}

		Random random = new Random();
		Story randomStory = allStories.get(random.nextInt(allStories.size()));

		return Optional.of(mapStoryToResponse(randomStory));
	}

	/**
	 * Retrieves a limited number of stories, ordered by creation date, excluding stories
	 * that have been soft deleted (where removed_at is not null).
	 * 
	 * @param limit the maximum number of stories to fetch
	 * @return a list of stories, up to the specified limit
	 */
	private List<Story> fetchStories(int limit) {
		return storyRepository.findAllByOrderByCreatedAtDesc().stream()
				.filter(story -> story.getRemovedAt() == null)  // Exclude deleted stories
				.limit(limit)
				.collect(Collectors.toList());
	}

	/**
	 * Retrieves all stories that have been soft deleted, i.e., where removed_at is not null.
	 * 
	 * @return a list of stories that have been soft deleted
	 */
	public List<Story> getDeletedStories() {
		return storyRepository.findAll().stream()
				.filter(story -> story.getRemovedAt() != null)  // Only include deleted stories
				.collect(Collectors.toList());
	}

	/**
	 * Deletes a story permanently from the database (hard delete).
	 * 
	 * @param storyId the ID of the story to delete
	 * 
	 * @throws StoryNotFoundException  if the story with the given ID is not found
	 * @throws DeleteStoryException if an error occurs while deleting the story
	 */
	public void deleteStoryPermanently(int storyId) {
		try {
			// Check if the story exists first
			Story story = storyRepository.findById(storyId)
					.orElseThrow(() -> new StoryNotFoundException("Story not found"));

			// Log the deletion for auditing purposes
			logger.info("Permanently deleting story with ID: {}", story.getId());

			// Delete the story permanently from the database
			storyRepository.deleteById(storyId);
		} catch (Exception e) {
			logger.error("Failed to delete story permanently: {}", e.getMessage(), e);
			throw new DeleteStoryException("Could not permanently delete the story. Please try again.");
		}
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
			"created_at", story.getCreatedAt(),
			"updated_at", story.getUpdatedAt(),
			"author_visible", story.getAuthorVisible()
		);
	}

	/**
	 * Retrieves a story by its ID, excluding soft-deleted stories.
	 * 
	 * @param storyId the ID of the story to retrieve
	 * @return an Optional containing a map with the story details if found, or an empty Optional if not
	 */
	public Optional<Map<String, Object>> getStoryById(int storyId) {
		Optional<Story> storyOpt = storyRepository.findById(storyId)
				.filter(story -> story.getRemovedAt() == null);  // Exclude deleted stories
		
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
			"created_at", story.getCreatedAt(),
			"updated_at", story.getUpdatedAt()
		);
	}
}
