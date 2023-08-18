package com.example.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TransferSaveRequest {
    private String transferAmount;
    private String senderId;
    private String receiverId;
}
