package com.roanyosky.workout_tracker.mappers;

import com.roanyosky.workout_tracker.dtos.CreateWorkoutDto;
import com.roanyosky.workout_tracker.dtos.UpdateWorkoutDto;
import com.roanyosky.workout_tracker.dtos.WorkoutDto;
import com.roanyosky.workout_tracker.entities.Workout;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", 
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = WorkoutExerciseMapper.class)
public interface WorkoutMapper {
    @Mapping(target = "userId", source = "user.id")
    WorkoutDto toDto(Workout workout);

    @Mapping(target = "exercises", source = "exercises")
    Workout toEntity(CreateWorkoutDto createWorkoutDto);


    void updateWorkout(UpdateWorkoutDto updateWorkoutDto,@MappingTarget Workout workout);
}
