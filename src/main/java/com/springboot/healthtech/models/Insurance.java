package com.springboot.healthtech.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TB_INSURANCE")
@AllArgsConstructor
@Getter @Setter @ToString(exclude = "users")
@EqualsAndHashCode
public class Insurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "insurance",cascade = CascadeType.REMOVE)
    private List<User> users= new ArrayList<>();

    public Insurance(){
    }

}
