import { type FC, useState } from 'react';
import {
  Plus, Search, Clock, AlertCircle, CheckCircle2, Loader2,
  ChevronRight, User, Tag, type LucideIcon
} from 'lucide-react';
import { tickets, customers, type Ticket, type TicketStatus } from '../data/mockData';

const statusConfig: Record<TicketStatus, { label: string; color: string; bg: string; icon: LucideIcon }> = {
  open:        { label: 'Open',        color: 'var(--danger)',  bg: 'var(--danger-soft)',   icon: AlertCircle },
  'in-progress':{ label: 'In Progress', color: 'var(--accent)',  bg: 'var(--accent-soft)',   icon: Loader2 },
  resolved:    { label: 'Resolved',    color: 'var(--success)', bg: 'var(--success-soft)',  icon: CheckCircle2 },
  closed:      { label: 'Closed',      color: 'var(--muted)',   bg: 'var(--surface-muted)', icon: CheckCircle2 },
};

const priorityConfig = {
  low:    { color: 'var(--muted)',   bg: 'var(--surface-muted)' },
  medium: { color: 'var(--warning)', bg: 'var(--warning-soft)' },
  high:   { color: 'var(--danger)',  bg: 'var(--danger-soft)' },
  urgent: { color: '#7c3aed',        bg: '#7c3aed18' },
};

const Support: FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [selected, setSelected] = useState<Ticket | null>(null);

  const filtered = tickets.filter(t => {
    const matchSearch =
      t.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openCount = tickets.filter(t => t.status === 'open').length;
  const inProgressCount = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  const customer = selected ? customers.find(c => c.id === selected.customerId) : null;

  return (
    <div className="p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Support</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Manage customer issues and tickets.</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
        >
          <Plus size={15} />
          New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Open',        value: openCount,       color: 'var(--danger)'  },
          { label: 'In Progress', value: inProgressCount, color: 'var(--accent)'  },
          { label: 'Resolved',    value: resolvedCount,   color: 'var(--success)' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: s.color }}
            />
            <p className="display font-semibold tabular-nums text-lg" style={{ color: 'var(--ink)' }}>{s.value}</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-5">
        {/* Ticket list */}
        <div className="space-y-3">
          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-52"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <Search size={14} style={{ color: 'var(--subtle)' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tickets..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: 'var(--ink)' }}
              />
            </div>
            <div
              className="flex items-center gap-1 p-1 rounded-xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {(['all', 'open', 'in-progress', 'resolved'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                  style={filterStatus === s ? { background: 'var(--accent)', color: '#fff' } : { color: 'var(--muted)' }}
                >
                  {s === 'all' ? 'All' : s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {filtered.map(t => {
              const st = statusConfig[t.status];
              const pr = priorityConfig[t.priority];
              const StatusIcon = st.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className="w-full text-left px-5 py-4 flex items-start gap-3 transition-all"
                  style={{
                    borderBottom: '1px solid var(--border)',
                    background: selected?.id === t.id ? 'var(--accent-soft)' : '',
                  }}
                  onMouseEnter={e => {
                    if (selected?.id !== t.id)
                      (e.currentTarget).style.background = 'var(--surface-muted)';
                  }}
                  onMouseLeave={e => {
                    if (selected?.id !== t.id)
                      (e.currentTarget).style.background = '';
                  }}
                >
                  <StatusIcon size={16} className="mt-0.5 flex-shrink-0" style={{ color: st.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-semibold mono text-xs"
                        style={{ color: 'var(--accent)' }}
                      >
                        #{t.ticketNumber}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: pr.bg, color: pr.color }}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <p className="text-sm font-medium mt-0.5 truncate" style={{ color: 'var(--ink)' }}>{t.subject}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--muted)' }}>
                        <User size={10} />{t.customerName}
                      </span>
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--subtle)' }}>
                        <Tag size={10} />{t.department}
                      </span>
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--subtle)' }}>
                        <Clock size={10} />{t.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                    <ChevronRight size={13} style={{ color: 'var(--subtle)' }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected ? (
          <div
            className="rounded-2xl p-5 h-fit sticky top-7"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  #{selected.ticketNumber}
                </span>
                <h3 className="font-semibold mt-0.5" style={{ color: 'var(--ink)' }}>{selected.subject}</h3>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0"
                style={{ background: statusConfig[selected.status].bg, color: statusConfig[selected.status].color }}
              >
                {statusConfig[selected.status].label}
              </span>
            </div>

            <div className="space-y-2.5 mb-4">
              {[
                { label: 'Customer', value: selected.customerName },
                { label: 'Department', value: selected.department },
                { label: 'Assigned To', value: selected.assignedTo },
                { label: 'Priority', value: selected.priority.charAt(0).toUpperCase() + selected.priority.slice(1) },
                { label: 'Opened', value: selected.createdAt },
                { label: 'Updated', value: selected.updatedAt },
                ...(selected.resolvedAt ? [{ label: 'Resolved', value: selected.resolvedAt }] : []),
              ].map(r => (
                <div key={r.label} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-xs" style={{ color: 'var(--subtle)' }}>{r.label}</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--ink)' }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-3 mb-4"
              style={{ background: 'var(--surface-muted)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--ink)' }}>Description</p>
              <p className="text-sm" style={{ color: 'var(--ink-2)' }}>{selected.description}</p>
            </div>

            {/* Customer context */}
            {customer && (
              <div
                className="rounded-xl p-3 mb-4"
                style={{ background: 'var(--accent-soft)', border: '1px solid rgba(26,86,219,0.2)' }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--accent)' }}>Customer Context</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Orders', value: String(customer.totalOrders) },
                    { label: 'LTV', value: `$${customer.ltv.toLocaleString()}` },
                    { label: 'Last Purchase', value: customer.lastPurchase },
                    { label: 'Risk', value: customer.churnRisk },
                  ].map(r => (
                    <div key={r.label}>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{r.label}</p>
                      <p className="text-xs font-semibold" style={{ color: 'var(--ink)' }}>{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center transition-all"
                style={{ background: 'var(--accent)', color: '#fff' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Update Status
              </button>
              <button
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'var(--surface-muted)', color: 'var(--ink-2)' }}
              >
                Reply
              </button>
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', minHeight: '300px' }}
          >
            <AlertCircle size={28} className="mb-3" style={{ color: 'var(--subtle)' }} />
            <p className="font-medium" style={{ color: 'var(--muted)' }}>Select a ticket</p>
            <p className="text-sm mt-1" style={{ color: 'var(--subtle)' }}>to view details and customer context</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
