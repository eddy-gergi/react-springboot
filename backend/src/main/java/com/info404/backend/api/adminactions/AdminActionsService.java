package com.info404.backend.api.adminactions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.info404.backend.api.ApiRequest;

@Service
public class AdminActionsService {
    @Autowired
    private AdminActionsRepository adminActionsRepository;

    public List<AdminActions> selectAll(ApiRequest apiRequest) {
        return this.adminActionsRepository.selectAll(apiRequest);
    }

    public void insert(AdminActions adminActions) {
        this.adminActionsRepository.insert(adminActions);
    }

    
}
