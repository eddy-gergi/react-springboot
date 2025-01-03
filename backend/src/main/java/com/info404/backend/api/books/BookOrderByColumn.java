package com.info404.backend.api.books;

import com.info404.backend.api.OrderByColumn;

public enum BookOrderByColumn implements OrderByColumn{
    title("title"),
    author("author"),
    genre("genre"),
    publishedyear("publishedyear");

    private final String bookOrderByColumn;

    private BookOrderByColumn(String bookOrderByColumn){
        this.bookOrderByColumn=bookOrderByColumn;
    }
    @Override
    public String toString(){
        return this.bookOrderByColumn;
    }
}
