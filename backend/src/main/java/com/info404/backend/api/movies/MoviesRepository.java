package com.info404.backend.api.movies;

import java.util.List;
import java.util.UUID;
import org.apache.ibatis.annotations.Mapper;

import com.info404.backend.api.ApiRequest;

@Mapper
interface MoviesRepository {
    List<Movies> selectAll(ApiRequest apiRequest);
    Movies selectById(UUID id);
    void insert(Movies movie);
    void deleteById(UUID id);
}
