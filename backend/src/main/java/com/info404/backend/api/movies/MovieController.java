package com.info404.backend.api.movies;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.info404.backend.api.ApiRequest;
import com.info404.backend.api.OrderByDirection;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/all")
    public List<Movies> selectAll(@RequestParam(name="orderByColumn", required= 
false)MovieOrderByColumn movieOrderByColumn,
  @RequestParam(name="orderByDirection", required = false)OrderByDirection orderByDirection) {
    ApiRequest apiRequest = new ApiRequest();
    apiRequest.setOrderByColumn(movieOrderByColumn);
    apiRequest.setOrderByDirection(orderByDirection);
    return this.movieService.selectAll(apiRequest);
    }

    @GetMapping("{id}")
    public Movies selectById(@PathVariable("id") UUID id) {
        return this.movieService.selectById(id);
    }

    @PostMapping("/add")
    public void insert(@RequestBody Movies movie) {
        this.movieService.insert(movie);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable("id") UUID id) {
        this.movieService.deleteById(id);
    }

}
