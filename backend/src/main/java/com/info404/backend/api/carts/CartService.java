package com.info404.backend.api.carts;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartsRepository cartsRepository;

    public List<Carts> getCartByUserId(UUID userId) {
        return this.cartsRepository.selectByUserId(userId);
    }

    public void addToCart(UUID userId, UUID mediaId, String mediaType) {
        Carts cartEntry = new Carts();
        cartEntry.setUserId(userId);
        cartEntry.setMediaId(mediaId);
        cartEntry.setMediaType(mediaType);
        cartEntry.setAddedAt(LocalDateTime.now());

        cartsRepository.insertCartEntry(cartEntry);
    }

    public void removeCartEntry(UUID id) {
        this.cartsRepository.removeCartEntry(id);
    }
}
