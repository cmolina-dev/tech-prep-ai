'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { InterviewPath, TechOption, DifficultyOption } from '@/data/mockData';
import { Plus } from 'lucide-react';
import { 
  deletePath, 
  deleteTechnology, 
  deleteDifficulty,
} from '@/app/actions';
import Modal from '@/components/Modal';
import PathForm from '@/components/Admin/Forms/PathForm';
import TechForm from '@/components/Admin/Forms/TechForm';
import DifficultyForm from '@/components/Admin/Forms/DifficultyForm';

interface SettingsDashboardProps {
  initialPaths: InterviewPath[];
  initialTechnologies: (TechOption & { category?: string })[];
  initialDifficulties: DifficultyOption[];
}

export default function SettingsDashboard({ 
  initialPaths, 
  initialTechnologies, 
  initialDifficulties 
}: SettingsDashboardProps) {
  const router = useRouter();
  const [activeView, setActiveView] = useState('paths');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null); // Polymorphic for now

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleCreate = () => {
    setEditingItem(null); // Clear for create mode
    setIsModalOpen(true);
  };

  const onFormSuccess = () => {
    closeModal();
    router.refresh();
  };
  
  // --- PATHS ACTIONS ---
  const handleEditPath = (path: InterviewPath) => {
    setEditingItem(path);
    setIsModalOpen(true);
  };

  const handleDeletePath = async (path: InterviewPath) => {
    if (confirm(`Delete ${path.title}?`)) {
        await deletePath(path.id);
        router.refresh();
    }
  };

  // --- TECHNOLOGIES ACTIONS ---
  const handleEditTech = (tech: any) => {
     // setEditingItem(tech);
     // setIsModalOpen(true);
     alert("Editing technologies via UI is not fully supported yet in this version. Please delete and recreate.");
  };

  const handleDeleteTech = async (tech: any) => {
    if (confirm(`Delete ${tech.name}?`)) {
        await deleteTechnology(tech.id);
        router.refresh();
    }
  };

    // --- DIFFICULTIES ACTIONS ---
  const handleEditDiff = (diff: DifficultyOption) => {
    // setEditingItem(diff);
    // setIsModalOpen(true);
    alert("Editing difficulties via UI is not fully supported yet in this version. Please delete and recreate.");
  };

  const handleDeleteDiff = async (diff: DifficultyOption) => {
     if (confirm(`Delete ${diff.title}?`)) {
        await deleteDifficulty(diff.id);
        router.refresh();
    }
  };


  // --- COLUMNS CONFIG ---
  const pathColumns: Column<InterviewPath>[] = [
    {
        key: 'info',
        header: 'Name',
        render: (path) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-xl shrink-0">
                    {path.icon || '📄'}
                </div>
                <div>
                    <div className="font-semibold text-white">{path.title}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{path.id}</div>
                </div>
            </div>
        )
    },
    {
        key: 'topics',
        header: 'Topics',
        render: (path) => (
             <div className="flex flex-wrap gap-1">
                {path.topics.slice(0, 2).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-slate-400 border border-white/5">
                        {t}
                    </span>
                ))}
                {path.topics.length > 2 && <span className="text-[10px] text-slate-500">+{path.topics.length - 2}</span>}
             </div>
        )
    }
  ];

  const techColumns: Column<any>[] = [
      {
          key: 'name',
          header: 'Technology',
          render: (tech) => (
              <div className="flex items-center gap-3">
                  <span className="text-xl">{tech.icon}</span>
                  <span className="font-semibold text-white">{tech.name}</span>
              </div>
          )
      },
      {
          key: 'category',
          header: 'Category',
          render: (tech) => (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 capitalize border border-blue-500/20">
                  {tech.category}
              </span>
          )
      }
  ];

  const diffColumns: Column<DifficultyOption>[] = [
      {
          key: 'title',
          header: 'Level',
          render: (diff) => (
              <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: diff.color }} />
                  <span className="font-semibold text-white">{diff.title}</span>
              </div>
          )
      },
      {
          key: 'description',
          header: 'Description',
          render: (diff) => <span className="text-slate-400 text-sm">{diff.description}</span>
      }
  ];


  return (
    <div className="fixed inset-0 flex bg-background text-foreground font-sans">
      <AdminSidebar 
        activeView={activeView} 
        onChangeView={(view) => {
            setActiveView(view);
            setIsMobileMenuOpen(false);
            setEditingItem(null); // Clear editing state on view change
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 overflow-auto bg-[#0B1120] w-full">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 text-white bg-white/10 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                            {activeView === 'paths' && 'Paths Management'}
                            {activeView === 'technologies' && 'Technologies Management'}
                            {activeView === 'difficulties' && 'Difficulties Management'}
                            {activeView === 'dashboard' && 'Admin Dashboard'}
                            {activeView === 'settings' && 'Platform Settings'}
                        </h1>
                        <p className="text-sm md:text-base text-slate-400">
                            {activeView === 'paths' && 'Create and organize learning paths.'}
                            {activeView === 'technologies' && 'Manage tech stack options.'}
                            {activeView === 'difficulties' && 'Configure difficulty levels.'}
                        </p>
                    </div>
                </div>
                {activeView !== 'dashboard' && activeView !== 'settings' && (
                    <button 
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
                        onClick={handleCreate}
                    >
                        <Plus size={18} />
                        <span>Create New</span>
                    </button>
                )}
            </div>

            {/* Content Switcher */}
            {activeView === 'paths' && (
                <DataTable 
                    columns={pathColumns} 
                    data={initialPaths} 
                    onEdit={handleEditPath} 
                    onDelete={handleDeletePath} 
                />
            )}

            {activeView === 'technologies' && (
                <DataTable 
                    columns={techColumns} 
                    data={initialTechnologies}
                    onEdit={handleEditTech} 
                    onDelete={handleDeleteTech} 
                />
            )}

            {activeView === 'difficulties' && (
                <DataTable 
                    columns={diffColumns} 
                    data={initialDifficulties}
                    onEdit={handleEditDiff} 
                    onDelete={handleDeleteDiff} 
                />
            )}

            {(activeView === 'dashboard' || activeView === 'settings') && (
                <div className="p-12 border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-slate-500 bg-white/[0.02]">
                    <div className="text-4xl mb-4 opacity-50">🚧</div>
                    <p>Dashboard analytics and Platform settings are coming soon.</p>
                </div>
            )}

        </div>
      </main>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
            editingItem 
                ? `Edit ${activeView === 'paths' ? 'Path' : activeView === 'technologies' ? 'Technology' : 'Difficulty'}`
                : `Create New ${activeView === 'paths' ? 'Path' : activeView === 'technologies' ? 'Technology' : 'Difficulty'}`
        }
      >
        {activeView === 'paths' && (
            <PathForm 
                initialData={editingItem}
                onSuccess={onFormSuccess}
                onCancel={closeModal}
            />
        )}
        {activeView === 'technologies' && (
            <TechForm 
                initialData={editingItem}
                onSuccess={onFormSuccess}
                onCancel={closeModal}
            />
        )}
        {activeView === 'difficulties' && (
            <DifficultyForm 
                initialData={editingItem}
                onSuccess={onFormSuccess}
                onCancel={closeModal}
            />
        )}
      </Modal>

    </div>
  );
}
