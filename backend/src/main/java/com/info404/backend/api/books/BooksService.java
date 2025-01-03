package com.info404.backend.api.books;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.info404.backend.api.ApiRequest;

@Service
public class BooksService {

    @Autowired
    private BooksRepository booksRepository;

    public List<Books> selectAll(ApiRequest apiRequest) {
        return this.booksRepository.selectAll(apiRequest);
    }

    public Books selectById(UUID id){
        return this.booksRepository.selectById(id);
    }

    public void insert(Books book){
        this.booksRepository.insert(book);
    }

    public void deleteById(UUID id){
        this.booksRepository.deleteById(id);
    }
}
