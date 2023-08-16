package com.example.banking.repository;

import com.example.banking.model.Withdraws;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WithdrawsRepository extends JpaRepository<Withdraws , Long> {
}
