package com.roanyosky.workout_tracker.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserDto {
    @Email(message="Email cannot be null")
    @NotNull
    private String email;

    @NotNull
    @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters.")
    private String password;
}
