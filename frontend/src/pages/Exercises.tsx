import React, { useEffect, useState } from 'react';
import { Plus, Search, Dumbbell, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { exerciseApi } from '../lib/api';

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
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Exercise Library</h1>
          <p style={{ color: 'var(--text-muted)' }}>Browse and manage your exercises.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
          <Plus size={20} />
          Add Exercise
        </button>
      </div>

      <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Search size={20} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search by name or muscle group..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', background: 'transparent', width: '100%', padding: '0.75rem', fontSize: '1rem' }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>Loading exercises...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredExercises.map((exercise, i) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass"
              style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: 'var(--radius-sm)', 
                  backgroundColor: 'rgba(129, 166, 198, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Dumbbell size={20} color="var(--primary)" />
                </div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '100px', 
                  backgroundColor: 'var(--accent)',
                  color: 'white'
                }}>
                  {exercise.muscleGroup}
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{exercise.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{exercise.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
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
          <div style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 1000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="auth-card"
              style={{ position: 'relative', zIndex: 1001, maxWidth: '500px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>New Exercise</h2>
                <button onClick={() => setShowCreateModal(false)} style={{ background: 'transparent' }}><X size={24} /></button>
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
                      style={{ paddingLeft: '1rem' }}
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
                      style={{ 
                        width: '100%', 
                        padding: '1rem', 
                        borderRadius: 'var(--radius-md)', 
                        border: '1px solid #E0E0E0',
                        minHeight: '100px',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label>Category</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        borderRadius: 'var(--radius-md)', 
                        border: '1px solid #E0E0E0',
                        background: 'white'
                      }}
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
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        borderRadius: 'var(--radius-md)', 
                        border: '1px solid #E0E0E0',
                        background: 'white'
                      }}
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
