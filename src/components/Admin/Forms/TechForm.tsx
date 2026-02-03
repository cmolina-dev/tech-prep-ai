
import { useState } from 'react';
import { TechOption } from '@/data/mockData';
import { createTechnology } from '@/app/actions';
import { Loader2 } from 'lucide-react';

interface TechFormProps {
  initialData?: TechOption & { category?: string };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TechForm({ initialData, onSuccess, onCancel }: TechFormProps) {
  const [formData, setFormData] = useState<Partial<TechOption & { category: string }>>(initialData || {
    id: '',
    name: '',
    icon: '⚡',
    category: 'frontend'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Since we don't have a specific updateTechnology action yet and ID is PK,
      // true update requires a new action. For now, we will treat this form as "Create" 
      // or "Upsert" if we modify the action. 
      // Given the constraints and time, I'll use createTechnology which does an INSERT.
      // If it's an edit of an existing ID, we might need to handle uniqueness error or use REPLACE INTO in DB.
      // Let's assume Create New for now.
      
      if (initialData) {
          alert("Edit not fully implemented for Techs yet (Backend limitation). Please Delete and Re-create.");
          setLoading(false);
          return;
      }

      await createTechnology(formData as TechOption & { category: string });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Failed to save technology');
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
          placeholder="e.g. react"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g. React.js"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
        <select
          value={formData.category}
          onChange={e => setFormData({...formData, category: e.target.value})}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-focus:border-transparent"
        >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="mobile">Mobile</option>
            <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Icon</label>
        <input 
          type="text" 
          value={formData.icon}
          onChange={e => setFormData({...formData, icon: e.target.value})}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="⚛️"
          required
        />
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
