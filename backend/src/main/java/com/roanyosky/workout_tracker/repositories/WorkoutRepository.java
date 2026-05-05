package com.roanyosky.workout_tracker.repositories;

import com.roanyosky.workout_tracker.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<Workout, UUID> {
    Workout findByNameAndUserId(String name, UUID userId);
    List<Workout> findAllByUserIdOrderByScheduledDateAsc(UUID userId);
}
