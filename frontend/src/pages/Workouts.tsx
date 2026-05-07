import React, { useEffect, useState } from 'react';
import { Plus, Activity, MessageSquare, X, ChevronRight, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { workoutApi, exerciseApi } from '../lib/api';
import './Workouts.css';

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState<string | null>(null);

  // Create Workout state
  const [workoutName, setWorkoutName] = useState('');
  const [workoutStatus, setWorkoutStatus] = useState('pending');
  const [workoutComments, setWorkoutComments] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  // Add Exercise state
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weights, setWeights] = useState(0);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [workoutsData, exercisesData] = await Promise.all([
        workoutApi.getAll(),
        exerciseApi.getAll()
      ]);
      setWorkouts(workoutsData);
      setExercises(exercisesData);
    } catch (err) {
      console.error('Failed to fetch workouts', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await workoutApi.create({ name: workoutName, status: workoutStatus, comments: workoutComments });
      setShowCreateModal(false);
      setWorkoutName('');
      setWorkoutComments('');
      fetchData();
    } catch (err) {
      alert('Failed to create workout');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddExerciseModal || !selectedExerciseId) return;
    
    setAddLoading(true);
    try {
      await workoutApi.addExercise({
        workoutId: showAddExerciseModal,
        exerciseId: selectedExerciseId,
        sets,
        repetitions: reps,
        weights
      });
      setShowAddExerciseModal(null);
      setSelectedExerciseId('');
      fetchData();
    } catch (err) {
      alert('Failed to add exercise');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="workouts-container">
      <div className="workouts-header">
        <div>
          <h1>Your Workouts</h1>
          <p className="text-muted">Track and manage your training sessions.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
          <Plus size={20} />
          Create Workout
        </button>
      </div>

      {loading ? (
        <div className="empty-state">Loading workouts...</div>
      ) : (
        <div className="workouts-grid">
          {workouts.length === 0 ? (
            <div className="glass empty-state" style={{ borderRadius: 'var(--radius-lg)', padding: '5rem' }}>
              <Activity size={48} className="text-muted" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p className="text-muted">You haven't created any workouts yet.</p>
            </div>
          ) : (
            workouts.map((workout, i) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass workout-card"
              >
                <div className="workout-card-header">
                  <div className="workout-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h2>{workout.name}</h2>
                      <span className={`workout-status-badge ${workout.status === 'active' ? 'status-active' : 'status-pending'}`}>
                        {workout.status}
                      </span>
                    </div>
                    <p className="workout-comments">
                      <MessageSquare size={16} /> {workout.comments || 'No comments'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowAddExerciseModal(workout.id)}
                    className="add-exercise-btn"
                  >
                    <Plus size={18} /> Add Exercise
                  </button>
                </div>

                <div className="exercises-section">
                  <h4 className="exercises-section-title">
                    Exercises ({workout.exercises?.length || 0})
                  </h4>
                  {workout.exercises && workout.exercises.length > 0 ? (
                    <div className="exercise-list">
                      {workout.exercises.map((we: any) => (
                        <div key={we.id} className="exercise-item">
                          <div className="exercise-item-info">
                            <Dumbbell size={18} color="var(--primary)" />
                            <div>
                              <p className="exercise-item-name">{we.exerciseName}</p>
                              <p className="exercise-item-details">
                                {we.sets} sets × {we.repetitions} reps @ {we.weights}kg
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-muted" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted" style={{ fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>No exercises added yet.</p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Create Workout Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="modal-overlay">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCreateModal(false)} className="modal-backdrop" />
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="auth-card modal-content">
                <div className="modal-header">
                  <h2>New Workout</h2>
                  <button onClick={() => setShowCreateModal(false)} className="close-btn"><X size={24} /></button>
                </div>
                <form onSubmit={handleCreateWorkout}>
                  <div className="input-group">
                    <label>Workout Name</label>
                    <input type="text" placeholder="e.g. Leg Day" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} required className="workout-form-input" />
                  </div>
                  <div className="input-group">
                    <label>Status</label>
                    <select value={workoutStatus} onChange={(e) => setWorkoutStatus(e.target.value)} className="workout-form-select">
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Comments</label>
                    <textarea placeholder="Any notes for this session?" value={workoutComments} onChange={(e) => setWorkoutComments(e.target.value)} className="workout-form-textarea" />
                  </div>
                  <button type="submit" className="btn-primary" disabled={createLoading}>
                    {createLoading ? 'Creating...' : 'Create Workout'}
                  </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Exercise Modal */}
      <AnimatePresence>
        {showAddExerciseModal && (
          <div className="modal-overlay">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddExerciseModal(null)} className="modal-backdrop" />
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="auth-card modal-content">
                <div className="modal-header">
                  <h2>Add Exercise</h2>
                  <button onClick={() => setShowAddExerciseModal(null)} className="close-btn"><X size={24} /></button>
                </div>
                <form onSubmit={handleAddExercise}>
                  <div className="input-group">
                    <label>Select Exercise</label>
                    <select value={selectedExerciseId} onChange={(e) => setSelectedExerciseId(e.target.value)} required className="workout-form-select">
                      <option value="">Choose an exercise...</option>
                      {exercises.map(ex => (
                        <option key={ex.id} value={ex.id}>{ex.name} ({ex.muscleGroup})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-grid-3">
                    <div className="input-group">
                      <label>Sets</label>
                      <input type="number" value={sets} onChange={(e) => setSets(parseInt(e.target.value))} required className="workout-form-input" />
                    </div>
                    <div className="input-group">
                      <label>Reps</label>
                      <input type="number" value={reps} onChange={(e) => setReps(parseInt(e.target.value))} required className="workout-form-input" />
                    </div>
                    <div className="input-group">
                      <label>Weight (kg)</label>
                      <input type="number" step="0.5" value={weights} onChange={(e) => setWeights(parseFloat(e.target.value))} required className="workout-form-input" />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary" disabled={addLoading || !selectedExerciseId}>
                    {addLoading ? 'Adding...' : 'Add to Workout'}
                  </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workouts;
