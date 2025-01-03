package com.info404.backend.api.movies;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class Movies {
    @NotNull @NotEmpty
    private UUID id;
    @NotNull @NotEmpty
    private String title, director, genre, description, url;
    @NotNull @NotEmpty
    private Integer releaseyear;
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
    public String getDirector() {
        return director;
    }
    public void setDirector(String director) {
        this.director = director;
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
    public Integer getReleaseyear() {
        return releaseyear;
    }
    public void setReleaseyear(Integer releaseyear) {
        this.releaseyear = releaseyear;
    }
    
}
