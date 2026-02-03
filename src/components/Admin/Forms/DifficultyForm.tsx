
import { useState } from 'react';
import { DifficultyOption } from '@/data/mockData';
import { createDifficulty } from '@/app/actions';
import { Loader2 } from 'lucide-react';

interface DifficultyFormProps {
  initialData?: DifficultyOption;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function DifficultyForm({ initialData, onSuccess, onCancel }: DifficultyFormProps) {
  const [formData, setFormData] = useState<Partial<DifficultyOption>>(initialData || {
    id: '',
    title: '',
    description: '',
    color: '#3b82f6'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
          alert("Edit not fully implemented for Difficulties yet. Please Delete and Re-create.");
          setLoading(false);
          return;
      }

      await createDifficulty(formData as DifficultyOption);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Failed to save difficulty');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">ID</label>
        <input 
          type="text" 
          value={formData.id}
          onChange={e => setFormData({...formData, id: e.target.value})}
          disabled={!!initialData}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          placeholder="e.g. expert"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
        <input 
          type="text" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g. Expert / Staff"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
        <input 
          type="text" 
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Description of the level..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Color (Hex)</label>
        <div className="flex gap-2">
            <input 
            type="color" 
            value={formData.color}
            onChange={e => setFormData({...formData, color: e.target.value})}
            className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
            />
            <input 
            type="text" 
            value={formData.color}
            onChange={e => setFormData({...formData, color: e.target.value})}
            className="flex-1 bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="#000000"
            required
            />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-700/50">
        <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
            Cancel
        </button>
        <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
        >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {initialData ? 'Update' : 'Create'}
        </button>
      </div>

    </form>
  );
}
