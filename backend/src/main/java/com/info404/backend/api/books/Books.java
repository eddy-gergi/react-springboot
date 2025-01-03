package com.info404.backend.api.books;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class Books {
    @NotNull @NotEmpty
    private UUID id;
    @NotNull @NotEmpty
    private String title, author, genre, description, url;
    @NotNull @NotEmpty
    private Integer publishedyear;
    
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public Integer getPublishedyear() {
        return publishedyear;
    }
    public void setPublishedyear(Integer publishedyear) {
        this.publishedyear = publishedyear;
    }

    
}
