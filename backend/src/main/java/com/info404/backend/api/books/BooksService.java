package com.info404.backend.api.books;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BooksService {

    @Autowired
    private BooksRepository booksRepository;

    public List<Books> selectAll() {
        return this.booksRepository.selectAll();
    }

    public Books selectById(UUID id){
        return this.booksRepository.selectById(id);
    }
}
