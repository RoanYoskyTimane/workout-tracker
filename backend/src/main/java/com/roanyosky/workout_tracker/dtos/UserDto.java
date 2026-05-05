package com.roanyosky.workout_tracker.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {
    private UUID id;
    private String email;
}
