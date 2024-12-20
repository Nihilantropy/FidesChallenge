package com.sergio.storiesapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "stories")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "author_id", nullable = false)
    private Integer authorId;

    @Column(name = "author_name", nullable = false)
    private String authorName;

    @Column(name = "author_role_id", nullable = false)
    private Integer authorRoleId;

    @Column(name = "author_visible", nullable = false)
    private Boolean authorVisible;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = createdAt;

    @Column(name = "removed_at", nullable = true)
    private LocalDateTime removedAt = null;

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Integer authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Boolean getAuthorVisible() {
        return authorVisible;
    }

    public void setAuthorVisible(Boolean authorVisible) {
        this.authorVisible = authorVisible;
    }

    public Integer getAuthorRoleId() {
        return authorRoleId;
    }

    public void setAuthorRoleId(Integer authorRoleId) {
        this.authorRoleId = authorRoleId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getRemovedAt() {
        return removedAt;
    }

    public void setRemovedAt(LocalDateTime removedAt) {
        this.removedAt = removedAt;
    }

    // Optional: override toString() for easier debugging
    @Override
    public String toString() {
        return "Story{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", author_id=" + authorId + '\'' +
                ", author_role_id='" + authorRoleId + '\'' +
                ", author_name='" + authorName + '\'' +
                ", author_visible='" + authorVisible + '\'' +
                ", created_at=" + createdAt + '\'' +
                ", updated_at=" + updatedAt + '\'' +
                ", removed_at=" + removedAt +
                '}';
    }

    // Additional logic for author type checking
    public void setAuthor(Integer authorId, Integer authorRoleId, String authorName, Boolean authorVisible) {
        this.authorId = authorId;
        this.authorRoleId = authorRoleId;
        this.authorName = authorName;
        this.authorVisible = authorVisible;
    }
}
