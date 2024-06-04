package com.springboot.healthtech.infra;

import com.springboot.healthtech.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    //For Insurance Class
    //----------
    @ExceptionHandler(InsuranceNotFoundException.class)
    public ResponseEntity<String> handleInsuranceNotFoundException(InsuranceNotFoundException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InsuranceNameExistsException.class)
    public ResponseEntity<String> handleInsuranceNameExistsException(InsuranceNameExistsException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InsuranceNameNotFoundException.class)
    public ResponseEntity<String> handleInsuranceNameNotFoundException(InsuranceNameNotFoundException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }

    //----------

    //For User Class
    //----------
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> HandleUserNotFoundException(UserNotFoundException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserCpfExistsException.class)
    public ResponseEntity<String> handleUserCpfExistsException(UserCpfExistsException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserPhoneNumbersNullException.class)
    public ResponseEntity<String> handleUserPhoneNumbersNullException(UserPhoneNumbersNullException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserCellPhoneNumberExistsException.class)
    public ResponseEntity<String> handleUserCellPhoneNumberExistsException(UserCellPhoneNumberExistsException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserHomePhoneNumberExistsException.class)
    public ResponseEntity<String> handleUserHomePhoneNumberExistsException(UserHomePhoneNumberExistsException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserEmailExistsException.class)
    public ResponseEntity<String> handleUserEmailExistsException(UserEmailExistsException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserInsuranceCardNumberExistsException.class)
    public ResponseEntity<String> handleUserInsuranceCardNumber(UserInsuranceCardNumberExistsException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }
    //----------


}
