package com.springboot.healthtech.dtos;

import jakarta.validation.constraints.NotBlank;

public record InsuranceRequestDto(@NotBlank String name) {
}
