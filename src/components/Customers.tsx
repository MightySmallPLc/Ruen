import { type FC, useState } from 'react';
import { Search, Filter, Plus, ChevronRight, ShieldAlert, UserCheck, UserX, Sparkles } from 'lucide-react';
import { customers, type CustomerStatus } from '../data/mockData';

interface CustomersProps {
  onSelectCustomer: (id: string) => void;
}

const statusConfig: Record<CustomerStatus, { label: string; color: string; bg: string }> = {
  active:   { label: 'Active',   color: 'var(--success)', bg: 'var(--success-soft)' },
  'at-risk':{ label: 'At Risk',  color: 'var(--danger)',  bg: 'var(--danger-soft)'  },
  inactive: { label: 'Inactive', color: 'var(--muted)',   bg: 'var(--surface-muted)'},
  new:      { label: 'New',      color: 'var(--warning)', bg: 'var(--warning-soft)' },
};

const riskConfig = {
  low:    { label: 'Low',    color: 'var(--success)' },
  medium: { label: 'Medium', color: 'var(--warning)' },
  high:   { label: 'High',   color: 'var(--danger)'  },
};

const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const Avatar: FC<{ initials: string; size?: number }> = ({ initials, size = 36 }) => (
  <div
    className="rounded-full flex items-center justify-center font-semibold flex-shrink-0"
    style={{
      width: size, height: size, fontSize: size * 0.35,
      background: 'var(--accent-soft)', color: 'var(--accent)',
    }}
  >
    {initials}
  </div>
);

const Customers: FC<CustomersProps> = ({ onSelectCustomer }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<CustomerStatus | 'all'>('all');

  const filtered = customers.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Customers</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {customers.length} of 4,821 total customers shown
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: 'var(--accent)', color: '#fff' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
        >
          <Plus size={15} />
          Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-52"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <Search size={15} style={{ color: 'var(--subtle)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: 'var(--ink)' }}
          />
        </div>
        <div
          className="flex items-center gap-1.5 p-1 rounded-xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {(['all', 'active', 'new', 'at-risk', 'inactive'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
              style={
                filterStatus === s
                  ? { background: 'var(--accent)', color: '#fff' }
                  : { color: 'var(--muted)' }
              }
            >
              {s === 'all' ? 'All' : s === 'at-risk' ? 'At Risk' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <Filter size={14} />
          Filters
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="grid grid-cols-[2fr,1.5fr,1fr,1fr,1fr,1fr,40px] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide"
          style={{ background: 'var(--surface-muted)', color: 'var(--subtle)', borderBottom: '1px solid var(--border)' }}
        >
          <span>Customer</span>
          <span>Company</span>
          <span>Status</span>
          <span>LTV</span>
          <span>Orders</span>
          <span>Churn Risk</span>
          <span />
        </div>

        {/* Rows */}
        {filtered.map(c => {
          const st = statusConfig[c.status];
          const rk = riskConfig[c.churnRisk];
          return (
            <button
              key={c.id}
              onClick={() => onSelectCustomer(c.id)}
              className="w-full grid grid-cols-[2fr,1.5fr,1fr,1fr,1fr,1fr,40px] gap-4 px-5 py-3.5 text-sm transition-all text-left"
              style={{ borderBottom: '1px solid var(--border)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-muted)')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
            >
              <div className="flex items-center gap-3">
                <Avatar initials={c.avatar} />
                <div className="min-w-0">
                  <p className="font-semibold truncate" style={{ color: 'var(--ink)' }}>{c.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{c.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="truncate" style={{ color: 'var(--ink-2)' }}>{c.company}</span>
              </div>
              <div className="flex items-center">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: st.bg, color: st.color }}
                >
                  {st.label}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium tabular-nums" style={{ color: 'var(--ink)' }}>{fmtUSD(c.ltv)}</span>
              </div>
              <div className="flex items-center">
                <span className="tabular-nums" style={{ color: 'var(--ink-2)' }}>{c.totalOrders}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {c.churnRisk === 'high' && <ShieldAlert size={13} style={{ color: rk.color }} />}
                {c.churnRisk === 'low' && <UserCheck size={13} style={{ color: rk.color }} />}
                {c.churnRisk === 'medium' && <UserX size={13} style={{ color: rk.color }} />}
                <span className="text-xs font-medium" style={{ color: rk.color }}>{rk.label}</span>
              </div>
              <div className="flex items-center justify-end">
                <ChevronRight size={15} style={{ color: 'var(--subtle)' }} />
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Sparkles size={28} className="mx-auto mb-3" style={{ color: 'var(--subtle)' }} />
            <p className="font-medium" style={{ color: 'var(--muted)' }}>No customers found</p>
            <p className="text-sm mt-1" style={{ color: 'var(--subtle)' }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
