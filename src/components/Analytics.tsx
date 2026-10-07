import { type FC } from 'react';
import {
  TrendingUp, TrendingDown, Users, Ticket, Star, DollarSign, BarChart2,
  type LucideIcon
} from 'lucide-react';
import { revenueData, dealsByStage, segmentData, teamPerformance, dashboardStats } from '../data/mockData';

const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const SectionHeader: FC<{ title: string; sub: string; icon: LucideIcon }> = ({ title, sub, icon: Icon }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <Icon size={17} style={{ color: 'var(--accent)' }} />
    <div>
      <p className="font-semibold" style={{ color: 'var(--ink)' }}>{title}</p>
      <p className="text-xs" style={{ color: 'var(--muted)' }}>{sub}</p>
    </div>
  </div>
);

const Analytics: FC = () => {
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const totalPipeline = dealsByStage.reduce((s, d) => s + d.value, 0);
  const totalSegment = segmentData.reduce((s, d) => s + d.count, 0);
  const stageColors = ['#8898aa', 'var(--warning)', 'var(--accent)', '#a855f7', 'var(--success)'];

  return (
    <div className="p-7 space-y-5">
      {/* Header */}
      <div>
        <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Live performance dashboards across sales, support, and customers.
        </p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {([
          { label: 'Monthly Revenue', value: fmtUSD(dashboardStats.monthlyRevenue), trend: '+8.8%', up: true, icon: DollarSign },
          { label: 'Conversion Rate', value: `${dashboardStats.conversionRate}%`, trend: '+1.2%', up: true, icon: TrendingUp },
          { label: 'Churn Rate', value: `${dashboardStats.churnRate}%`, trend: '-0.3%', up: false, icon: TrendingDown },
          { label: 'CSAT Score', value: `${dashboardStats.customerSatisfaction}/5`, trend: '+0.1', up: true, icon: Star },
        ] as { label: string; value: string; trend: string; up: boolean; icon: LucideIcon }[]).map(k => (
          <div
            key={k.label}
            className="rounded-2xl p-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <k.icon size={15} style={{ color: 'var(--accent)' }} />
              <span
                className="text-xs font-medium tabular-nums"
                style={{ color: k.up ? 'var(--success)' : 'var(--danger)' }}
              >
                {k.trend}
              </span>
            </div>
            <p className="display font-semibold text-xl tabular-nums" style={{ color: 'var(--ink)' }}>{k.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue trend */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <SectionHeader title="Revenue Trend" sub="Last 6 months" icon={DollarSign} />
          <div className="flex items-end gap-2 h-36">
            {revenueData.map(d => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs tabular-nums font-medium" style={{ color: 'var(--muted)' }}>
                  {d.month === 'Oct' ? fmtUSD(d.revenue) : ''}
                </span>
                <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
                  <div
                    className="w-full rounded-lg"
                    style={{
                      height: `${(d.revenue / maxRevenue) * 100}px`,
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

        {/* Deal stages */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <SectionHeader title="Pipeline by Stage" sub="Current opportunities" icon={BarChart2} />
          <div className="space-y-2.5">
            {dealsByStage.map((d, i) => (
              <div key={d.stage}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'var(--ink-2)' }}>{d.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="tabular-nums text-xs" style={{ color: 'var(--muted)' }}>{d.count} deals</span>
                    <span className="tabular-nums font-semibold" style={{ color: 'var(--ink)' }}>{fmtUSD(d.value)}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--surface-muted)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(d.value / totalPipeline) * 100}%`, background: stageColors[i] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer segments */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <SectionHeader title="Customer Segments" sub="Behavioral grouping" icon={Users} />
          <div className="space-y-2.5">
            {segmentData.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
                    <span style={{ color: 'var(--ink-2)' }}>{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="tabular-nums text-xs" style={{ color: 'var(--muted)' }}>
                      {Math.round((s.count / totalSegment) * 100)}%
                    </span>
                    <span className="tabular-nums font-semibold" style={{ color: 'var(--ink)' }}>
                      {s.count.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--surface-muted)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(s.count / totalSegment) * 100}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support metrics */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <SectionHeader title="Support Performance" sub="Current period" icon={Ticket} />
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Open Tickets', value: dashboardStats.openTickets.toString(), color: 'var(--danger)' },
              { label: 'Avg Response', value: dashboardStats.avgResponseTime, color: 'var(--accent)' },
              { label: 'Avg Resolution', value: dashboardStats.avgResolutionTime, color: 'var(--warning)' },
              { label: 'CSAT', value: `${dashboardStats.customerSatisfaction} / 5`, color: 'var(--success)' },
            ].map(m => (
              <div
                key={m.label}
                className="rounded-xl p-3"
                style={{ background: 'var(--surface-muted)' }}
              >
                <p className="display font-semibold tabular-nums" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <p className="font-semibold" style={{ color: 'var(--ink)' }}>Sales Representative Performance</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Actual vs quota this month</p>
        </div>
        <div
          className="grid grid-cols-[2fr,1fr,1fr,1fr,100px] gap-4 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide"
          style={{ background: 'var(--surface-muted)', color: 'var(--subtle)', borderBottom: '1px solid var(--border)' }}
        >
          <span>Rep</span>
          <span>Deals</span>
          <span>Revenue</span>
          <span>Quota</span>
          <span>Attainment</span>
        </div>
        {teamPerformance.map(rep => {
          const pct = Math.round((rep.revenue / rep.quota) * 100);
          const col = pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--danger)';
          return (
            <div
              key={rep.rep}
              className="grid grid-cols-[2fr,1fr,1fr,1fr,100px] gap-4 px-5 py-3.5"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <span className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{rep.rep}</span>
              <span className="text-sm tabular-nums" style={{ color: 'var(--ink-2)' }}>{rep.deals}</span>
              <span className="text-sm tabular-nums font-medium" style={{ color: 'var(--ink)' }}>{fmtUSD(rep.revenue)}</span>
              <span className="text-sm tabular-nums" style={{ color: 'var(--muted)' }}>{fmtUSD(rep.quota)}</span>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--surface-muted)' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: col }} />
                  </div>
                  <span className="text-xs tabular-nums font-semibold w-8 text-right" style={{ color: col }}>
                    {pct}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Analytics;
