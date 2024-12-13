package com.info404.backend.api.movies;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/movies")   
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MovieController {


    @Autowired
    private MovieService movieService;

    @GetMapping("/all")
    public List<Movies> selectAll() {
        return this.movieService.selectAll();
    }

    @GetMapping("{id}")
    public Movies selectById(@PathVariable("id") UUID id){
        return this.movieService.selectById(id);
    }
}
