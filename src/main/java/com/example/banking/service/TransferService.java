package com.example.banking.service;

import com.example.banking.dto.TransferSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.model.Transfer;
import com.example.banking.repository.CustomerRepository;
import com.example.banking.repository.TransferRepository;
import com.example.banking.util.AppUtils;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TransferService {
    private final TransferRepository transferRepository;
    private final CustomerRepository customerRepository;

    public Customer saveTransfer(TransferSaveRequest transferSaveRequest){
        Transfer transfer = AppUtils.mapper.map(transferSaveRequest, Transfer.class);

        Customer customerSender = customerRepository.findById(Long.valueOf(transferSaveRequest.getSenderId())).get();
        Customer customerReceiver = customerRepository.findById(Long.valueOf(transferSaveRequest.getReceiverId())).get();

        transfer.setTransferTime(LocalDateTime.now());
        transfer.setCustomerSender(customerSender);
        transfer.setCustomerReceiver(customerReceiver);
        transferRepository.save(transfer);

        customerSender.setBalance(customerSender.getBalance().subtract(transfer.getTransferAmount()));
        customerRepository.save(customerSender);

        customerReceiver.setBalance(customerReceiver.getBalance().add(transfer.getTransferAmount()));
        customerRepository.save(customerReceiver);

        return customerSender;
    }
}
