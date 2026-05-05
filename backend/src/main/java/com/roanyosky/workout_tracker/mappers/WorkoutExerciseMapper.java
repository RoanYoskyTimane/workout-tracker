package com.roanyosky.workout_tracker.mappers;

import com.roanyosky.workout_tracker.dtos.CreateWorkoutExerciseDto;
import com.roanyosky.workout_tracker.dtos.WorkoutExerciseDto;
import com.roanyosky.workout_tracker.entities.WorkoutExercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface WorkoutExerciseMapper {
    WorkoutExerciseDto toDto(WorkoutExercise workoutExercise);

    @Mapping(target = "exercise.id", source = "exerciseId")
    WorkoutExercise toEntity(CreateWorkoutExerciseDto createWorkoutExerciseDto);
}
