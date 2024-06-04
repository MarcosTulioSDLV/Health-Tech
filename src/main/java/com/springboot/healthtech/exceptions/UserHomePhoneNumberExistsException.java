package com.springboot.healthtech.exceptions;

public class UserHomePhoneNumberExistsException extends RuntimeException{

    public UserHomePhoneNumberExistsException(){
    }

    public UserHomePhoneNumberExistsException(String message){
        super(message);
    }

}
