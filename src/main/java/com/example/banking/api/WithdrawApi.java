package com.example.banking.api;

import com.example.banking.dto.WithdrawSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.service.WithdrawService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/withdraws")
@AllArgsConstructor
public class WithdrawApi {
    private final WithdrawService withdrawService;

    @PostMapping("/{id}")
    public ResponseEntity<?> withdrawMoney (@RequestBody WithdrawSaveRequest withdrawSaveRequest , @PathVariable Long id){
        Customer customer = withdrawService.saveWithdraw(withdrawSaveRequest,id);

        return ResponseEntity.ok(customer);
    }
}
