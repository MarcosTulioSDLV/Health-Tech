package com.springboot.healthtech.controllers;


import com.springboot.healthtech.dtos.InsuranceRequestDto;
import com.springboot.healthtech.models.Insurance;
import com.springboot.healthtech.services.InsuranceService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class InsuranceController {

    private final InsuranceService insuranceService;

    @Autowired
    public InsuranceController(InsuranceService insuranceService) {
        this.insuranceService = insuranceService;
    }


    @GetMapping(value = "/insurances")
    public ResponseEntity<Page<Insurance>> getInsurances(@PageableDefault(size = 5) Pageable pageable){
        Page<Insurance> insurancesPage= insuranceService.getInsurances(pageable);
        return ResponseEntity.ok(insurancesPage);
    }

    @GetMapping(value = "/insurances-by-id/{id}")
    public ResponseEntity<Insurance> getInsuranceById(@PathVariable Long id){
        Insurance insurance= insuranceService.getInsuranceById(id);
        return ResponseEntity.ok(insurance);
    }

    @GetMapping(value = "/insurances-by-name-containing/{name}")
    public ResponseEntity<Page<Insurance>> getInsuranceByNameContaining(@PathVariable String name,
                                                                        @PageableDefault(size = 5) Pageable pageable){
        Page<Insurance> insurancesPage= insuranceService.getInsuranceByNameContaining(name,pageable);
        return ResponseEntity.ok(insurancesPage);
    }

    @GetMapping(value = "/insurances-by-name/{name}")
    public ResponseEntity<Insurance> getInsuranceByName(@PathVariable String name){
        Insurance insurance= insuranceService.getInsuranceByName(name);
        return ResponseEntity.ok(insurance);
    }


    @PostMapping(value = "/insurances")
    public ResponseEntity<Insurance> addInsurance(@RequestBody @Valid InsuranceRequestDto insuranceRequestDto){
        Insurance insurance= new Insurance();
        BeanUtils.copyProperties(insuranceRequestDto,insurance);

        Insurance createdInsurance= insuranceService.addInsurance(insurance);
        return new ResponseEntity<>(createdInsurance, HttpStatus.CREATED);
    }


    @PutMapping(value = "/insurances/{id}")
    public ResponseEntity<Insurance> updateInsurance(@PathVariable Long id,
                                                     @RequestBody @Valid InsuranceRequestDto insuranceRequestDto){
        Insurance insurance= new Insurance();
        BeanUtils.copyProperties(insuranceRequestDto,insurance);
        insurance.setId(id);

        Insurance updatedInsurance= insuranceService.updateInsurance(insurance);
        return ResponseEntity.ok(updatedInsurance);
    }

    @DeleteMapping(value = "/insurances/{id}")
    public ResponseEntity<Insurance> removeInsurance(@PathVariable Long id){
        Insurance insurance= insuranceService.removeInsurance(id);
        return ResponseEntity.ok(insurance);
    }


}
