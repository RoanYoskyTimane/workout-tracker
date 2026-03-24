package com.roanyosky.workout_tracker.dtos;

import com.roanyosky.workout_tracker.entities.enums.Status;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Data
public class CreateWorkoutDto {

    @NotNull
    @Size(min=3, max=100, message = "Name must have between 3 to 100 characters")
    private String name;

    @NotNull
    private Status status;

    private List<CreateWorkoutExerciseDto> exercises;
}
