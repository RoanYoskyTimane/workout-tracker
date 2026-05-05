package com.roanyosky.workout_tracker.dtos;

import com.roanyosky.workout_tracker.entities.enums.Status;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class WorkoutDto {
    private UUID id;
    private UUID userId;
    private String name;
    private Instant scheduledDate;
    private Status status;
    private String comments;
    private java.util.List<WorkoutExerciseDto> exercises;
}
