package com.info404.backend.api.rankings;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.info404.backend.api.ApiRequest;

@Service
public class RankingsService {
    @Autowired
    private RankingsRepository rankingsRepository;

    public void addRankingEntry(UUID userId, UUID mediaId, String mediaType, int rating) {
        Rankings ranking = new Rankings();
        ranking.setUserId(userId);
        ranking.setMediaId(mediaId);
        ranking.setMediaType(mediaType);
        ranking.setRanking(rating);
        ranking.setRankedAt(LocalDateTime.now());
        this.rankingsRepository.insertRankingEntry(ranking);
    }

    public void removeRankingEntry(UUID userId, UUID mediaId) {
        this.rankingsRepository.removeRankingEntry(userId, mediaId);
    }

    public void updateRankingEntry(Rankings ranking) {
        this.rankingsRepository.updateRankingEntry(ranking);
    }

    public List<Rankings> getRankingByUserId(UUID userId, ApiRequest apiRequest) {
        String orderByColumn = apiRequest.getOrderByColumn() != null ? apiRequest.getOrderByColumn().toString() : null;
        String orderByDirection = apiRequest.getOrderByDirection() != null ? apiRequest.getOrderByDirection().toString()
                : null;
        return this.rankingsRepository.selectByUserId(userId, orderByColumn, orderByDirection);
    }

    public List<Rankings> getRankingByMediaId(UUID mediaId) {
        return this.rankingsRepository.selectByMediaId(mediaId);
    }

    public Rankings getRankingByUserIdAndMediaId(UUID userId, UUID mediaId) {
        return this.rankingsRepository.selectByUserIdAndMediaId(userId, mediaId);
    }
}
