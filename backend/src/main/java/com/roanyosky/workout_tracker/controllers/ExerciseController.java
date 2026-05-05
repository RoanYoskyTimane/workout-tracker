package com.roanyosky.workout_tracker.controllers;

import com.roanyosky.workout_tracker.dtos.CreateExerciseDto;
import com.roanyosky.workout_tracker.dtos.ExerciseDto;
import com.roanyosky.workout_tracker.dtos.UpdateExerciseDto;
import com.roanyosky.workout_tracker.services.ExerciseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping
    public List<ExerciseDto> getAllExercises(){
        return exerciseService.allExercises();
    }


    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ExerciseDto> createExercise(@RequestBody CreateExerciseDto createExerciseDto){
        ExerciseDto exerciseDto = exerciseService.createExercise(createExerciseDto);

        return ResponseEntity.ok(exerciseDto);
    }

    @PatchMapping("/{name}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ExerciseDto> updateExercise(@PathVariable String name,@RequestBody UpdateExerciseDto updateExerciseDto){
        ExerciseDto exerciseDto = exerciseService.updateExercise(name,updateExerciseDto);

        return ResponseEntity.ok(exerciseDto);
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteExercise(@PathVariable String name){
        exerciseService.deleteExercise(name);
        return ResponseEntity.accepted().build();
    }
}
