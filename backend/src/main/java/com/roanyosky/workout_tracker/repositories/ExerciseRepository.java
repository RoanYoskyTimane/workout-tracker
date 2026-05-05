package com.roanyosky.workout_tracker.repositories;

import com.roanyosky.workout_tracker.entities.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {
    Exercise findByName(String name);
}
