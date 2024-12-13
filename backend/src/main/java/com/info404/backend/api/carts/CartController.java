package com.info404.backend.api.carts;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin
@RequestMapping("/api/carts")
public class CartController {
    
    @Autowired
    private CartService cartService;

    @GetMapping("{id}")
    public Carts selectById(@PathVariable("id") UUID id) {
        return this.cartService.selectById(id);
    }
    
}
