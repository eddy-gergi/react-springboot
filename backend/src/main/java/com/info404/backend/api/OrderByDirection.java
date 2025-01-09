package com.info404.backend.api;

public enum OrderByDirection {

    ascending("ASC"),
    descending("DESC");

    private final String orderByDirection;

    private OrderByDirection(String orderByDirection){
        this.orderByDirection = orderByDirection; 
    }

    @Override
    public String toString(){
        return this.orderByDirection;
    }
}