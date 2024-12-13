package com.info404.backend.api;

public enum OrderByDirection {

    ascending("ASC"),
    descending("DESC");

    private final String userOrderByDirection;

    private OrderByDirection(String userOrderByDirection){
        this.userOrderByDirection = userOrderByDirection; 
    }

    @Override
    public String toString(){
        return this.userOrderByDirection;
    }
}