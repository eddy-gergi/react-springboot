package com.info404.backend.api.rankings;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class Rankings {
    @NotNull @NotEmpty
    private UUID id, userId, mediaId;
    @NotNull @NotEmpty
    private Integer ranking;
    @NotNull @NotEmpty
    private String mediaType;
    @NotNull @NotEmpty
    private LocalDateTime rankedAt;
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    public UUID getMediaId() {
        return mediaId;
    }
    public void setMediaId(UUID mediaId) {
        this.mediaId = mediaId;
    }
    public Integer getRanking() {
        return ranking;
    }
    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }
    public String getMediaType() {
        return mediaType;
    }
    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }
    public LocalDateTime getRankedAt() {
        return rankedAt;
    }
    public void setRankedAt(LocalDateTime rankedAt) {
        this.rankedAt = rankedAt;
    }

    
}
