package com.info404.backend.api.books;

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

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BooksService booksService;

    @GetMapping("/all")
    public List<Books> selectAll(
            @RequestParam(name = "orderByColumn", required = false) BookOrderByColumn bookOrderByColumn,
            @RequestParam(name = "orderByDirection", required = false) OrderByDirection orderByDirection,
            @RequestParam(name = "limit", required = false) Integer limit,
            @RequestParam(name = "offset", required = false) Integer offset,
            @RequestParam(name = "search", required = false) String search) {
        ApiRequest apiRequest = new ApiRequest();
        apiRequest.setOrderByColumn(bookOrderByColumn);
        apiRequest.setOrderByDirection(orderByDirection);
        apiRequest.setLimit(limit);
        apiRequest.setOffset(offset);
        apiRequest.setSearch(search);
        return this.booksService.selectAll(apiRequest);
    }

    @GetMapping("{id}")
    public Books selectById(@PathVariable("id") UUID id) {
        return this.booksService.selectById(id);
    }

    @PostMapping("/add")
    public void insert(@RequestBody @Valid Books book) {
        this.booksService.insert(book);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable("id") UUID id) {
        this.booksService.deleteById(id);
    }
}
