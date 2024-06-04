package com.springboot.healthtech.exceptions;

public class UserPhoneNumbersNullException extends RuntimeException{

    public UserPhoneNumbersNullException(){
    }

    public UserPhoneNumbersNullException(String message){
        super(message);
    }

}
