package com.example.banking.service;

import com.example.banking.dto.LocationRegionSaveRequest;
import com.example.banking.model.LocationRegion;
import com.example.banking.repository.LocationRegionRepository;
import com.example.banking.util.AppUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class LocationRegionService {
    private final LocationRegionRepository locationRegionRepository;

    public List<LocationRegion> findAll(){
        return locationRegionRepository.findAll();
    }

    public LocationRegion create (LocationRegionSaveRequest locationRegionSaveRequest){
        LocationRegion locationRegion = AppUtils.mapper.map(locationRegionSaveRequest , LocationRegion.class);

        locationRegionRepository.save(locationRegion);
         return locationRegion;
    }
}
