package com.info404.backend.api.books;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/books")   
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BookController {

    @Autowired
    private BooksService booksService;

    @GetMapping("/all")
    public List<Books> selectAll() {
        return this.booksService.selectAll();
    }

    @GetMapping("{id}")
    public Books selectById(@PathVariable("id") UUID id){
        return this.booksService.selectById(id);
    }
}
