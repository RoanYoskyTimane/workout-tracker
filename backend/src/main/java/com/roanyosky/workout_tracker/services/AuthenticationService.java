package com.roanyosky.workout_tracker.services;

import com.roanyosky.workout_tracker.dtos.AuthenticationResponseDto;
import com.roanyosky.workout_tracker.dtos.CreateUserDto;
import com.roanyosky.workout_tracker.dtos.LoginDto;
import com.roanyosky.workout_tracker.dtos.UserDto;
import com.roanyosky.workout_tracker.entities.User;
import com.roanyosky.workout_tracker.mappers.UserMapper;
import com.roanyosky.workout_tracker.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponseDto register(CreateUserDto createUserDto){
        User user = userMapper.toEntity(createUserDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);
        UserDto userDto = userMapper.toDto(user);
        return AuthenticationResponseDto.builder()
                .token(jwtToken)
                .userDto(userDto)
                .build();
    }

    public AuthenticationResponseDto authenticate(LoginDto loginDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        User user = userRepository.findByEmail(loginDto.getEmail());

        String jwtToken = jwtService.generateToken(user);
        UserDto userDto = userMapper.toDto(user);

        return AuthenticationResponseDto.builder()
                .token(jwtToken)
                .userDto(userDto)
                .build();
    }
}
