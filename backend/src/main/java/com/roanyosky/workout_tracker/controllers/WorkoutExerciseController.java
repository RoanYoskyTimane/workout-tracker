package com.roanyosky.workout_tracker.controllers;

import com.roanyosky.workout_tracker.dtos.CreateWorkoutExerciseDto;
import com.roanyosky.workout_tracker.dtos.WorkoutExerciseDto;
import com.roanyosky.workout_tracker.services.WorkoutExerciseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/workouts-exercises")
public class WorkoutExerciseController {
    private WorkoutExerciseService workoutExerciseService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<WorkoutExerciseDto> createWorkoutExercise(@RequestBody CreateWorkoutExerciseDto createWorkoutExerciseDto) {
        WorkoutExerciseDto workoutExerciseDto = workoutExerciseService.create(createWorkoutExerciseDto);

        return ResponseEntity.ok(workoutExerciseDto);
    }
}
