package com.example.banking.service;

import com.example.banking.dto.WithdrawSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.model.Withdraw;
import com.example.banking.repository.CustomerRepository;
import com.example.banking.repository.WithdrawRepository;
import com.example.banking.util.AppUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@Transactional
public class WithdrawService {
    private final WithdrawRepository withdrawRepository;
    private final CustomerRepository customerRepository;

    public Customer saveWithdraw (WithdrawSaveRequest withdrawSaveRequest, Long id){
        Withdraw withdraw = AppUtils.mapper.map(withdrawSaveRequest , Withdraw.class);
        Customer oldCustomer = customerRepository.findById(id).get();

        withdraw.setCustomerWithdraws(oldCustomer);
        withdraw.setWithdrawTime(LocalDateTime.now());
        withdrawRepository.save(withdraw);

        oldCustomer.setBalance(oldCustomer.getBalance().subtract(withdraw.getWithdrawAmount()));
        customerRepository.save(oldCustomer);

        return oldCustomer;

    }
}
