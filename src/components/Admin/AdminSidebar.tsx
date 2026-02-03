
import { 
  GitFork, 
  Code, 
  BarChart, 
  Settings, 
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import Link from 'next/link';

interface AdminSidebarProps {
  activeView: string;
  onChangeView: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ 
  activeView, 
  onChangeView,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose
}: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'paths', label: 'Paths', icon: GitFork },
    { id: 'technologies', label: 'Technologies', icon: Code },
    { id: 'difficulties', label: 'Difficulties', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const sidebarBaseClasses = "bg-card border-r border-border flex flex-col h-full transition-all duration-300 ease-in-out relative z-40";
  const mobileClasses = isMobileOpen ? "fixed inset-y-0 left-0 w-64 shadow-2xl" : "fixed inset-y-0 left-[-100%]";
  const desktopClasses = `hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'}`;

  // Overlay for mobile
  const MobileOverlay = isMobileOpen ? (
    <div 
        className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
        onClick={onMobileClose}
    />
  ) : null;

  return (
    <>
      {MobileOverlay}

      <div className={`${sidebarBaseClasses} ${desktopClasses} md:relative ${isMobileOpen ? mobileClasses.replace('fixed', 'fixed flex') : ''}`}>
        
        {/* Mobile Close Button */}
        <button 
            onClick={onMobileClose}
            className="md:hidden absolute top-4 right-4 text-slate-400 hover:text-white"
        >
            <X size={24} />
        </button>

        {/* Header */}
        <div className={`p-6 border-b border-border flex items-center gap-3 h-[88px] ${isCollapsed ? 'justify-center p-4' : ''}`}>
        {/* Logo Icon - always visible */}
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
            T
        </div>

        {/* Text and Toggle - hidden when collapsed */}
        {!isCollapsed && (
            <div className="flex-1 min-w-0 transition-opacity duration-300 animate-in fade-in">
              <Link href="/">
                <h1 className="text-lg font-bold text-white leading-none truncate">TechPrepAI</h1>
                <span className="text-xs text-slate-500 truncate">Admin Dashboard</span>
              </Link>
            </div>
        )}
        </div>

        {/* Desktop Collapse Toggle (Absolute on border) */}
        <button 
            onClick={onToggleCollapse}
            className="hidden md:flex absolute -right-3 top-24 w-6 h-6 bg-card border border-border rounded-full items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors z-50 shadow-sm"
        >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                    onChangeView(item.id);
                    onMobileClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group relative ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} className="shrink-0" />
                
                {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-popover border border-border rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                        {item.label}
                    </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center gap-3 px-2 py-2 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-yellow-200 border-2 border-white/10 shrink-0" />
              
              {!isCollapsed && (
                  <div className="flex-1 min-w-0 animate-in fade-in">
                      <p className="text-sm font-medium text-white truncate">Carlos Admin</p>
                      <p className="text-xs text-slate-500 truncate">SUPERUSER</p>
                  </div>
              )}
              
              {!isCollapsed && (
                  <button className="text-slate-400 hover:text-white transition-colors">
                      <LogOut size={16} />
                  </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
