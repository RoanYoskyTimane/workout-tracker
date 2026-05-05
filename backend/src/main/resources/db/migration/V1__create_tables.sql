-- Ensure the UUID extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL
);

CREATE TABLE exercises (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           name VARCHAR(100) NOT NULL,
                           description VARCHAR(255),
                           category VARCHAR(50) CHECK (category IN ('cardio', 'strength', 'flexibility')),
                           muscle_group VARCHAR(50) CHECK (muscle_group IN ('chest', 'back', 'legs', 'shoulders', 'arms', 'core'))
);

CREATE TABLE workouts (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                          name VARCHAR(255) NOT NULL,
                          scheduled_date TIMESTAMP NOT NULL,
                          comments TEXT,
                          status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'done'))
);

CREATE TABLE workout_exercise (
                                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
                                  exercise_id UUID NOT NULL REFERENCES exercises(id),
                                  sets INTEGER,
                                  repetitions INTEGER,
                                  weights DECIMAL(5,2) -- Using decimal for weights (e.g., 22.5 kg)
);