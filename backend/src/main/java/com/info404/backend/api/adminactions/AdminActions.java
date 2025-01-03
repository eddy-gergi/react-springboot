package com.info404.backend.api.adminactions;

import java.time.LocalDateTime;
import java.util.UUID;



public class AdminActions {
    private UUID id, adminId;
    private String actionInfo;
    private LocalDateTime actionTimestamp;
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getAdminId() {
        return adminId;
    }
    public void setAdminId(UUID adminId) {
        this.adminId = adminId;
    }
    public String getActionInfo() {
        return actionInfo;
    }
    public void setActionInfo(String actionInfo) {
        this.actionInfo = actionInfo;
    }
    public LocalDateTime getActionTimestamp() {
        return actionTimestamp;
    }
    public void setActionTimestamp(LocalDateTime actionTimestamp) {
        this.actionTimestamp = actionTimestamp;
    }

    
    

}
