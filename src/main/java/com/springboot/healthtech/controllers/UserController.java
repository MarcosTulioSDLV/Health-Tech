package com.springboot.healthtech.controllers;

import com.springboot.healthtech.dtos.InsuranceRequestDto;
import com.springboot.healthtech.dtos.UserRequestDto;
import com.springboot.healthtech.models.Insurance;
import com.springboot.healthtech.models.User;
import com.springboot.healthtech.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(value = "/users")
    public ResponseEntity<Page<User>> getUsers(@PageableDefault(size = 5) Pageable pageable){
        Page<User> usersPage= userService.getUsers(pageable);
        return ResponseEntity.ok(usersPage);
    }

    @GetMapping(value = "/users-by-id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user= userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping(value ="/users-by-first-name-containing/{firstName}")
    public ResponseEntity<Page<User>> getUsersByFirstNameContaining(@PathVariable String firstName,
                                                                    @PageableDefault(size = 5) Pageable pageable){
        Page<User> usersPage= userService.getUsersByFirstNameContaining(firstName,pageable);
        return ResponseEntity.ok(usersPage);
    }


    @PostMapping(value = "/users/{insuranceId}")
    public ResponseEntity<User> addUser(@PathVariable Long insuranceId,
                                        @RequestBody @Valid UserRequestDto userRequestDto){
        User user= new User();
        BeanUtils.copyProperties(userRequestDto,user);

        User createdUser= userService.addUser(insuranceId,user);
        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
    }

    @PutMapping(value = "/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @RequestBody @Valid UserRequestDto userRequestDto){
        User user= new User();
        BeanUtils.copyProperties(userRequestDto,user);
        user.setId(id);

        User updatedUser= userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<User> removeUser(@PathVariable Long id){
        User removedUser= userService.removeUser(id);
        return ResponseEntity.ok(removedUser);
    }


}
