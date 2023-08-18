package com.example.banking.api;

import com.example.banking.dto.TransferSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.service.TransferService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transfers")
@AllArgsConstructor
public class TransferApi {
    private final TransferService transferService;

    @PostMapping
    public ResponseEntity<?> transferMoney(@RequestBody TransferSaveRequest transferSaveRequest ){
        Customer customer = transferService.saveTransfer(transferSaveRequest);

        return ResponseEntity.ok(customer);
    }
}
