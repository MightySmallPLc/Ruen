import { type FC, useState } from 'react';
import {
  Users, Shield, Bell, Globe, CreditCard, Key,
  ChevronRight, Check, Plus, Trash2, UserCog,
  type LucideIcon
} from 'lucide-react';

type SettingsTab = 'team' | 'roles' | 'security' | 'notifications' | 'billing' | 'integrations';

const teamMembers = [
  { id: 'm1', name: 'Alex Laurent', email: 'alex@ruen.io', role: 'Admin', status: 'active', avatar: 'AL' },
  { id: 'm2', name: 'Marcus Levy', email: 'marcus@ruen.io', role: 'Sales Rep', status: 'active', avatar: 'ML' },
  { id: 'm3', name: 'Sofia Reyes', email: 'sofia@ruen.io', role: 'Sales Rep', status: 'active', avatar: 'SR' },
  { id: 'm4', name: 'Omar Hassan', email: 'omar@ruen.io', role: 'Support Agent', status: 'active', avatar: 'OH' },
  { id: 'm5', name: 'Lena Schmidt', email: 'lena@ruen.io', role: 'Support Agent', status: 'active', avatar: 'LS' },
  { id: 'm6', name: 'Aisha Diallo', email: 'aisha@ruen.io', role: 'Billing', status: 'active', avatar: 'AD' },
];

const roles = [
  { name: 'Admin', count: 1, permissions: ['Full access', 'Manage team', 'View payments', 'Edit customers', 'View analytics'], color: 'var(--accent)' },
  { name: 'Sales Rep', count: 2, permissions: ['View customers', 'Manage deals', 'View pipeline', 'Add notes'], color: 'var(--success)' },
  { name: 'Support Agent', count: 2, permissions: ['View customers', 'Manage tickets', 'Add notes'], color: 'var(--warning)' },
  { name: 'Billing', count: 1, permissions: ['View payments', 'Process refunds', 'View invoices'], color: '#a855f7' },
  { name: 'Viewer', count: 0, permissions: ['Read-only access to dashboard', 'View customers'], color: 'var(--muted)' },
];

const auditLog = [
  { id: 'log1', user: 'Alex Laurent', action: 'Updated deal "Enterprise Expansion"', time: '2026-10-07 14:22', type: 'edit' },
  { id: 'log2', user: 'Omar Hassan', action: 'Resolved ticket RU-4821', time: '2026-10-07 11:05', type: 'resolve' },
  { id: 'log3', user: 'Sofia Reyes', action: 'Created deal "Annual Pro Plan — FinWave"', time: '2026-09-20 09:30', type: 'create' },
  { id: 'log4', user: 'Aisha Diallo', action: 'Processed refund $49 for Elena Vasquez', time: '2026-08-22 16:14', type: 'payment' },
  { id: 'log5', user: 'Alex Laurent', action: 'Added team member Lena Schmidt', time: '2026-08-15 10:02', type: 'user' },
];

const Avatar: FC<{ initials: string }> = ({ initials }) => (
  <div
    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
  >
    {initials}
  </div>
);

