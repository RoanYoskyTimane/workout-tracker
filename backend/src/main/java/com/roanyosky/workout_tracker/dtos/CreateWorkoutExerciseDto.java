package com.roanyosky.workout_tracker.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class CreateWorkoutExerciseDto {
    @NotNull
    private UUID workoutId;
    @NotNull
    private UUID exerciseId;
    private Integer sets;
    private Integer repetitions;
    private BigDecimal weights;
}
