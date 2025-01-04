package com.info404.backend.api.users;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.info404.backend.api.ApiRequest;

@Service
public class UserService {
    @Autowired
    private UsersRepository usersRepository;

    List<Users> selectAll(ApiRequest apiRequest) {
        return this.usersRepository.selectAll(apiRequest);
    }

    public Users selectById(UUID id) {
        return this.usersRepository.selectById(id);
    }

    public void insert(Users user) {
        this.usersRepository.insert(user);
    }

    public void deleteById(UUID id) {
        this.usersRepository.deleteById(id);
    }

    public Users updateById(UUID id) {
        return this.usersRepository.UpdateById(id);
    }

    public Users login(String email, String password) {
        return this.usersRepository.login(email, password);
    }
    

}
