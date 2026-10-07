import { type FC } from 'react';
import {
  Users, UserCheck, AlertTriangle, Ticket, Clock,
  TrendingUp, DollarSign, RotateCcw, Star, ArrowUpRight, ArrowDownRight,
  type LucideIcon
} from 'lucide-react';
import {
  dashboardStats, revenueData, dealsByStage,
  segmentData, teamPerformance
} from '../data/mockData';

const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const fmtNum = (n: number) =>
  new Intl.NumberFormat('en-US').format(n);

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  trend?: 'up' | 'down';
  trendVal?: string;
  accent?: string;
}

const StatCard: FC<StatCardProps> = ({ icon: Icon, label, value, sub, trend, trendVal, accent }) => (
  <div
    className="rounded-2xl p-5 flex flex-col gap-3"
    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
  >
    <div className="flex items-start justify-between">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: accent ? `${accent}18` : 'var(--accent-soft)' }}
      >
        <Icon size={17} style={{ color: accent ?? 'var(--accent)' }} />
      </div>
      {trend && (
        <div
          className="flex items-center gap-1 text-xs font-medium tabular-nums px-2 py-0.5 rounded-full"
          style={
            trend === 'up'
              ? { background: 'var(--success-soft)', color: 'var(--success)' }
              : { background: 'var(--danger-soft)', color: 'var(--danger)' }
          }
        >
          {trend === 'up'
            ? <ArrowUpRight size={11} />
            : <ArrowDownRight size={11} />}
          {trendVal}
        </div>
      )}
    </div>
    <div>
      <p className="display text-2xl font-semibold tabular-nums" style={{ color: 'var(--ink)' }}>
        {value}
      </p>
      <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--muted)' }}>{label}</p>
      {sub && <p className="text-xs mt-1" style={{ color: 'var(--subtle)' }}>{sub}</p>}
    </div>
  </div>
);

