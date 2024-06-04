package com.springboot.healthtech.exceptions;

public class UserEmailExistsException extends RuntimeException{

    public UserEmailExistsException(){
    }

    public UserEmailExistsException(String message){
        super(message);
    }

}
