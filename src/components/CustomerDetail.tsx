import { type FC } from 'react';
import {
  ArrowLeft, Mail, Phone, MapPin, Building2, Tag,
  ShoppingBag, MessageSquare, PhoneCall, FileText,
  DollarSign, RotateCcw, AlertCircle, Pencil, Plus, Link2,
  type LucideIcon
} from 'lucide-react';
import {
  customers, timelineEvents, tickets, deals,
  type TimelineEvent
} from '../data/mockData';

interface CustomerDetailProps {
  customerId: string;
  onBack: () => void;
}

const statusColors = {
  active:   { color: 'var(--success)', bg: 'var(--success-soft)', label: 'Active' },
  'at-risk':{ color: 'var(--danger)',  bg: 'var(--danger-soft)',  label: 'At Risk' },
  inactive: { color: 'var(--muted)',   bg: 'var(--surface-muted)', label: 'Inactive' },
  new:      { color: 'var(--warning)', bg: 'var(--warning-soft)', label: 'New' },
};

const riskColors = {
  low:    { color: 'var(--success)', bg: 'var(--success-soft)' },
  medium: { color: 'var(--warning)', bg: 'var(--warning-soft)' },
  high:   { color: 'var(--danger)',  bg: 'var(--danger-soft)'  },
};

const timelineIcons = {
  purchase: { icon: ShoppingBag, color: 'var(--accent)' },
  support:  { icon: AlertCircle, color: 'var(--danger)' },
  email:    { icon: Mail, color: 'var(--muted)' },
  call:     { icon: PhoneCall, color: 'var(--success)' },
  note:     { icon: FileText, color: 'var(--warning)' },
  deal:     { icon: DollarSign, color: 'var(--accent)' },
  payment:  { icon: DollarSign, color: 'var(--success)' },
  chat:     { icon: MessageSquare, color: 'var(--muted)' },
  refund:   { icon: RotateCcw, color: 'var(--danger)' },
};

const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.abs(n));

const Avatar: FC<{ initials: string; size?: number }> = ({ initials, size = 48 }) => (
  <div
    className="rounded-full flex items-center justify-center font-semibold flex-shrink-0 display"
    style={{
      width: size, height: size, fontSize: size * 0.36,
      background: 'var(--accent-soft)', color: 'var(--accent)',
    }}
  >
    {initials}
  </div>
);

const InfoRow: FC<{ icon: LucideIcon; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2.5 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
    <Icon size={14} style={{ color: 'var(--subtle)', marginTop: 2 }} />
    <div className="min-w-0">
      <p className="text-xs" style={{ color: 'var(--subtle)' }}>{label}</p>
      <p className="text-sm font-medium truncate" style={{ color: 'var(--ink)' }}>{value}</p>
    </div>
  </div>
);

