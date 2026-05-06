import React, { useEffect, useState } from 'react';
import { Plus, Activity, MessageSquare, X, ChevronRight, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { workoutApi, exerciseApi } from '../lib/api';

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
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Your Workouts</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track and manage your training sessions.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
          <Plus size={20} />
          Create Workout
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>Loading workouts...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {workouts.length === 0 ? (
            <div className="glass" style={{ textAlign: 'center', padding: '5rem', borderRadius: 'var(--radius-lg)' }}>
              <Activity size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p style={{ color: 'var(--text-muted)' }}>You haven't created any workouts yet.</p>
            </div>
          ) : (
            workouts.map((workout, i) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass"
                style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{workout.name}</h2>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        textTransform: 'uppercase', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '100px', 
                        backgroundColor: workout.status === 'active' ? 'var(--success)' : 'var(--accent)',
                        color: 'white'
                      }}>
                        {workout.status}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MessageSquare size={16} /> {workout.comments || 'No comments'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowAddExerciseModal(workout.id)}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      backgroundColor: 'var(--primary)', 
                      color: 'white', 
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Plus size={18} /> Add Exercise
                  </button>
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Exercises ({workout.exercises?.length || 0})
                  </h4>
                  {workout.exercises && workout.exercises.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {workout.exercises.map((we: any) => (
                        <div key={we.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Dumbbell size={18} color="var(--primary)" />
                            <div>
                              <p style={{ fontWeight: 600 }}>{we.exerciseName}</p>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {we.sets} sets × {we.repetitions} reps @ {we.weights}kg
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={18} color="var(--text-muted)" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>No exercises added yet.</p>
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
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCreateModal(false)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="auth-card" style={{ position: 'relative', zIndex: 1001, maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>New Workout</h2>
                  <button onClick={() => setShowCreateModal(false)} style={{ background: 'transparent' }}><X size={24} /></button>
                </div>
                <form onSubmit={handleCreateWorkout}>
                  <div className="input-group">
                    <label>Workout Name</label>
                    <input type="text" placeholder="e.g. Leg Day" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} required className="auth-input" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E0E0E0' }} />
                  </div>
                  <div className="input-group">
                    <label>Status</label>
                    <select value={workoutStatus} onChange={(e) => setWorkoutStatus(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E0E0E0', background: 'white' }}>
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Comments</label>
                    <textarea placeholder="Any notes for this session?" value={workoutComments} onChange={(e) => setWorkoutComments(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E0E0E0', minHeight: '100px', fontFamily: 'inherit' }} />
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
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddExerciseModal(null)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="auth-card" style={{ position: 'relative', zIndex: 1001, maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Add Exercise</h2>
                  <button onClick={() => setShowAddExerciseModal(null)} style={{ background: 'transparent' }}><X size={24} /></button>
                </div>
                <form onSubmit={handleAddExercise}>
                  <div className="input-group">
                    <label>Select Exercise</label>
                    <select value={selectedExerciseId} onChange={(e) => setSelectedExerciseId(e.target.value)} required style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E0E0E0', background: 'white' }}>
                      <option value="">Choose an exercise...</option>
                      {exercises.map(ex => (
                        <option key={ex.id} value={ex.id}>{ex.name} ({ex.muscleGroup})</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="input-group">
                      <label>Sets</label>
                      <input type="number" value={sets} onChange={(e) => setSets(parseInt(e.target.value))} required style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E0E0E0' }} />
                    </div>
                    <div className="input-group">
                      <label>Reps</label>
                      <input type="number" value={reps} onChange={(e) => setReps(parseInt(e.target.value))} required style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E0E0E0' }} />
                    </div>
                    <div className="input-group">
                      <label>Weight (kg)</label>
                      <input type="number" step="0.5" value={weights} onChange={(e) => setWeights(parseFloat(e.target.value))} required style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E0E0E0' }} />
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
