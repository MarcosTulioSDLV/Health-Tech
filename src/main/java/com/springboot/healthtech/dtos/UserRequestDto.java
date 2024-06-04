package com.springboot.healthtech.dtos;

import com.springboot.healthtech.enums.GenderType;
import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public record UserRequestDto(@NotNull @Pattern(regexp="^$|[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}", message="The CPF must have the correct format or be an empty string.") String cpf,
                             @NotBlank String firstName,
                             @NotBlank String lastName,
                             @NotNull @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate birthday,
                             @NotNull GenderType gender,
                             @NotBlank @Email String email,
                             @NotNull @Pattern(regexp = "^$|^\\(\\d{2}\\) 9\\d{4}-\\d{4}$",message = "Invalid cell phone number, it must be a valid Brazilian cell phone number or be an empty string)") String cellPhoneNumber,
                             @NotNull @Pattern(regexp = "^$|^\\(\\d{2}\\) [2-8]\\d{3}-\\d{4}$",message = "Invalid home phone number, it must be a valid Brazilian home phone number or be an empty string)") String homePhoneNumber,
                             @NotBlank String insuranceCardNumber) {

}


