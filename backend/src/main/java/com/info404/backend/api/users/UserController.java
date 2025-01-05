package com.info404.backend.api.users;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.info404.backend.api.ApiRequest;
import com.info404.backend.api.OrderByDirection;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<Users> selectAll(
            @RequestParam(name = "orderByColumn", required = false) UserOrderByColumn userOrderByColumn,
            @RequestParam(name = "orderByDirection", required = false) OrderByDirection orderByDirection,
            @RequestParam(name = "limit", required = false) Integer limit,
            @RequestParam(name = "offset", required = false) Integer offset,
            @RequestParam(name = "search", required = false) String search) {
        ApiRequest apiRequest = new ApiRequest();
        apiRequest.setOrderByColumn(userOrderByColumn);
        apiRequest.setOrderByDirection(orderByDirection);
        apiRequest.setLimit(limit);
        apiRequest.setOffset(offset);
        apiRequest.setSearch(search);
        return this.userService.selectAll(apiRequest);
    }

    @GetMapping("{id}")
    public Users selectById(@PathVariable("id") UUID id) {
        return this.userService.selectById(id);
    }

    @PostMapping("")
    public void insert(@RequestBody @Valid Users user) {
        this.userService.insert(user);
    }

    @PutMapping("{id}")
    public Users updateById(@PathVariable("id") UUID id, @RequestBody Users updatedUser) {
        return this.userService.updateById(id, updatedUser);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable("id") UUID id) {
        this.userService.deleteById(id);
    }

    @GetMapping("/login")
    public Users login(@RequestParam String email, @RequestParam String password) {
        Users userFromDb = this.userService.login(email, password);
        if (userFromDb != null) {
            System.out.println("Login successful for: " + email);
            return userFromDb;
        } else {
            System.out.println("Login failed for: " + email);
            return null;
        }
    }

}
