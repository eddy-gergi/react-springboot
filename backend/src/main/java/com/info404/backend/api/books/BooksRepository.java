package com.info404.backend.api.books;
import org.apache.ibatis.annotations.Mapper;
import com.info404.backend.api.AbstractRepository;

@Mapper
interface BooksRepository extends AbstractRepository<Books> {}
