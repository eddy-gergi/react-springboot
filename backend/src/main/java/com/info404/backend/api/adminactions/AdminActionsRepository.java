package com.info404.backend.api.adminactions;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.info404.backend.api.ApiRequest;

@Mapper
interface AdminActionsRepository {
    List<AdminActions> selectAll(ApiRequest apiRequest);
    void insert(AdminActions adminActions); 
}
