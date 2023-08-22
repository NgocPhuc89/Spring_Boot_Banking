package com.example.banking.dto;

import com.example.banking.model.LocationRegion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerSaveRequest {
    private String fullName;
    private String email;
    private String phone;
    private LocationRegion locationRegion;

}
