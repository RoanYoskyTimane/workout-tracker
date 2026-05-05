package com.roanyosky.workout_tracker.mappers;

import com.roanyosky.workout_tracker.dtos.CreateUserDto;
import com.roanyosky.workout_tracker.dtos.UpdateUserDto;
import com.roanyosky.workout_tracker.dtos.UserDto;
import com.roanyosky.workout_tracker.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);

    User toEntity(CreateUserDto createUserDto);

    void update(UpdateUserDto updateUserDto, @MappingTarget User user);
}
