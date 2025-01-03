package com.info404.backend.api.carts;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class Carts {
    @NotNull @NotEmpty
    private UUID id;
    @NotNull @NotEmpty
    private UUID userId;
    @NotNull @NotEmpty
    private UUID mediaId;
    @NotNull @NotEmpty
    private String mediaType;
    @NotNull @NotEmpty
    private LocalDateTime addedAt;

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

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }
}
