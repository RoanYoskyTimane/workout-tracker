package com.roanyosky.workout_tracker.services;

import com.roanyosky.workout_tracker.dtos.CreateWorkoutExerciseDto;
import com.roanyosky.workout_tracker.dtos.WorkoutExerciseDto;
import com.roanyosky.workout_tracker.entities.Exercise;
import com.roanyosky.workout_tracker.entities.Workout;
import com.roanyosky.workout_tracker.entities.WorkoutExercise;
import com.roanyosky.workout_tracker.mappers.WorkoutExerciseMapper;
import com.roanyosky.workout_tracker.repositories.ExerciseRepository;
import com.roanyosky.workout_tracker.repositories.WorkoutExerciseRepository;
import com.roanyosky.workout_tracker.repositories.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutExerciseService {
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutExerciseMapper workoutExerciseMapper;
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;

    public WorkoutExerciseDto create(CreateWorkoutExerciseDto workoutExerciseDto) {
        Workout workout = workoutRepository.findById(workoutExerciseDto.getWorkoutId()).orElseThrow(() -> new RuntimeException("Workout not found"));
        Exercise exercise = exerciseRepository.findById(workoutExerciseDto.getExerciseId()).orElseThrow(() -> new RuntimeException("Exercise not found"));

        WorkoutExercise workoutExercise = workoutExerciseMapper.toEntity(workoutExerciseDto);
        workoutExercise.setExercise(exercise);
        workoutExercise.setWorkout(workout);

        workoutExerciseRepository.save(workoutExercise);
        return workoutExerciseMapper.toDto(workoutExercise);
    }
}
