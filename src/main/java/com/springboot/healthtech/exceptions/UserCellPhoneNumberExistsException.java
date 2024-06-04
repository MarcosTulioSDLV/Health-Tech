package com.springboot.healthtech.exceptions;

public class UserCellPhoneNumberExistsException extends RuntimeException{

    public UserCellPhoneNumberExistsException(){
    }

    public UserCellPhoneNumberExistsException(String message){
        super(message);
    }

}
