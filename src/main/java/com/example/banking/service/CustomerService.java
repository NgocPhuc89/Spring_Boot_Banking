package com.example.banking.service;

import com.example.banking.dto.CustomerSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.model.LocationRegion;
import com.example.banking.repository.CustomerRepository;
import com.example.banking.repository.LocationRegionRepository;
import com.example.banking.util.AppUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class CustomerService {

    private  final CustomerRepository customerRepository;
    private final LocationRegionRepository locationRegionRepository;

    public List<Customer> findAll(){
        return customerRepository.findAll();
    }

    public Customer create (CustomerSaveRequest customerSaveRequest ){
        Customer customer = AppUtils.mapper.map(customerSaveRequest,Customer.class);

        LocationRegion locationRegion = customerSaveRequest.getLocationRegion();
        locationRegionRepository.save(locationRegion);

        customer.setLocationRegion(locationRegion);
        customer.setBalance(new BigDecimal(0));
        customerRepository.save(customer);
        return customer;
    }

    public Customer update (CustomerSaveRequest customerSaveRequest, Long id ){
        Customer customer = AppUtils.mapper.map(customerSaveRequest,Customer.class);

        LocationRegion locationRegion = customerSaveRequest.getLocationRegion();
        locationRegionRepository.save(locationRegion);

        customer.setId(id);
        customer.setLocationRegion(locationRegion);

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
