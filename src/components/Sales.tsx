import { type FC, useState } from 'react';
import { Plus, DollarSign, TrendingUp, Target, ChevronDown } from 'lucide-react';
import { deals, type Deal, type DealStage } from '../data/mockData';

const stageConfig: Record<DealStage, { label: string; color: string; bg: string }> = {
  lead:          { label: 'Lead',          color: '#8898aa', bg: '#8898aa18' },
  qualified:     { label: 'Qualified',     color: 'var(--warning)', bg: 'var(--warning-soft)' },
  proposal:      { label: 'Proposal',      color: 'var(--accent)', bg: 'var(--accent-soft)' },
  negotiation:   { label: 'Negotiation',   color: '#a855f7', bg: '#a855f718' },
  'closed-won':  { label: 'Closed Won',    color: 'var(--success)', bg: 'var(--success-soft)' },
  'closed-lost': { label: 'Closed Lost',   color: 'var(--danger)', bg: 'var(--danger-soft)' },
};

const stages: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation', 'closed-won'];

const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const DealCard: FC<{ deal: Deal }> = ({ deal }) => {
  const cfg = stageConfig[deal.stage];
  return (
    <div
      className="rounded-xl p-3.5 cursor-pointer transition-all"
      style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)' }}
      onMouseEnter={e => {
        (e.currentTarget).style.borderColor = 'var(--border-strong)';
        (e.currentTarget).style.boxShadow = '0 2px 8px rgba(15,28,46,0.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget).style.borderColor = 'var(--border)';
        (e.currentTarget).style.boxShadow = '';
      }}
    >
      <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--ink)' }}>{deal.title}</p>
      <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{deal.customerName}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="display text-base font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
          {fmtUSD(deal.value)}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          {deal.probability}%
        </span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs" style={{ color: 'var(--subtle)' }}>Closes {deal.expectedClose}</span>
        <span className="text-xs" style={{ color: 'var(--subtle)' }}>{deal.assignedTo.split(' ')[0]}</span>
      </div>
      {/* Probability bar */}
      <div className="mt-2.5 h-1 rounded-full" style={{ background: 'var(--surface-muted)' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${deal.probability}%`, background: cfg.color }}
        />
      </div>
    </div>
  );
};

const Sales: FC = () => {
  const [view, setView] = useState<'pipeline' | 'list'>('pipeline');

  const totalPipeline = deals
    .filter(d => d.stage !== 'closed-lost')
    .reduce((s, d) => s + d.value * (d.probability / 100), 0);

  const closedWon = deals.filter(d => d.stage === 'closed-won').reduce((s, d) => s + d.value, 0);
  const activeDeals = deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage)).length;

  return (
    <div className="p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Sales Pipeline</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Track deals from lead to close.</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 p-1 rounded-xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {(['pipeline', 'list'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={view === v ? { background: 'var(--accent)', color: '#fff' } : { color: 'var(--muted)' }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
          >
            <Plus size={15} />
            New Deal
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Weighted Pipeline', value: fmtUSD(totalPipeline), icon: TrendingUp, color: 'var(--accent)' },
          { label: 'Closed Won (MTD)', value: fmtUSD(closedWon), icon: DollarSign, color: 'var(--success)' },
          { label: 'Active Deals', value: String(activeDeals), icon: Target, color: 'var(--warning)' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}18` }}
            >
              <s.icon size={17} style={{ color: s.color }} />
            </div>
            <div>
              <p className="display font-semibold tabular-nums" style={{ color: 'var(--ink)' }}>{s.value}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {view === 'pipeline' ? (
        /* Kanban */
        <div className="flex gap-4 overflow-x-auto pb-2">
          {stages.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage);
            const cfg = stageConfig[stage];
            const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
            return (
              <div key={stage} className="flex-shrink-0 w-64">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{cfg.label}</span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full tabular-nums font-medium"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {stageDeals.length}
                    </span>
                  </div>
                  <span className="text-xs tabular-nums font-medium" style={{ color: 'var(--muted)' }}>
                    {fmtUSD(stageTotal)}
                  </span>
                </div>
                <div className="space-y-2.5 min-h-24">
                  {stageDeals.map(d => <DealCard key={d.id} deal={d} />)}
                  <button
                    className="w-full py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
                    style={{ border: '1px dashed var(--border)', color: 'var(--subtle)' }}
                    onMouseEnter={e => {
                      (e.currentTarget).style.background = 'var(--surface)';
                      (e.currentTarget).style.color = 'var(--accent)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget).style.background = '';
                      (e.currentTarget).style.color = 'var(--subtle)';
                    }}
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List view */
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div
            className="grid grid-cols-[2fr,1.2fr,1fr,1fr,1fr,1fr] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide"
            style={{ background: 'var(--surface-muted)', color: 'var(--subtle)', borderBottom: '1px solid var(--border)' }}
          >
            <span className="flex items-center gap-1">Deal <ChevronDown size={10} /></span>
            <span>Stage</span>
            <span>Value</span>
            <span>Probability</span>
            <span>Closes</span>
            <span>Rep</span>
          </div>
          {deals.map(d => {
            const cfg = stageConfig[d.stage];
            return (
              <div
                key={d.id}
                className="grid grid-cols-[2fr,1.2fr,1fr,1fr,1fr,1fr] gap-4 px-5 py-3.5 text-sm transition-all"
                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget).style.background = 'var(--surface-muted)'}
                onMouseLeave={e => (e.currentTarget).style.background = ''}
              >
                <div className="min-w-0">
                  <p className="font-semibold truncate" style={{ color: 'var(--ink)' }}>{d.title}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{d.customerName}</p>
                </div>
                <div className="flex items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: cfg.bg, color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold tabular-nums" style={{ color: 'var(--ink)' }}>{fmtUSD(d.value)}</span>
                </div>
                <div className="flex items-center">
                  <span className="tabular-nums" style={{ color: 'var(--ink-2)' }}>{d.probability}%</span>
                </div>
                <div className="flex items-center">
                  <span style={{ color: 'var(--muted)' }}>{d.expectedClose}</span>
                </div>
                <div className="flex items-center">
                  <span style={{ color: 'var(--muted)' }}>{d.assignedTo.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sales;
