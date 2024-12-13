package com.info404.backend.api;

public class ApiRequest {
    private OrderByColumn orderByColumn;
    private OrderByDirection orderByDirection;
    private Integer limit, offset;
    private String search;

    public OrderByColumn getOrderByColumn() {
        return orderByColumn;
    }
    public void setOrderByColumn(OrderByColumn orderByColumn) {
        this.orderByColumn = orderByColumn;
    }
    public OrderByDirection getOrderByDirection() {
        return orderByDirection;
    }
    public void setOrderByDirection(OrderByDirection orderByDirection) {
        this.orderByDirection = orderByDirection;
    }
   
    public Integer getLimit() {
        return limit;
    }
    public void setLimit(Integer limit) {
        this.limit = limit;
    }
    public Integer getOffset() {
        return offset;
    }
    public void setOffset(Integer offset) {
        this.offset = offset;
    }
    
    public String getSearch() {
        return search;
    }
    public void setSearch(String search) {
        this.search = search;
    }


}
