package com.info404.backend.api.carts;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartsRepository cartsRepository;
    
    public Carts selectByUserId(UUID id){
        return this.cartsRepository.selectByUserId(id);
    }

    public void insertBooks(UUID userID, UUID mediaID, String mediaType){
        this.cartsRepository.insertBooks(userID, mediaID, mediaType);
    }
    
    public void insertMovies(UUID userID, UUID mediaID, String mediaType) {
        this.cartsRepository.insertMovies(userID, mediaID, mediaType);
    }

}
