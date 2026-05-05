package com.roanyosky.workout_tracker.entities;

import com.roanyosky.workout_tracker.entities.enums.CategoryType;
import com.roanyosky.workout_tracker.entities.enums.MuscleGroupType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "exercises")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Size(max = 100)
    @NotNull
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Size(max = 255)
    @Column(name = "description")
    private String description;

    @Column(name = "category", length = 50)
    @Enumerated(EnumType.STRING)
    private CategoryType category;

    @Column(name = "muscle_group", length = 50)
    @Enumerated(EnumType.STRING)
    private MuscleGroupType muscleGroup;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkoutExercise> workoutExercises = new ArrayList<>();
}