const TimelineItem: FC<{ event: TimelineEvent }> = ({ event }) => {
  const cfg = timelineIcons[event.type];
  const Icon = cfg.icon;
  return (
    <div className="flex gap-3 group">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}33` }}
        >
          <Icon size={14} style={{ color: cfg.color }} />
        </div>
        <div className="flex-1 w-px mt-1" style={{ background: 'var(--border)' }} />
      </div>
      <div className="pb-4 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{event.title}</p>
          {event.amount && (
            <span
              className="text-xs font-semibold tabular-nums flex-shrink-0 px-2 py-0.5 rounded-full"
              style={
                event.amount < 0
                  ? { background: 'var(--danger-soft)', color: 'var(--danger)' }
                  : { background: 'var(--success-soft)', color: 'var(--success)' }
              }
            >
              {event.amount < 0 ? '-' : '+'}{fmtUSD(event.amount)}
            </span>
          )}
        </div>
        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{event.description}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--subtle)' }}>{event.date}</p>
        {event.ticketId && (
          <span className="mt-1 inline-flex items-center gap-1 text-xs" style={{ color: 'var(--accent)' }}>
            <Link2 size={10} />
            {event.ticketId}
          </span>
        )}
      </div>
    </div>
  );
};

const CustomerDetail: FC<CustomerDetailProps> = ({ customerId, onBack }) => {
  const customer = customers.find(c => c.id === customerId);
  if (!customer) return null;

  const events = timelineEvents
    .filter(e => e.customerId === customerId)
    .sort((a, b) => b.date.localeCompare(a.date));

  const customerTickets = tickets.filter(t => t.customerId === customerId);
  const customerDeals = deals.filter(d => d.customerId === customerId);

  const st = statusColors[customer.status];
  const rk = riskColors[customer.churnRisk];

  return (
    <div className="p-7 space-y-5">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm transition-colors"
        style={{ color: 'var(--muted)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
      >
        <ArrowLeft size={15} />
        Back to Customers
      </button>

      {/* Profile header */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-start gap-4">
          <Avatar initials={customer.avatar} size={52} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="display text-xl font-semibold" style={{ color: 'var(--ink)' }}>{customer.name}</h2>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ background: st.bg, color: st.color }}
              >
                {st.label}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ background: rk.bg, color: rk.color }}
              >
                {customer.churnRisk.charAt(0).toUpperCase() + customer.churnRisk.slice(1)} Risk
              </span>
            </div>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
              {customer.company} · Customer since {customer.joinDate}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {customer.tags.map(t => (
                <span
                  key={t}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <Tag size={9} />{t}
                </span>
              ))}
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
          >
            <Pencil size={13} />
            Edit
          </button>
        </div>

        {/* Stats strip */}
        <div
          className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {[
            { label: 'Lifetime Value', value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(customer.ltv) },
            { label: 'Total Orders', value: String(customer.totalOrders) },
            { label: 'Avg Order Value', value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(customer.avgOrderValue) },
            { label: 'Last Purchase', value: customer.lastPurchase },
          ].map(s => (
            <div key={s.label}>
              <p className="text-xs" style={{ color: 'var(--subtle)' }}>{s.label}</p>
              <p className="display font-semibold tabular-nums mt-0.5" style={{ color: 'var(--ink)' }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: contact + memory */}
        <div className="space-y-4">
          {/* Contact Info */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Contact Information</p>
            <InfoRow icon={Mail} label="Email" value={customer.email} />
            <InfoRow icon={Phone} label="Phone" value={customer.phone} />
            <InfoRow icon={Building2} label="Company" value={customer.company} />
            <InfoRow icon={MapPin} label="Address" value={customer.address} />
            {customer.socialX && <InfoRow icon={Tag} label="X / Twitter" value={customer.socialX} />}
          </div>

          {/* Smart Memory */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>Smart Memory</p>
            {[
              { label: 'Segment', value: customer.segment },
              { label: 'Preferred Channel', value: customer.preferredChannel.charAt(0).toUpperCase() + customer.preferredChannel.slice(1) },
              { label: 'Last Interaction', value: customer.lastInteraction },
              { label: 'Purchase Frequency', value: `~${Math.round(customer.totalOrders / 12)} / month` },
            ].map(r => (
              <div key={r.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-xs" style={{ color: 'var(--subtle)' }}>{r.label}</span>
                <span className="text-xs font-medium" style={{ color: 'var(--ink)' }}>{r.value}</span>
              </div>
            ))}
            <div className="mt-3">
              <p className="text-xs mb-1" style={{ color: 'var(--subtle)' }}>Notes</p>
              <p className="text-sm" style={{ color: 'var(--ink-2)' }}>{customer.notes}</p>
            </div>
          </div>

          {/* Open tickets */}
          {customerTickets.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>Support Tickets</p>
              <div className="space-y-2">
                {customerTickets.map(t => (
                  <div
                    key={t.id}
                    className="flex items-start gap-2 p-2.5 rounded-xl"
                    style={{ background: 'var(--surface-muted)' }}
                  >
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: t.status === 'resolved' ? 'var(--success)' : 'var(--danger)' }} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold" style={{ color: 'var(--ink)' }}>#{t.ticketNumber}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{t.subject}</p>
                    </div>
                    <span
                      className="ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={t.status === 'resolved' ? { background: 'var(--success-soft)', color: 'var(--success)' } : { background: 'var(--danger-soft)', color: 'var(--danger)' }}
                    >
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deals */}
          {customerDeals.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>Deals</p>
              <div className="space-y-2">
                {customerDeals.map(d => (
                  <div
                    key={d.id}
                    className="p-2.5 rounded-xl"
                    style={{ background: 'var(--surface-muted)' }}
                  >
                    <p className="text-xs font-semibold truncate" style={{ color: 'var(--ink)' }}>{d.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>{d.stage}</span>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
                        {fmtUSD(d.value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-2">
          <div
            className="rounded-2xl p-5 h-full"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-semibold" style={{ color: 'var(--ink)' }}>Customer Timeline</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  Complete relationship history
                </p>
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                <Plus size={12} />
                Add note
              </button>
            </div>

            {events.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm" style={{ color: 'var(--muted)' }}>No timeline events yet.</p>
              </div>
            ) : (
              <div>
                {events.map(e => <TimelineItem key={e.id} event={e} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
