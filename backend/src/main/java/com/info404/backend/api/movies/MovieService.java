package com.info404.backend.api.movies;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {
    @Autowired
    private MoviesRepository movieRepository;

    public List<Movies> selectAll() {
        return this.movieRepository.selectAll();
    }

    public Movies selectById(UUID id){
        return this.movieRepository.selectById(id);
    }

    public void insert(Movies movie){
        this.movieRepository.insert(movie);
    }

    public void deleteById(UUID id){
        this.movieRepository.deleteById(id);
    }
}
