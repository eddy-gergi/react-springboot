package com.info404.backend.api.books;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;

import com.info404.backend.api.ApiRequest;

@Mapper
interface BooksRepository {
    List<Books> selectAll(ApiRequest apiRequest);
    Books selectById(UUID id);
    void insert(Books book);
    void deleteById(UUID id);
    void updateById(Books book);
}
