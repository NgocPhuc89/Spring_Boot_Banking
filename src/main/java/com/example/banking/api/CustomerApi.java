package com.example.banking.api;

import com.example.banking.dto.CustomerSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@AllArgsConstructor
public class CustomerApi {

    private final CustomerService customerService;

    @GetMapping
    public List<Customer> findAll(){
        return customerService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findId(@PathVariable Long id){
        Customer customer = customerService.findID(id);
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public ResponseEntity<?> create (@RequestBody CustomerSaveRequest customerSaveRequest){
        Customer customer = customerService.create(customerSaveRequest);

       return ResponseEntity.ok(customer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update (@PathVariable Long id , @RequestBody CustomerSaveRequest customerSaveRequest){
        Customer customer = customerService.update(customerSaveRequest,id);

        return ResponseEntity.ok(customer);
    }
}
