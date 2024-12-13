package com.info404.backend.api.carts;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartsRepository cartsRepository;

    public Carts selectById(UUID id){
        return this.cartsRepository.selectById(id);
    }
}
