package com.sergio.storiesapp.repository;

import com.sergio.storiesapp.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Integer> {

    /**
     * Finds all stories by a specific author.
     * 
     * @param authorId the ID of the author
     * @return a list of stories by the given author
     */
    List<Story> findByAuthorId(int authorId);

    /**
     * Finds all stories by a specific story title.
     * 
     * @param title the title of the story
     * @return a list of stories by the given title
     */
    List<Story> findByTitle(String title);

    /**
     * Finds all stories ordered by creation date in descending order.
     * 
     * @return a list of all stories
     */
    List<Story> findAllByOrderByCreatedAtDesc();
}
