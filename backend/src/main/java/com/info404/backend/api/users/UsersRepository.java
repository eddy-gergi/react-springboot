package com.info404.backend.api.users;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;

@Mapper
interface UsersRepository {
    List<Users> selectAll();
    Users selectById(UUID id);
    void insert(Users user);
    void deleteById(UUID id);
    Users UpdateById(UUID id);
    Users login(String email, String password);
  
}
