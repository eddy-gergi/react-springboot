package com.info404.backend.api.adminactions;

import com.info404.backend.api.OrderByColumn;

public enum AdminActionsOrderByColumn implements OrderByColumn {
    adminId("adminId"),
    actionInfo("actionInfo");

    private final String column;

    private AdminActionsOrderByColumn(String column) {
        this.column = column;
    }

    @Override
    public String toString() {
        return this.column;
    }
}
