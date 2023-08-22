package com.example.banking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String fullName;
    private String email;
    private String phone;
    private BigDecimal balance;

    @OneToOne
    @JoinColumn(name = "location_region_id", referencedColumnName = "id")
    private LocationRegion locationRegion ;

    @JsonIgnore
    @OneToMany(mappedBy = "customerWithdraws")
    private List<Withdraw> withdrawsList;

    @JsonIgnore
    @OneToMany(mappedBy = "customerDep")
    private List<Deposit> deposits;

    @OneToMany(mappedBy = "customerSender")
    @JsonIgnore
    private List<Transfer> transferSender;

    @OneToMany(mappedBy = "customerReceiver")
    private List<Transfer> transferReceiver;


}

