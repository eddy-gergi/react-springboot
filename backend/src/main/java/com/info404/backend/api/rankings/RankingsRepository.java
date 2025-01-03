package com.info404.backend.api.rankings;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;

import com.info404.backend.api.ApiRequest;

@Mapper
interface RankingsRepository {
    List<Rankings> selectByUserId(UUID id,  ApiRequest apiRequest);
    void insertRankingEntry(Rankings ranking);
    void removeRankingEntry(UUID userId, UUID mediaId);
    void updateRankingEntry(Rankings ranking);
    List<Rankings> selectByMediaId(UUID id);
}
