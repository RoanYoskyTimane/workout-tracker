package com.roanyosky.workout_tracker.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserDto {
    @NotNull
    @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters.")
    private String password;
}
