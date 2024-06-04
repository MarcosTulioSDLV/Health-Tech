package com.springboot.healthtech.models;

import com.springboot.healthtech.enums.GenderType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "TB_USER")
@AllArgsConstructor
@Getter @Setter @ToString
@EqualsAndHashCode
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,nullable = true)
    private String cpf;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = true)
    private String cellPhoneNumber;

    @Column(unique = true, nullable = true)
    private String homePhoneNumber;

    @Column(unique = true, nullable = false)
    private String insuranceCardNumber;

    @ManyToOne
    @JoinColumn(name = "insurance_id")
    private Insurance insurance;

    public User(){
    }

}
