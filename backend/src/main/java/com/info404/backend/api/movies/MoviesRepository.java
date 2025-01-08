package com.info404.backend.api.movies;
import org.apache.ibatis.annotations.Mapper;
import com.info404.backend.api.AbstractRepository;

@Mapper
interface MoviesRepository extends AbstractRepository<Movies> {}
