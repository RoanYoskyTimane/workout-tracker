package com.roanyosky.workout_tracker.controllers;

import com.roanyosky.workout_tracker.dtos.CreateWorkoutDto;
import com.roanyosky.workout_tracker.dtos.UpdateWorkoutDto;
import com.roanyosky.workout_tracker.dtos.WorkoutDto;
import com.roanyosky.workout_tracker.entities.User;
import com.roanyosky.workout_tracker.entities.Workout;
import com.roanyosky.workout_tracker.services.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/workouts")
public class WorkoutController {
    private final WorkoutService workoutService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<WorkoutDto> getAllWorkoutsForSpecificUser(@AuthenticationPrincipal User user){
        return workoutService.allWorkouts(user.getId());
    }

    @PostMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<WorkoutDto> createWorkout(@AuthenticationPrincipal User user,@RequestBody CreateWorkoutDto createWorkoutDto){
        WorkoutDto workoutDto = workoutService.createWorkout(user.getId(),createWorkoutDto);
        return ResponseEntity.ok(workoutDto);
    }

    @PatchMapping("/{name}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<WorkoutDto> updateWorkout(@AuthenticationPrincipal User user, @PathVariable String name, @RequestBody UpdateWorkoutDto updateWorkoutDto){
        WorkoutDto workoutDto = workoutService.updateWorkoutName(user.getId(), name,updateWorkoutDto);
        return ResponseEntity.ok(workoutDto);
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteWorkout(@AuthenticationPrincipal User user, @PathVariable String name){
        workoutService.deleteWorkoutName(user.getId(), name);
        return ResponseEntity.accepted().build();
    }
}
