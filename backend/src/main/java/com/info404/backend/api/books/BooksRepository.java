package com.info404.backend.api.books;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;

@Mapper
interface BooksRepository {
    List<Books> selectAll();
    Books selectById(UUID id);
    void insert(Books book);
    void deleteById(UUID id);
}
