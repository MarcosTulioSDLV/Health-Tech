package com.springboot.healthtech.repositories;

import com.springboot.healthtech.models.Insurance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance,Long> {

    boolean existsByNameIgnoreCase(String name);
    Optional<Insurance> findByNameIgnoreCase(String name);
    Page<Insurance> findByNameContainingIgnoreCase(String name,Pageable pageable);

}