// Minimal bar chart using pure CSS
const RevenueChart: FC = () => {
  const max = Math.max(...revenueData.map(d => d.revenue));
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-semibold" style={{ color: 'var(--ink)' }}>Monthly Revenue</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Last 6 months</p>
        </div>
        <div className="text-right">
          <p className="display font-semibold text-xl tabular-nums" style={{ color: 'var(--ink)' }}>
            {fmtUSD(dashboardStats.monthlyRevenue)}
          </p>
          <div className="flex items-center gap-1 justify-end text-xs" style={{ color: 'var(--success)' }}>
            <ArrowUpRight size={11} />
            <span>8.8% vs last month</span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-2 h-28">
        {revenueData.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
              <div
                className="w-full rounded-lg transition-all duration-300"
                style={{
                  height: `${(d.revenue / max) * 80}px`,
                  background: d.month === 'Oct' ? 'var(--accent)' : 'var(--accent-soft)',
                  minHeight: '6px',
                }}
              />
            </div>
            <span className="text-xs" style={{ color: 'var(--subtle)' }}>{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Pipeline bar
const PipelineChart: FC = () => {
  const total = dealsByStage.reduce((s, d) => s + d.value, 0);
  const stageColors = ['#8898aa', 'var(--warning)', 'var(--accent)', '#a855f7', 'var(--success)'];
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold" style={{ color: 'var(--ink)' }}>Sales Pipeline</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Total pipeline value</p>
        </div>
        <p className="display font-semibold text-xl tabular-nums" style={{ color: 'var(--ink)' }}>
          {fmtUSD(total)}
        </p>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden gap-px mb-4">
        {dealsByStage.map((d, i) => (
          <div
            key={d.stage}
            style={{ width: `${(d.value / total) * 100}%`, background: stageColors[i] }}
            title={`${d.stage}: ${fmtUSD(d.value)}`}
          />
        ))}
      </div>
      <div className="space-y-2">
        {dealsByStage.map((d, i) => (
          <div key={d.stage} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: stageColors[i] }} />
              <span className="text-sm" style={{ color: 'var(--muted)' }}>{d.stage}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm tabular-nums" style={{ color: 'var(--subtle)' }}>{d.count} deals</span>
              <span className="text-sm font-medium tabular-nums w-24 text-right" style={{ color: 'var(--ink)' }}>
                {fmtUSD(d.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Customer segments donut-style
const SegmentsCard: FC = () => {
  const total = segmentData.reduce((s, d) => s + d.count, 0);
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <p className="font-semibold mb-1" style={{ color: 'var(--ink)' }}>Customer Segments</p>
      <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Based on behavior</p>
      <div className="space-y-2.5">
        {segmentData.map(d => (
          <div key={d.label}>
            <div className="flex justify-between text-sm mb-1">
              <span style={{ color: 'var(--ink-2)' }}>{d.label}</span>
              <span className="tabular-nums font-medium" style={{ color: 'var(--ink)' }}>{fmtNum(d.count)}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-muted)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(d.count / total) * 100}%`, background: d.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Team perf table
const TeamCard: FC = () => (
  <div
    className="rounded-2xl p-5"
    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
  >
    <p className="font-semibold mb-1" style={{ color: 'var(--ink)' }}>Sales Team Performance</p>
    <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>This month</p>
    <div className="space-y-3">
      {teamPerformance.map(rep => {
        const pct = Math.round((rep.revenue / rep.quota) * 100);
        return (
          <div key={rep.rep}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium" style={{ color: 'var(--ink)' }}>{rep.rep}</span>
              <div className="flex items-center gap-3">
                <span className="tabular-nums text-xs" style={{ color: 'var(--muted)' }}>{rep.deals} deals</span>
                <span className="tabular-nums font-semibold" style={{ color: 'var(--ink)' }}>{fmtUSD(rep.revenue)}</span>
                <span
                  className="text-xs tabular-nums font-medium w-10 text-right"
                  style={{ color: pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--danger)' }}
                >
                  {pct}%
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-muted)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(pct, 100)}%`,
                  background: pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--danger)'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const Dashboard: FC = () => {
  const s = dashboardStats;
  return (
    <div className="p-7 space-y-6">
      {/* Header */}
      <div>
        <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Wednesday, October 7, 2026 — Your business at a glance.
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Customers" value={fmtNum(s.totalCustomers)} trend="up" trendVal="+48 today" />
        <StatCard icon={UserCheck} label="Active Customers" value={fmtNum(s.activeCustomers)} sub={`${Math.round(s.activeCustomers/s.totalCustomers*100)}% of total`} trend="up" trendVal="2.3%" accent="var(--success)" />
        <StatCard icon={AlertTriangle} label="At-Risk" value={fmtNum(s.atRiskCustomers)} sub="Need attention" trend="down" trendVal="14 new" accent="var(--danger)" />
        <StatCard icon={DollarSign} label="Monthly Revenue" value={fmtUSD(s.monthlyRevenue)} trend="up" trendVal="8.8%" />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Ticket} label="Open Tickets" value={s.openTickets} sub="2 urgent" accent="var(--warning)" />
        <StatCard icon={Clock} label="Pending Follow-Ups" value={s.pendingFollowUps} sub="Due this week" accent="var(--warning)" />
        <StatCard icon={TrendingUp} label="Active Deals" value={s.activeDeals} sub="Pipeline active" accent="var(--accent)" />
        <StatCard icon={RotateCcw} label="Churn Rate" value={`${s.churnRate}%`} sub="Last 30 days" trend="down" trendVal="0.3%" accent="var(--success)" />
      </div>

      {/* KPI strip */}
      <div
        className="rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-5"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        {([
          { label: 'Conversion Rate', value: `${s.conversionRate}%`, icon: TrendingUp },
          { label: 'Avg Response Time', value: s.avgResponseTime, icon: Clock },
          { label: 'Avg Resolution Time', value: s.avgResolutionTime, icon: Ticket },
          { label: 'CSAT Score', value: `${s.customerSatisfaction} / 5`, icon: Star },
        ] as { label: string; value: string; icon: LucideIcon }[]).map(k => (
          <div key={k.label} className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent-soft)' }}
            >
              <k.icon size={16} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className="display font-semibold tabular-nums" style={{ color: 'var(--ink)' }}>{k.value}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RevenueChart />
        <PipelineChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SegmentsCard />
        <TeamCard />
      </div>
    </div>
  );
};

export default Dashboard;
