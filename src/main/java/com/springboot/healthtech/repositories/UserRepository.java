package com.springboot.healthtech.repositories;

import com.springboot.healthtech.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {


    boolean existsByCpfIgnoreCase(String cpf);
    boolean existsByEmailIgnoreCase(String email);
    boolean existsByCellPhoneNumberIgnoreCase(String cellPhoneNumber);
    boolean existsByHomePhoneNumberIgnoreCase(String homePhoneNumber);
    boolean existsByInsuranceCardNumberIgnoreCase(String insuranceCardNumber);
    Page<User> findByFirstNameContainingIgnoreCase(String firstName,Pageable pageable);

}
