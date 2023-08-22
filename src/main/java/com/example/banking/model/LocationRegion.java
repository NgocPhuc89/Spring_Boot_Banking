package com.example.banking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LocationRegion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "province_id")
    private String provinceId;

    @Column(name = "province_name")
    private String provinceName;

    @Column(name = "district_id")
    private String districtId;

    @Column(name = "district_name")
    private String districtName;

    @Column(name = "ward_id")
    private String wardId;

    @Column(name = "ward_name")
    private String wardName;

    private String address;
}
