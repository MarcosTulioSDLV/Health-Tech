package com.springboot.healthtech.exceptions;

public class InsuranceNameNotFoundException extends RuntimeException{


    public InsuranceNameNotFoundException(){
    }

    public InsuranceNameNotFoundException(String message){
        super(message);
    }


}
