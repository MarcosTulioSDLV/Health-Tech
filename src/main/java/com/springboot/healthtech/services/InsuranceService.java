package com.springboot.healthtech.services;

import com.springboot.healthtech.exceptions.InsuranceNameExistsException;
import com.springboot.healthtech.exceptions.InsuranceNameNotFoundException;
import com.springboot.healthtech.exceptions.InsuranceNotFoundException;
import com.springboot.healthtech.models.Insurance;
import com.springboot.healthtech.repositories.InsuranceRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;

    @Autowired
    public InsuranceService(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }


    public Page<Insurance> getInsurances(Pageable pageable) {
        return insuranceRepository.findAll(pageable);
    }

    public Insurance getInsuranceById(Long id) {
        return insuranceRepository.findById(id).orElseThrow(()->new InsuranceNotFoundException("Insurance with id: "+id+" not found!"));
    }

    public Page<Insurance> getInsuranceByNameContaining(String name,Pageable pageable) {
        return insuranceRepository.findByNameContainingIgnoreCase(name,pageable);
    }

    public Insurance getInsuranceByName(String name) {
        return insuranceRepository.findByNameIgnoreCase(name).orElseThrow(()->new InsuranceNameNotFoundException("Insurance with name: "+name+" not found!"));
    }

    @Transactional
    public Insurance addInsurance(Insurance insurance) {
        if(insuranceRepository.existsByNameIgnoreCase(insurance.getName())){
            throw new InsuranceNameExistsException("Insurance with name: "+insurance.getName()+" already exists!");
        }
        return insuranceRepository.save(insurance);
    }

    @Transactional
    public Insurance updateInsurance(Insurance insurance) {
        Insurance recoveredInsurance= getInsuranceById(insurance.getId());
        if(insuranceNameExistsAndBelongsToAnotherExistingInstance(insurance.getName(),recoveredInsurance)){
            throw new InsuranceNameExistsException("Insurance with name: "+insurance.getName()+" already exists!");
        }
        BeanUtils.copyProperties(insurance,recoveredInsurance,"users");
        return recoveredInsurance;
    }

    private boolean insuranceNameExistsAndBelongsToAnotherExistingInstance(String insuranceName,Insurance recoveredInsurance) {
        return insuranceRepository.existsByNameIgnoreCase(insuranceName) && !insuranceName.equalsIgnoreCase(recoveredInsurance.getName());
    }

    @Transactional
    public Insurance removeInsurance(Long id) {
        Insurance insurance= getInsuranceById(id);
        insuranceRepository.delete(insurance);
        return insurance;
    }



}
