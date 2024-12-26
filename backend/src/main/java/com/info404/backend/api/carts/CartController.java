package com.info404.backend.api.carts;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public List<Carts> getCartByUserId(@PathVariable("userId") UUID userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/{userId}/add")
    public void addToCart(@PathVariable("userId") UUID userId, @RequestBody Map<String, Object> requestBody) {
        UUID mediaId = UUID.fromString((String) requestBody.get("mediaId"));
        String mediaType = (String) requestBody.get("mediaType");

        if (!mediaType.equals("book") && !mediaType.equals("movie")) {
            throw new IllegalArgumentException("Invalid mediaType: must be 'book' or 'movie'");
        }

        cartService.addToCart(userId, mediaId, mediaType);
    }

    @DeleteMapping("{id}")
    public void removeCartEntry(@PathVariable("id") UUID id) {
        this.cartService.removeCartEntry(id);
    }
}