const Settings: FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('team');

  const tabs: { id: SettingsTab; label: string; icon: LucideIcon }[] = [
    { id: 'team', label: 'Team', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Globe },
  ];

  return (
    <div className="p-7 space-y-5">
      <div>
        <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Manage your team, access controls, and workspace preferences.
        </p>
      </div>

      <div className="flex gap-5">
        {/* Sidebar tabs */}
        <div
          className="w-52 flex-shrink-0 rounded-2xl p-2 space-y-0.5 h-fit sticky top-7"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
              style={
                activeTab === t.id
                  ? { background: 'var(--accent-soft)', color: 'var(--accent)' }
                  : { color: 'var(--muted)' }
              }
              onMouseEnter={e => {
                if (activeTab !== t.id)
                  (e.currentTarget).style.background = 'var(--surface-muted)';
              }}
              onMouseLeave={e => {
                if (activeTab !== t.id)
                  (e.currentTarget).style.background = '';
              }}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {activeTab === 'team' && (
            <>
              <div className="flex items-center justify-between">
                <p className="font-semibold" style={{ color: 'var(--ink)' }}>Team Members ({teamMembers.length})</p>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  <Plus size={13} />
                  Invite Member
                </button>
              </div>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {teamMembers.map(m => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 px-5 py-3.5"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <Avatar initials={m.avatar} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{m.name}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{m.email}</p>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                    >
                      {m.role}
                    </span>
                    <div className="flex items-center gap-2 ml-2">
                      <button style={{ color: 'var(--muted)' }}><UserCog size={14} /></button>
                      <button style={{ color: 'var(--danger)' }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'roles' && (
            <>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>Roles & Permissions</p>
              <div className="space-y-3">
                {roles.map(r => (
                  <div
                    key={r.name}
                    className="rounded-2xl p-5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                        <span className="font-semibold" style={{ color: 'var(--ink)' }}>{r.name}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${r.color}18`, color: r.color }}
                        >
                          {r.count} member{r.count !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <button
                        className="text-xs flex items-center gap-1"
                        style={{ color: 'var(--accent)' }}
                      >
                        Edit <ChevronRight size={11} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {r.permissions.map(p => (
                        <span
                          key={p}
                          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                          style={{ background: 'var(--surface-muted)', color: 'var(--ink-2)' }}
                        >
                          <Check size={9} style={{ color: 'var(--success)' }} />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>Security</p>

              {/* Security settings */}
              <div
                className="rounded-2xl p-5 space-y-4"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {[
                  { label: 'Two-Factor Authentication', sub: 'Require 2FA for all team members', enabled: true },
                  { label: 'Session Timeout', sub: 'Auto-logout after 30 minutes of inactivity', enabled: true },
                  { label: 'IP Allowlisting', sub: 'Restrict access to approved IP ranges', enabled: false },
                  { label: 'Payment Authorization', sub: 'Require dual approval for payments above $1,000', enabled: true },
                ].map(s => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{s.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{s.sub}</p>
                    </div>
                    <div
                      className="w-10 h-5.5 rounded-full relative cursor-pointer flex items-center transition-all"
                      style={{
                        background: s.enabled ? 'var(--success)' : 'var(--surface-muted)',
                        border: '1px solid var(--border)',
                        padding: '2px',
                        height: '22px', width: '42px',
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full bg-white transition-all"
                        style={{ transform: s.enabled ? 'translateX(20px)' : 'translateX(0)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Audit log */}
              <div>
                <p className="font-semibold mb-3" style={{ color: 'var(--ink)' }}>Audit Log</p>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  {auditLog.map(log => (
                    <div
                      key={log.id}
                      className="flex items-center gap-3 px-5 py-3 text-sm"
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background:
                            log.type === 'edit' ? 'var(--accent)'
                            : log.type === 'resolve' ? 'var(--success)'
                            : log.type === 'payment' ? 'var(--warning)'
                            : 'var(--muted)'
                        }}
                      />
                      <span className="font-medium flex-shrink-0" style={{ color: 'var(--ink-2)' }}>{log.user}</span>
                      <span className="flex-1 truncate" style={{ color: 'var(--muted)' }}>{log.action}</span>
                      <span className="text-xs flex-shrink-0 mono" style={{ color: 'var(--subtle)' }}>{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>Notification Preferences</p>
              <div
                className="rounded-2xl p-5 space-y-4"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {[
                  { label: 'New support ticket', sub: 'Alert when a new ticket is created', enabled: true },
                  { label: 'Deal closed', sub: 'Notify team when a deal is closed won or lost', enabled: true },
                  { label: 'At-risk customer', sub: 'Alert when a customer is flagged as at-risk', enabled: true },
                  { label: 'Payment received', sub: 'Confirm when a payment is confirmed on-chain', enabled: true },
                  { label: 'Automation triggered', sub: 'Log when an automation runs', enabled: false },
                  { label: 'New customer joined', sub: 'Notify on each new customer registration', enabled: false },
                ].map(s => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{s.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{s.sub}</p>
                    </div>
                    <div
                      className="rounded-full relative cursor-pointer flex items-center transition-all"
                      style={{
                        background: s.enabled ? 'var(--success)' : 'var(--surface-muted)',
                        border: '1px solid var(--border)',
                        padding: '2px',
                        height: '22px', width: '42px',
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full bg-white transition-all"
                        style={{ transform: s.enabled ? 'translateX(20px)' : 'translateX(0)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {(activeTab === 'billing' || activeTab === 'integrations') && (
            <div
              className="rounded-2xl p-12 text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--accent-soft)' }}
              >
                {activeTab === 'billing'
                  ? <CreditCard size={20} style={{ color: 'var(--accent)' }} />
                  : <Globe size={20} style={{ color: 'var(--accent)' }} />}
              </div>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>
                {activeTab === 'billing' ? 'Billing & Plan' : 'Integrations'}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                {activeTab === 'billing'
                  ? 'Manage your Ruen subscription, invoices, and payment method.'
                  : 'Connect email, phone, CRM tools, and data sources.'}
              </p>
              <button
                className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {activeTab === 'billing' ? 'Manage Plan' : 'Browse Integrations'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
