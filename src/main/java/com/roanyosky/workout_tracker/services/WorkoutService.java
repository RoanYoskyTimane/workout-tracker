package com.roanyosky.workout_tracker.services;

import com.roanyosky.workout_tracker.dtos.CreateWorkoutDto;
import com.roanyosky.workout_tracker.dtos.UpdateWorkoutDto;
import com.roanyosky.workout_tracker.dtos.WorkoutDto;

import com.roanyosky.workout_tracker.entities.User;
import com.roanyosky.workout_tracker.entities.Workout;
import com.roanyosky.workout_tracker.mappers.WorkoutMapper;
import com.roanyosky.workout_tracker.repositories.UserRepository;
import com.roanyosky.workout_tracker.repositories.WorkoutRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;
    private final WorkoutMapper workoutMapper;

    public List<WorkoutDto> allWorkouts(UUID authenticatedUserId){
        return workoutRepository.findAllByUserId(authenticatedUserId).stream().map(workoutMapper::toDto).toList();
    }

    public WorkoutDto createWorkout(UUID authenticatedUserId, CreateWorkoutDto createWorkoutDto){
        User user = userRepository.findById(authenticatedUserId).orElseThrow(()-> new EntityNotFoundException("User not found"));
        
        Workout workout = workoutMapper.toEntity(createWorkoutDto);
        workout.setUser(user);
        
        // Ensure back-references for exercises are set correctly
        if (workout.getExercises() != null) {
            workout.getExercises().forEach(exercise -> exercise.setWorkout(workout));
        }

        return workoutMapper.toDto(workoutRepository.save(workout));
    }

    public WorkoutDto updateWorkoutName(UUID autheticatedUserId, String name, UpdateWorkoutDto updateWorkoutDto){
        Workout workout = workoutRepository.findByNameAndUserId(name, autheticatedUserId);
        if (workout == null) {
            throw new EntityNotFoundException("Workout not found with name: " + name);
        }

        workoutMapper.updateWorkout(updateWorkoutDto, workout);

        return workoutMapper.toDto(workoutRepository.save(workout));
    }

    public void deleteWorkoutName(UUID autheticatedUserId, String name){
        Workout workout = workoutRepository.findByNameAndUserId(name, autheticatedUserId);
        if (workout == null) {
            throw new EntityNotFoundException("Workout not found with name: " + name);
        }

        workoutRepository.delete(workout);
    }

}
