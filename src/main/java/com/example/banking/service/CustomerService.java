package com.example.banking.service;

import com.example.banking.dto.CustomerSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.repository.CustomerRepository;
import com.example.banking.util.AppUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService {

    private  final CustomerRepository customerRepository;

    public List<Customer> findAll(){
        return customerRepository.findAll();
    }

    public Customer create (CustomerSaveRequest customerSaveRequest ){
        Customer customer = AppUtils.mapper.map(customerSaveRequest,Customer.class);
        customer.setBalance(new BigDecimal(0));
        customerRepository.save(customer);
        return customer;
    }

    public Customer update (CustomerSaveRequest customerSaveRequest, Long id ){
        Customer customer = AppUtils.mapper.map(customerSaveRequest,Customer.class);
        customer.setId(id);
        Customer oldCustomer = findID(id);
        customer.setBalance( oldCustomer.getBalance());
        customerRepository.save(customer);

        return customer;
    }

    public Customer findID(Long id){
        return customerRepository.findById(id).get();
    }

    public void delete(Long id){
        customerRepository.deleteById(id);
    }

}
