package com.springboot.healthtech.exceptions;

public class InsuranceNotFoundException extends RuntimeException{

    public InsuranceNotFoundException(){
    }

    public InsuranceNotFoundException(String message){
        super(message);
    }

}
