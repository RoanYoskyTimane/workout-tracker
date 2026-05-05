package com.roanyosky.workout_tracker.dtos;

import com.roanyosky.workout_tracker.entities.enums.CategoryType;
import com.roanyosky.workout_tracker.entities.enums.MuscleGroupType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateExerciseDto {
    @NotNull
    @Size(min = 2, max=100, message = "Name must be between 5 and 100 characters")
    private String name;

    @NotNull
    @Size(min = 2, max=100, message = "Description must be between 5 and 100 characters")
    private String description;

    @NotNull(message = "Category is required")
    private CategoryType category;

    @NotNull(message = "Muscle Group is required")
    private MuscleGroupType muscleGroup;
}
