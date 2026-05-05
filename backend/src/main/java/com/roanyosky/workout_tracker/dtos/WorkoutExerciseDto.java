package com.roanyosky.workout_tracker.dtos;

import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class WorkoutExerciseDto {
    private UUID id;
    private ExerciseDto exercise;
    private Integer sets;
    private Integer repetitions;
    private BigDecimal weights;
}
