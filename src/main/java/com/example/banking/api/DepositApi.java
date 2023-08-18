package com.example.banking.api;

import com.example.banking.dto.DepositSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.model.Deposit;
import com.example.banking.service.DepositsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deposits")
@AllArgsConstructor
public class DepositApi {

    private final DepositsService depositsService;

    @GetMapping
    public List<Deposit> findAll (){
        return depositsService.findAll();
    }


    @PostMapping("/{id}")
    public ResponseEntity<?> recharge (@RequestBody DepositSaveRequest depositsSaveRequest, @PathVariable Long id){
        Customer customer = depositsService.save(depositsSaveRequest,id);

        return ResponseEntity.ok(customer);
    }
}
