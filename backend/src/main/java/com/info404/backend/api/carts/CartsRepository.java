package com.info404.backend.api.carts;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CartsRepository {
    List<Carts> selectAll();
    Carts selectById(UUID id);
}
