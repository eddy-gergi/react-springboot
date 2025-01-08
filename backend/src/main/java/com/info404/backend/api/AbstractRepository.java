package com.info404.backend.api;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AbstractRepository <T>{
    List<T> selectAll(ApiRequest apiRequest);
    T selectById(UUID id);
    void insert(T entity);
    void deleteById(UUID id);
    void updateById(T entity);
}
