package com.springboot.healthtech.services;

import com.springboot.healthtech.exceptions.*;
import com.springboot.healthtech.models.Insurance;
import com.springboot.healthtech.models.User;
import com.springboot.healthtech.repositories.InsuranceRepository;
import com.springboot.healthtech.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final InsuranceRepository insuranceRepository;

    @Autowired
    public UserService(UserRepository userRepository, InsuranceRepository insuranceRepository) {
        this.userRepository = userRepository;
        this.insuranceRepository = insuranceRepository;
    }


    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("User with id "+id+" not found!"));
    }

    public Page<User> getUsersByFirstNameContaining(String firstName,Pageable pageable) {
        return userRepository.findByFirstNameContainingIgnoreCase(firstName,pageable);
    }

    @Transactional
    public User addUser(Long insuranceId,User user) {
        Insurance insurance= insuranceRepository.findById(insuranceId).orElseThrow(()-> new InsuranceNotFoundException("Insurance with id: "+insuranceId+" not found!"));

        //Validate data (Does the attribute exist?)
        //---
        if(user.getCpf().equals(""))
            user.setCpf(null);
        if(user.getCpf()!=null && userRepository.existsByCpfIgnoreCase(user.getCpf())){
            throw new UserCpfExistsException("User Cpf: "+user.getCpf()+" already exists!");
        }

        if(userRepository.existsByEmailIgnoreCase(user.getEmail())){
            throw new UserEmailExistsException("User with Email: "+user.getEmail()+" already exists!");
        }

        if(user.getCellPhoneNumber().equals(""))
            user.setCellPhoneNumber(null);
        if(user.getHomePhoneNumber().equals(""))
            user.setHomePhoneNumber(null);
        if(user.getCellPhoneNumber()==null && user.getHomePhoneNumber()==null){
            throw new UserPhoneNumbersNullException("User Phone Numbers Null! You must add at least one Phone Number");
        }
        if(user.getCellPhoneNumber()!=null && userRepository.existsByCellPhoneNumberIgnoreCase(user.getCellPhoneNumber())){
            throw new UserCellPhoneNumberExistsException("User Cell Phone Number: "+user.getCellPhoneNumber()+" already exists!");
        }
        if(user.getHomePhoneNumber()!=null && userRepository.existsByHomePhoneNumberIgnoreCase(user.getHomePhoneNumber())){
            throw new UserHomePhoneNumberExistsException("User Home Phone Number: "+user.getHomePhoneNumber()+" already exists!");
        }

        if(userRepository.existsByInsuranceCardNumberIgnoreCase(user.getInsuranceCardNumber())){
            throw new UserInsuranceCardNumberExistsException("User Insurance Card Number: "+user.getInsuranceCardNumber()+" already exists!");
        }
        //---

        user.setInsurance(insurance);
        userRepository.save(user);
        return user;
    }

    @Transactional
    public User updateUser(User user) {
        User recoveredUser= getUserById(user.getId());

        //Validate data (Does the attribute exist and belong to another existing instance?)
        //---
        if(user.getCpf().equals(""))
            user.setCpf(null);
        if(user.getCpf()!=null && cpfExistsAndBelongsToAnotherExistingInstance(user.getCpf(),recoveredUser)){
            throw new UserCpfExistsException("User Cpf: "+user.getCpf()+" already exists!");
        }

        if(emailExistsAndBelongsToAnotherExistingInstance(user.getEmail(),recoveredUser)){
            throw new UserEmailExistsException("User with Email: "+user.getEmail()+" already exists!");
        }

        if(user.getCellPhoneNumber().equals(""))
            user.setCellPhoneNumber(null);
        if(user.getHomePhoneNumber().equals(""))
            user.setHomePhoneNumber(null);
        if(user.getCellPhoneNumber()==null && user.getHomePhoneNumber()==null){
            throw new UserPhoneNumbersNullException("User Phone Numbers Null! You must add at least one Phone Number");
        }
        if(user.getCellPhoneNumber()!=null && cellPhoneNumberExistsAndBelongsToAnotherExistingInstance(user.getCellPhoneNumber(),recoveredUser)){
            throw new UserCellPhoneNumberExistsException("User Cell Phone Number: "+user.getCellPhoneNumber()+" already exists!");
        }
        if(user.getHomePhoneNumber()!=null && homePhoneNumberExistsAndBelongsToAnotherExistingInstance(user.getHomePhoneNumber(),recoveredUser)){
            throw new UserHomePhoneNumberExistsException("User Home Phone Number: "+user.getHomePhoneNumber()+" already exists!");
        }

        if(insuranceCardNumberExistsAndBelongsToAnotherExistingInstance(user.getInsuranceCardNumber(),recoveredUser)){
            throw new UserInsuranceCardNumberExistsException("User Insurance Card Number: "+user.getInsuranceCardNumber()+" already exists!");
        }
        //---


        BeanUtils.copyProperties(user,recoveredUser,"insurance");
        return recoveredUser;
    }

    private boolean cpfExistsAndBelongsToAnotherExistingInstance(String cpf,User recoveredUser) {
        return userRepository.existsByCpfIgnoreCase(cpf) && !cpf.equalsIgnoreCase(recoveredUser.getCpf());
    }
    private boolean emailExistsAndBelongsToAnotherExistingInstance(String email,User recoveredUser) {
        return userRepository.existsByEmailIgnoreCase(email) && !email.equalsIgnoreCase(recoveredUser.getEmail());
    }
    private boolean cellPhoneNumberExistsAndBelongsToAnotherExistingInstance(String cellPhoneNumber,User recoveredUser) {
        return userRepository.existsByCellPhoneNumberIgnoreCase(cellPhoneNumber) && !cellPhoneNumber.equalsIgnoreCase(recoveredUser.getCellPhoneNumber());
    }
    private boolean homePhoneNumberExistsAndBelongsToAnotherExistingInstance(String homePhoneNumber,User recoveredUser) {
        return userRepository.existsByHomePhoneNumberIgnoreCase(homePhoneNumber) && !homePhoneNumber.equalsIgnoreCase(recoveredUser.getHomePhoneNumber());
    }
    private boolean insuranceCardNumberExistsAndBelongsToAnotherExistingInstance(String insuranceCardNumber,User recoveredUser) {
        return userRepository.existsByInsuranceCardNumberIgnoreCase(insuranceCardNumber) && !insuranceCardNumber.equalsIgnoreCase(recoveredUser.getInsuranceCardNumber());
    }


    @Transactional
    public User removeUser(Long id) {
        User user= getUserById(id);
        userRepository.delete(user);
        return user;
    }

}
