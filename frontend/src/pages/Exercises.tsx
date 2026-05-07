import React, { useEffect, useState } from 'react';
import { Plus, Search, Dumbbell, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { exerciseApi } from '../lib/api';
import './Exercises.css';

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('strength');
  const [muscleGroup, setMuscleGroup] = useState('chest');
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const data = await exerciseApi.getAll();
      setExercises(data);
    } catch (err) {
      console.error('Failed to fetch exercises', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await exerciseApi.create({ name, description, category, muscleGroup });
      setShowCreateModal(false);
      setName('');
      setDescription('');
      fetchExercises();
    } catch (err) {
      alert('Failed to create exercise');
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredExercises = exercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="exercises-container">
      <div className="exercises-header">
        <div>
          <h1>Exercise Library</h1>
          <p className="text-muted">Browse and manage your exercises.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
          <Plus size={20} />
          Add Exercise
        </button>
      </div>

      <div className="glass search-bar">
        <Search size={20} className="text-muted" />
        <input 
          type="text" 
          placeholder="Search by name or muscle group..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="empty-state">Loading exercises...</div>
      ) : (
        <div className="exercises-grid">
          {filteredExercises.map((exercise, i) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass exercise-card"
            >
              <div className="exercise-card-header">
                <div className="exercise-icon-wrapper">
                  <Dumbbell size={20} color="var(--primary)" />
                </div>
                <span className="exercise-muscle-tag">
                  {exercise.muscleGroup}
                </span>
              </div>
              <h3 className="exercise-name">{exercise.name}</h3>
              <p className="exercise-description">{exercise.description}</p>
              <div className="exercise-meta">
                <Info size={14} />
                <span>Category: {exercise.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="modal-backdrop"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="auth-card modal-content"
            >
              <div className="modal-header">
                <h2>New Exercise</h2>
                <button onClick={() => setShowCreateModal(false)} className="close-btn"><X size={24} /></button>
              </div>

              <form onSubmit={handleCreate}>
                <div className="input-group">
                  <label>Exercise Name</label>
                  <div className="input-wrapper">
                    <input 
                      type="text" 
                      placeholder="e.g. Bench Press" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      className="name-input"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Description</label>
                  <div className="input-wrapper">
                    <textarea 
                      placeholder="Describe the movement..." 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      required 
                      className="textarea-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="input-group">
                    <label>Category</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="select-input"
                    >
                      <option value="strength">Strength</option>
                      <option value="cardio">Cardio</option>
                      <option value="flexibility">Flexibility</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Muscle Group</label>
                    <select 
                      value={muscleGroup} 
                      onChange={(e) => setMuscleGroup(e.target.value)}
                      className="select-input"
                    >
                      <option value="chest">Chest</option>
                      <option value="back">Back</option>
                      <option value="legs">Legs</option>
                      <option value="shoulders">Shoulders</option>
                      <option value="arms">Arms</option>
                      <option value="core">Core</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={createLoading}>
                  {createLoading ? 'Creating...' : 'Create Exercise'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Exercises;
