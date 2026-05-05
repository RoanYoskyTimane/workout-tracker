package com.roanyosky.workout_tracker.controllers;

import com.roanyosky.workout_tracker.dtos.AuthenticationResponseDto;
import com.roanyosky.workout_tracker.dtos.CreateUserDto;
import com.roanyosky.workout_tracker.dtos.LoginDto;
import com.roanyosky.workout_tracker.services.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDto> registerUser(@RequestBody CreateUserDto createUserDto){
        AuthenticationResponseDto authenticationResponseDto = authenticationService.register(createUserDto);
        return ResponseEntity.ok(authenticationResponseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> login(@RequestBody LoginDto loginDto){
        AuthenticationResponseDto authenticationResponseDto = authenticationService.authenticate(loginDto);
        return ResponseEntity.ok(authenticationResponseDto);
    }
}
