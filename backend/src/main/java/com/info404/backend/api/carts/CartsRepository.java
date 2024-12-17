package com.info404.backend.api.carts;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface CartsRepository {
    Carts selectByUserId(UUID id);
    void insertBooks(UUID userID, UUID mediaID, String mediaType);
    void insertMovies(UUID userID, UUID mediaID, String mediaType);

}
