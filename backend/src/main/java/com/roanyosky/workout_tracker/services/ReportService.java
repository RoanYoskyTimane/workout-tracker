package com.roanyosky.workout_tracker.services;

import com.roanyosky.workout_tracker.entities.Workout;
import com.roanyosky.workout_tracker.repositories.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final WorkoutRepository workoutRepository;

    public Map<String, Object> generateUserReport(UUID userId) {
        List<Workout> workouts = workoutRepository.findAllByUserIdOrderByScheduledDateAsc(userId);
        
        long totalWorkouts = workouts.size();
        long completedWorkouts = workouts.stream()
                .filter(w -> "done".equalsIgnoreCase(String.valueOf(w.getStatus())))
                .count();
        long pendingWorkouts = totalWorkouts - completedWorkouts;

        Map<String, Object> report = new HashMap<>();
        report.put("userId", userId);
        report.put("totalWorkouts", totalWorkouts);
        report.put("completedWorkouts", completedWorkouts);
        report.put("pendingWorkouts", pendingWorkouts);
        report.put("workoutDetails", workouts.stream().map(w -> {
            Map<String, Object> detail = new HashMap<>();
            detail.put("name", w.getName());
            detail.put("status", w.getStatus());
            detail.put("date", w.getScheduledDate());
            return detail;
        }).toList());

        return report;
    }
}
