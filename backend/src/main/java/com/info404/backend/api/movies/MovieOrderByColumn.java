package com.info404.backend.api.movies;

import com.info404.backend.api.OrderByColumn;

public enum MovieOrderByColumn implements OrderByColumn{
        title("title"),
        director("director"),
        genre("genre"),
        releaseyear("releaseyear");
    
        private final String movieOrderByColumn;
    
        private MovieOrderByColumn(String movieOrderByColumn){
            this.movieOrderByColumn=movieOrderByColumn;
        }
        @Override
        public String toString(){
            return this.movieOrderByColumn;
        }
}
