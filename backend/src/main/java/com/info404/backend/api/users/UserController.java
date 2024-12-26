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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<Users> selectAll() {
        return this.userService.selectAll();
    }

    @GetMapping("{id}")
    public Users selectById(@PathVariable("id") UUID id) {
        return this.userService.selectById(id);
    }

    @PostMapping("")
    public void insert(@RequestBody Users user) {
        this.userService.insert(user);
    }

    @PutMapping("{id}")
    public Users updateById(@PathVariable("id") UUID id) {
        return this.userService.updateById(id);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable("id") UUID id) {
        this.userService.deleteById(id);
    }

    @PostMapping("/login")
    public Users login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Attempting login for: " + loginRequest.getEmail());
        Users user = this.userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            System.out.println("Login successful for: " + user.getEmail());
        } else {
            System.out.println("Login failed for: " + loginRequest.getEmail());
        }
        return user;
    }

}
