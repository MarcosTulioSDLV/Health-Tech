package com.springboot.healthtech.exceptions;

public class InsuranceNameExistsException extends RuntimeException{

    public InsuranceNameExistsException(){
    }

    public InsuranceNameExistsException(String message){
        super(message);
    }

}
