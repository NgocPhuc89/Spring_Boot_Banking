package com.example.banking.service;

import com.example.banking.dto.DepositSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.model.Deposit;
import com.example.banking.repository.CustomerRepository;
import com.example.banking.repository.DepositRepository;
import com.example.banking.util.AppUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class DepositsService {

    private final DepositRepository depositsRepository;
    private final CustomerRepository customerRepository;

    public List<Deposit> findAll(){
        return  depositsRepository.findAll();
    }

    public Customer save(DepositSaveRequest depositsSaveRequest , Long id){
        Deposit deposits = AppUtils.mapper.map(depositsSaveRequest, Deposit.class);
        Customer old = customerRepository.findById(id).get();

        deposits.setCustomerDep(old);
        deposits.setDepositTime(LocalDateTime.now());
        depositsRepository.save(deposits);

        old.setBalance(old.getBalance().add(deposits.getDepositAmount()));
        customerRepository.save(old);

        return old;
    }
}
