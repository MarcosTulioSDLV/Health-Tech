package com.springboot.healthtech.exceptions;

public class UserCpfExistsException extends RuntimeException{

    public UserCpfExistsException(){
    }
    public UserCpfExistsException(String message){
        super(message);
    }

}
