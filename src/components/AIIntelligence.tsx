import { type FC } from 'react';
import {
  Brain, ShieldAlert, ShoppingCart, Users, TrendingUp,
  AlertTriangle, ArrowUpRight
} from 'lucide-react';
import { customers, segmentData } from '../data/mockData';

const riskBadge = (risk: string) => {
  const cfg = {
    high:   { color: 'var(--danger)',  bg: 'var(--danger-soft)',  label: 'High Risk' },
    medium: { color: 'var(--warning)', bg: 'var(--warning-soft)', label: 'Medium Risk' },
    low:    { color: 'var(--success)', bg: 'var(--success-soft)', label: 'Low Risk' },
  }[risk] ?? { color: 'var(--muted)', bg: 'var(--surface-muted)', label: risk };
  return cfg;
};

const buyingPatterns = [
  { pair: 'Enterprise Plan → Analytics Add-on', probability: 68, customers: 142 },
  { pair: 'Starter Plan → Pro Upgrade', probability: 54, customers: 89 },
  { pair: 'Pro Plan → SSO Add-on', probability: 71, customers: 64 },
  { pair: 'Analytics Add-on → API Pack', probability: 45, customers: 38 },
];

const recommendations = [
  { type: 'bundle', title: 'Suggest "Analytics + API" bundle', reason: 'Customers who buy Analytics are 68% likely to also need the API Pack', impact: 'High' },
  { type: 'upsell', title: 'Upsell Brightleaf IO to Enterprise', reason: 'Pro plan + 12 orders + 99% satisfaction score', impact: 'Medium' },
  { type: 'retention', title: 'Re-engage Elena Vasquez immediately', reason: 'High churn risk — no purchase in 85 days, last complaint unresolved', impact: 'Urgent' },
  { type: 'campaign', title: 'Run loyalty campaign for 840 loyal customers', reason: 'Loyal segment has highest referral rate — 3.2x avg', impact: 'High' },
];

const impactColors: Record<string, { color: string; bg: string }> = {
  Urgent: { color: 'var(--danger)',  bg: 'var(--danger-soft)'  },
  High:   { color: 'var(--accent)',  bg: 'var(--accent-soft)'  },
  Medium: { color: 'var(--warning)', bg: 'var(--warning-soft)' },
};

const AIIntelligence: FC = () => {
  const atRisk = customers.filter(c => c.churnRisk === 'high' || c.churnRisk === 'medium');
  const totalCustomers = segmentData.reduce((s, d) => s + d.count, 0);

  return (
    <div className="p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>AI Intelligence</h1>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              BETA
            </span>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Patterns, predictions, and recommendations powered by your customer data.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--accent-soft)' }}>
          <Brain size={15} style={{ color: 'var(--accent)' }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
            Analyzing {totalCustomers.toLocaleString()} customers
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Churn Prediction */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert size={18} style={{ color: 'var(--danger)' }} />
            <div>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>Churn Prediction</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Customers showing signs of leaving</p>
            </div>
          </div>

          {/* Risk distribution */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {(['low', 'medium', 'high'] as const).map(risk => {
              const count = customers.filter(c => c.churnRisk === risk).length;
              const cfg = riskBadge(risk);
              return (
                <div
                  key={risk}
                  className="rounded-xl p-3 text-center"
                  style={{ background: cfg.bg }}
                >
                  <p className="display font-bold text-xl tabular-nums" style={{ color: cfg.color }}>{count}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: cfg.color }}>{cfg.label}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            {atRisk.map(c => {
              const cfg = riskBadge(c.churnRisk);
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: 'var(--surface-muted)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>{c.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      Last purchase: {c.lastPurchase} · {c.totalOrders} orders
                    </p>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            className="mt-3 w-full py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
            style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}
          >
            <AlertTriangle size={13} />
            View all at-risk customers
          </button>
        </div>

        {/* Buying Patterns */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart size={18} style={{ color: 'var(--accent)' }} />
            <div>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>Buying Patterns</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Frequently purchased together</p>
            </div>
          </div>

          <div className="space-y-3">
            {buyingPatterns.map(p => (
              <div key={p.pair} className="p-3 rounded-xl" style={{ background: 'var(--surface-muted)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{p.pair}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={12} style={{ color: 'var(--accent)' }} />
                    <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
                      {p.probability}% likely
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>
                    {p.customers} customers
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.probability}%`, background: 'var(--accent)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Segmentation */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} style={{ color: 'var(--accent)' }} />
            <div>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>Automatic Segmentation</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Customers grouped by behavior</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {segmentData.map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: s.color }} />
                <span className="text-sm flex-1" style={{ color: 'var(--ink-2)' }}>{s.label}</span>
                <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--surface-muted)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(s.count / totalCustomers) * 100}%`, background: s.color }}
                  />
                </div>
                <span className="tabular-nums text-sm font-semibold w-10 text-right" style={{ color: 'var(--ink)' }}>
                  {s.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} style={{ color: 'var(--accent)' }} />
            <div>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>Recommendations</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Actions to take right now</p>
            </div>
          </div>

          <div className="space-y-3">
            {recommendations.map((r, i) => {
              const ic = impactColors[r.impact] ?? impactColors['High'];
              return (
                <div
                  key={i}
                  className="p-3.5 rounded-xl"
                  style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{r.title}</p>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: ic.bg, color: ic.color }}
                    >
                      {r.impact}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{r.reason}</p>
                  <button
                    className="mt-2 flex items-center gap-1 text-xs font-medium transition-all"
                    style={{ color: 'var(--accent)' }}
                  >
                    Take action <ArrowUpRight size={11} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIIntelligence;
