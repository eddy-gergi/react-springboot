package com.info404.backend.api.adminactions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.info404.backend.api.ApiRequest;
import com.info404.backend.api.OrderByDirection;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/adminactions")
public class AdminActionsController {

    @Autowired
    private AdminActionsService adminActionsService;

    @GetMapping("")
    public List<AdminActions> selectAll(@RequestParam(name = "orderByColumn", required = false)AdminActionsOrderByColumn adminActionsOrderByColumn,
                                        @RequestParam(name = "orderByDirection", required = false) OrderByDirection orderByDirection,
                                        @RequestParam(name = "limit", required = false) Integer limit,
                                        @RequestParam(name = "offset", required = false) Integer offset,
                                        @RequestParam(name = "search", required = false) String search) {
        ApiRequest apiRequest = new ApiRequest();
        apiRequest.setOrderByColumn(adminActionsOrderByColumn);
        apiRequest.setOrderByDirection(orderByDirection);
        apiRequest.setLimit(limit);
        apiRequest.setOffset(offset);
        apiRequest.setSearch(search);
        return this.adminActionsService.selectAll(apiRequest);
    }

    @PostMapping("/add")
    public void insert(@RequestBody AdminActions adminActions) {
        this.adminActionsService.insert(adminActions);
    }
}
