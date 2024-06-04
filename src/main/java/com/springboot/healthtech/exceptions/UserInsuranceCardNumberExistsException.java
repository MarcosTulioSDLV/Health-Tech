package com.springboot.healthtech.exceptions;

public class UserInsuranceCardNumberExistsException extends RuntimeException{

    public UserInsuranceCardNumberExistsException(){
    }

    public UserInsuranceCardNumberExistsException(String message){
        super(message);
    }

}
