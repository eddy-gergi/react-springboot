package com.info404.backend.api.users;

import com.info404.backend.api.OrderByColumn;

public enum UserOrderByColumn implements OrderByColumn {
    name("name"),
    email("email"),
    role("role");

    private String userOrderByColumn;

    private UserOrderByColumn(String userOrderByColumn) {
        this.userOrderByColumn = userOrderByColumn;
    }

    @Override
    public String toString() {
        return userOrderByColumn;
    }
}
