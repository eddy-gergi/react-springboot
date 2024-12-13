package com.info404.backend.api.carts;

import java.time.LocalDateTime;
import java.util.UUID;

public class Carts {
    private UUID id, userId, mediaId;
    private String mediaType;
    private LocalDateTime added_at;
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
    public String getMediaType() {
        return mediaType;
    }
    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }
    public LocalDateTime getAdded_at() {
        return added_at;
    }
    public void setAdded_at(LocalDateTime added_at) {
        this.added_at = added_at;
    }
    
}
