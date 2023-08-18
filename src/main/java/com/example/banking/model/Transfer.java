package com.example.banking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime transferTime;

    private BigDecimal transferAmount;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    @JsonIgnore
    private Customer customerSender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    @JsonIgnore
    private Customer customerReceiver;
}
