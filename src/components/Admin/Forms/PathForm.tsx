
import { useState } from 'react';
import { InterviewPath } from '@/data/mockData';
import { createPath, updatePath } from '@/app/actions';
import { Loader2 } from 'lucide-react';

interface PathFormProps {
  initialData?: InterviewPath;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PathForm({ initialData, onSuccess, onCancel }: PathFormProps) {
  const [formData, setFormData] = useState<Partial<InterviewPath>>(initialData || {
    id: '',
    title: '',
    description: '',
    icon: '🚀',
    topics: []
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await updatePath(initialData.id, formData);
      } else {
        await createPath(formData as InterviewPath);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Failed to save path');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* ID Field - only editable if new */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">ID (Unique Slug)</label>
        <input 
          type="text" 
          value={formData.id}
          onChange={e => setFormData({...formData, id: e.target.value})}
          disabled={!!initialData}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          placeholder="e.g. frontend-react"
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
          placeholder="e.g. Frontend Development"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
        <textarea 
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          placeholder="Brief description of this career path..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Icon (Emoji)</label>
        <input 
          type="text" 
          value={formData.icon}
          onChange={e => setFormData({...formData, icon: e.target.value})}
          className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="🎨"
          required
        />
      </div>

      {/* Topics could be a multi-select here, simpler for now to assume handled elsewhere or comma separated string logic if improved later */}

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
            {initialData ? 'Update Path' : 'Create Path'}
        </button>
      </div>

    </form>
  );
}
