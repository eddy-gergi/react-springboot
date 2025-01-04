package com.info404.backend.api.rankings;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RankingsRepository {
    List<Rankings> selectByUserId(UUID userId, String orderByColumn, String orderByDirection);

    void insertRankingEntry(Rankings ranking);

    void removeRankingEntry(UUID userId, UUID mediaId);

    void updateRankingEntry(Rankings ranking);

    List<Rankings> selectByMediaId(UUID id);
}
