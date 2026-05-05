package com.roanyosky.workout_tracker.dtos;

import com.roanyosky.workout_tracker.entities.enums.CategoryType;
import com.roanyosky.workout_tracker.entities.enums.MuscleGroupType;
import lombok.Data;

import java.util.UUID;

@Data
public class ExerciseDto {
    private UUID id;
    private String name;
    private String description;
    private CategoryType category;
    private MuscleGroupType muscleGroup;
}
