import { type FC } from 'react';
import {
  LayoutDashboard, Users, TrendingUp, HeadphonesIcon, Zap,
  BarChart2, CreditCard, Settings, ChevronRight, Bell, Search, Brain,
  type LucideIcon
} from 'lucide-react';

export type ActiveView =
  | 'dashboard' | 'customers' | 'customer-detail'
  | 'sales' | 'support' | 'automations'
  | 'ai' | 'analytics' | 'payments' | 'settings';

interface SidebarProps {
  active: ActiveView;
  onNavigate: (v: ActiveView) => void;
}

const navItems: { id: ActiveView; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard',   label: 'Dashboard',       icon: LayoutDashboard },
  { id: 'customers',   label: 'Customers',        icon: Users },
  { id: 'sales',       label: 'Sales',            icon: TrendingUp },
  { id: 'support',     label: 'Support',          icon: HeadphonesIcon },
  { id: 'automations', label: 'Automations',      icon: Zap },
  { id: 'ai',          label: 'AI Intelligence',  icon: Brain },
  { id: 'analytics',   label: 'Analytics',        icon: BarChart2 },
  { id: 'payments',    label: 'Payments',         icon: CreditCard },
];

const Sidebar: FC<SidebarProps> = ({ active, onNavigate }) => {
  const isActive = (id: ActiveView) =>
    id === active || (id === 'customers' && active === 'customer-detail');

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-60 flex flex-col z-30 sidebar-scroll overflow-y-auto"
      style={{ background: 'var(--sidebar)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-7">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--accent)' }}
        >
          <span className="display text-white font-bold text-sm">R</span>
        </div>
        <span className="display text-white font-semibold text-lg tracking-tight">Ruen</span>
      </div>

      {/* Search bar */}
      <div className="mx-4 mb-5">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <Search size={14} className="text-white/40 flex-shrink-0" />
          <span className="text-white/40 text-sm">Quick search...</span>
          <span
            className="ml-auto text-xs rounded px-1"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
          >⌘K</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
            style={
              isActive(id)
                ? { background: 'rgba(255,255,255,0.13)', color: '#fff' }
                : { color: 'rgba(255,255,255,0.58)' }
            }
            onMouseEnter={e => {
              if (!isActive(id)) {
                (e.currentTarget).style.background = 'rgba(255,255,255,0.07)';
                (e.currentTarget).style.color = '#fff';
              }
            }}
            onMouseLeave={e => {
              if (!isActive(id)) {
                (e.currentTarget).style.background = '';
                (e.currentTarget).style.color = 'rgba(255,255,255,0.58)';
              }
            }}
          >
            <Icon size={16} />
            <span>{label}</span>
            {isActive(id) && (
              <ChevronRight size={12} className="ml-auto opacity-60" />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <button
          onClick={() => onNavigate('settings')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
          style={
            active === 'settings'
              ? { background: 'rgba(255,255,255,0.13)', color: '#fff' }
              : { color: 'rgba(255,255,255,0.58)' }
          }
          onMouseEnter={e => {
            if (active !== 'settings') {
              (e.currentTarget).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget).style.color = '#fff';
            }
          }}
          onMouseLeave={e => {
            if (active !== 'settings') {
              (e.currentTarget).style.background = '';
              (e.currentTarget).style.color = 'rgba(255,255,255,0.58)';
            }
          }}
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>

        {/* User */}
        <div
          className="mt-2 flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            AL
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">Alex Laurent</p>
            <p className="text-white/40 text-xs truncate">Admin</p>
          </div>
          <Bell size={13} className="ml-auto text-white/30 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
