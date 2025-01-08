package com.info404.backend.api.users;

import java.util.UUID;
import org.apache.ibatis.annotations.Mapper;
import com.info404.backend.api.AbstractRepository;

@Mapper
interface UsersRepository extends AbstractRepository<Users> {
    int updateById(UUID id, Users user);

    Users login(String email, String password);
}
