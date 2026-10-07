import { type FC, useState } from 'react';
import { Zap, Plus, ToggleLeft, ToggleRight, Play, ArrowRight, Clock, Activity } from 'lucide-react';
import { automations, type Automation } from '../data/mockData';


const AutomationCard: FC<{ automation: Automation; onToggle: (id: string) => void }> = ({ automation, onToggle }) => (
  <div
    className="rounded-2xl p-5 transition-all"
    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    onMouseEnter={e => (e.currentTarget).style.borderColor = 'var(--border-strong)'}
    onMouseLeave={e => (e.currentTarget).style.borderColor = 'var(--border)'}
  >
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: automation.active ? 'var(--accent-soft)' : 'var(--surface-muted)' }}
        >
          <Zap size={16} style={{ color: automation.active ? 'var(--accent)' : 'var(--subtle)' }} />
        </div>
        <div>
          <p className="font-semibold" style={{ color: 'var(--ink)' }}>{automation.name}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            {automation.runs.toLocaleString()} runs · Last run {automation.lastRun}
          </p>
        </div>
      </div>
      <button
        onClick={() => onToggle(automation.id)}
        className="flex-shrink-0 transition-all"
        style={{ color: automation.active ? 'var(--success)' : 'var(--muted)' }}
        aria-label={automation.active ? 'Disable automation' : 'Enable automation'}
      >
        {automation.active
          ? <ToggleRight size={26} />
          : <ToggleLeft size={26} />}
      </button>
    </div>

    {/* Flow diagram */}
    <div
      className="rounded-xl p-3.5 space-y-2"
      style={{ background: 'var(--surface-muted)' }}
    >
      <div className="flex items-center gap-2">
        <div
          className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          style={{ background: 'var(--warning-soft)', color: 'var(--warning)' }}
        >
          <Zap size={10} />
          Trigger
        </div>
        <span className="text-xs" style={{ color: 'var(--ink-2)' }}>{automation.trigger}</span>
      </div>
      <div className="flex items-center gap-1 pl-3">
        <ArrowRight size={12} style={{ color: 'var(--subtle)' }} />
      </div>
      <div className="flex items-center gap-2">
        <div
          className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
        >
          <Clock size={10} />
          Condition
        </div>
        <span className="text-xs" style={{ color: 'var(--ink-2)' }}>{automation.condition}</span>
      </div>
      <div className="flex items-center gap-1 pl-3">
        <ArrowRight size={12} style={{ color: 'var(--subtle)' }} />
      </div>
      <div className="flex items-center gap-2">
        <div
          className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          style={{ background: 'var(--success-soft)', color: 'var(--success)' }}
        >
          <Play size={10} />
          Action
        </div>
        <span className="text-xs" style={{ color: 'var(--ink-2)' }}>{automation.action}</span>
      </div>
    </div>

    <div className="flex items-center gap-2 mt-3">
      <span
        className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
        style={
          automation.active
            ? { background: 'var(--success-soft)', color: 'var(--success)' }
            : { background: 'var(--surface-muted)', color: 'var(--muted)' }
        }
      >
        <Activity size={9} />
        {automation.active ? 'Active' : 'Paused'}
      </span>
      <button
        className="ml-auto text-xs font-medium transition-all"
        style={{ color: 'var(--accent)' }}
      >
        Edit
      </button>
    </div>
  </div>
);

const Automations: FC = () => {
  const [list, setList] = useState(automations);

  const toggle = (id: string) => {
    setList(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const active = list.filter(a => a.active).length;
  const totalRuns = list.reduce((s, a) => s + a.runs, 0);

  return (
    <div className="p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Automations</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Trigger actions automatically based on customer behavior.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
        >
          <Plus size={15} />
          New Automation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Automations', value: `${active} / ${list.length}`, color: 'var(--success)' },
          { label: 'Total Runs (All Time)', value: totalRuns.toLocaleString(), color: 'var(--accent)' },
          { label: 'Runs This Month', value: '1,234', color: 'var(--warning)' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-2xl p-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="display font-semibold text-xl tabular-nums" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Builder CTA */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4"
        style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, #1347c1 100%)',
          color: '#fff',
        }}
      >
        <Zap size={24} className="flex-shrink-0 opacity-90" />
        <div className="flex-1">
          <p className="font-semibold">Build your own automation</p>
          <p className="text-sm opacity-80 mt-0.5">
            Combine any trigger, condition, and action to automate your customer workflows.
          </p>
        </div>
        <button
          className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold bg-white/20 hover:bg-white/30 transition-all"
        >
          Open Builder
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map(a => (
          <AutomationCard key={a.id} automation={a} onToggle={toggle} />
        ))}
      </div>
    </div>
  );
};

export default Automations;
