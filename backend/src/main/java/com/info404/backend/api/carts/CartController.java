package com.info404.backend.api.carts;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("{id}")
    public Carts selectByUserId(@PathVariable("id") UUID id) {
        return this.cartService.selectByUserId(id);
    }

    @PostMapping("{id}/add-books")
    public void insertBooks(@PathVariable("id") UUID userId,
            @RequestBody Map<String, Object> requestBody) {
        UUID mediaID = UUID.fromString((String) requestBody.get("mediaId"));
        String mediaType = (String) requestBody.get("mediaType");
        this.cartService.insertBooks(userId, mediaID, mediaType);
    }

    @PostMapping("{userId}/add-movies")
    public void insertMovies(@PathVariable("userId") UUID userId,
            @RequestParam("mediaId") UUID mediaID,
            @RequestParam("mediaType") String mediaType) {
        this.cartService.insertMovies(userId, mediaID, mediaType);
    }
}
