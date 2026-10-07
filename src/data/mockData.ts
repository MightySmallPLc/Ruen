// ─── Mock data for Ruen CRM ───────────────────────────────────────────────

export type CustomerStatus = 'active' | 'at-risk' | 'inactive' | 'new';
export type RiskLevel = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
  status: CustomerStatus;
  churnRisk: RiskLevel;
  ltv: number;
  totalOrders: number;
  lastPurchase: string;
  lastInteraction: string;
  avgOrderValue: number;
  tags: string[];
  segment: string;
  joinDate: string;
  address: string;
  socialX?: string;
  notes: string;
  preferredChannel: string;
}

export interface TimelineEvent {
  id: string;
  customerId: string;
  date: string;
  type: 'purchase' | 'support' | 'email' | 'call' | 'note' | 'deal' | 'payment' | 'chat' | 'refund';
  title: string;
  description: string;
  amount?: number;
  ticketId?: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  subject: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  department: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  description: string;
}

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  stage: DealStage;
  value: number;
  probability: number;
  expectedClose: string;
  assignedTo: string;
  createdAt: string;
  notes: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  active: boolean;
  runs: number;
  lastRun: string;
}

export interface Payment {
  id: string;
  customerId?: string;
  customerName?: string;
  type: 'send' | 'receive';
  asset: 'USDC' | 'EURC' | 'cirBTC';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
  from?: string;
  to?: string;
  date: string;
  note?: string;
}

// ─── Customers ────────────────────────────────────────────────────────────
export const customers: Customer[] = [
  {
    id: 'c1', name: 'Sarah Mitchell', email: 'sarah.m@acmecorp.com',
    phone: '+1 415 555 0192', company: 'Acme Corp', avatar: 'SM',
    status: 'active', churnRisk: 'low', ltv: 12400, totalOrders: 18,
    lastPurchase: '2026-10-01', lastInteraction: '2026-10-05',
    avgOrderValue: 689, tags: ['vip', 'enterprise'], segment: 'High-Value',
    joinDate: '2024-03-14', address: '221B Baker Street, San Francisco CA',
    socialX: '@sarahmitch', notes: 'Prefers email contact. Loves early access.',
    preferredChannel: 'email',
  },
  {
    id: 'c2', name: 'James Okonkwo', email: 'j.okonkwo@brightleaf.io',
    phone: '+44 20 7946 0321', company: 'Brightleaf IO', avatar: 'JO',
    status: 'active', churnRisk: 'low', ltv: 8750, totalOrders: 12,
    lastPurchase: '2026-09-28', lastInteraction: '2026-10-03',
    avgOrderValue: 729, tags: ['loyal'], segment: 'Loyal',
    joinDate: '2024-06-02', address: '12 Finsbury Square, London',
    notes: 'Renews quarterly. Very satisfied.', preferredChannel: 'phone',
  },
  {
    id: 'c3', name: 'Elena Vasquez', email: 'elena@novavibe.co',
    phone: '+34 91 555 0244', company: 'NovaVibe', avatar: 'EV',
    status: 'at-risk', churnRisk: 'high', ltv: 3200, totalOrders: 5,
    lastPurchase: '2026-07-14', lastInteraction: '2026-08-20',
    avgOrderValue: 640, tags: ['at-risk'], segment: 'At-Risk',
    joinDate: '2025-01-10', address: 'Calle Mayor 4, Madrid',
    notes: 'Engagement dropping. Recent complaint unresolved.', preferredChannel: 'chat',
  },
  {
    id: 'c4', name: 'Kwame Asante', email: 'k.asante@stellartech.gh',
    phone: '+233 30 290 4401', company: 'StellarTech GH', avatar: 'KA',
    status: 'new', churnRisk: 'low', ltv: 420, totalOrders: 1,
    lastPurchase: '2026-10-04', lastInteraction: '2026-10-04',
    avgOrderValue: 420, tags: ['new'], segment: 'New',
    joinDate: '2026-10-04', address: 'Ring Road Central, Accra',
    notes: 'First purchase. Follow up on experience.', preferredChannel: 'email',
  },
  {
    id: 'c5', name: 'Mei Lin', email: 'mei@cloudnine.sg',
    phone: '+65 9123 4567', company: 'CloudNine SG', avatar: 'ML',
    status: 'inactive', churnRisk: 'medium', ltv: 2100, totalOrders: 7,
    lastPurchase: '2026-04-10', lastInteraction: '2026-05-02',
    avgOrderValue: 300, tags: ['inactive'], segment: 'Inactive',
    joinDate: '2024-11-20', address: '1 Raffles Place, Singapore',
    notes: 'Went quiet after March. Worth a re-engagement campaign.', preferredChannel: 'email',
  },
  {
    id: 'c6', name: 'Andrei Popescu', email: 'andrei.p@draftline.ro',
    phone: '+40 21 555 0110', company: 'Draftline RO', avatar: 'AP',
    status: 'active', churnRisk: 'low', ltv: 5600, totalOrders: 9,
    lastPurchase: '2026-09-15', lastInteraction: '2026-09-30',
    avgOrderValue: 622, tags: ['loyal', 'referral'], segment: 'Loyal',
    joinDate: '2024-09-01', address: 'Bulevardul Unirii, Bucharest',
    notes: 'Referred 3 customers. Consider loyalty reward.', preferredChannel: 'email',
  },
  {
    id: 'c7', name: 'Priya Sharma', email: 'priya.s@finwave.in',
    phone: '+91 98765 43210', company: 'FinWave India', avatar: 'PS',
    status: 'active', churnRisk: 'low', ltv: 9800, totalOrders: 14,
    lastPurchase: '2026-10-02', lastInteraction: '2026-10-06',
    avgOrderValue: 700, tags: ['vip', 'enterprise'], segment: 'High-Value',
    joinDate: '2024-02-28', address: '14th Floor, Bandra Kurla Complex, Mumbai',
    notes: 'Annual contract. Very engaged.', preferredChannel: 'email',
  },
];

// ─── Timeline events ───────────────────────────────────────────────────────
export const timelineEvents: TimelineEvent[] = [
  { id: 'e1', customerId: 'c1', date: '2026-10-05', type: 'email', title: 'Email: Q4 Proposal Sent', description: 'Sent renewal proposal for Q4 2026.' },
  { id: 'e2', customerId: 'c1', date: '2026-10-01', type: 'purchase', title: 'Purchase: Enterprise Plan', description: 'Renewed Enterprise subscription.', amount: 1299 },
  { id: 'e3', customerId: 'c1', date: '2026-09-18', type: 'call', title: 'Call: Account Review', description: '30-minute review call. Positive sentiment.' },
  { id: 'e4', customerId: 'c1', date: '2026-09-01', type: 'support', title: 'Ticket #RU-4821: API issue', description: 'API rate limit concern. Resolved in 4h.', ticketId: 'RU-4821' },
  { id: 'e5', customerId: 'c1', date: '2026-08-15', type: 'purchase', title: 'Purchase: Add-on Pack', description: 'Purchased analytics add-on.', amount: 299 },
  { id: 'e6', customerId: 'c3', date: '2026-08-20', type: 'support', title: 'Ticket #RU-5201: Billing complaint', description: 'Double-charged. Refund issued.', ticketId: 'RU-5201' },
  { id: 'e7', customerId: 'c3', date: '2026-07-14', type: 'purchase', title: 'Purchase: Starter Plan', description: 'Monthly plan renewed.', amount: 49 },
  { id: 'e8', customerId: 'c3', date: '2026-09-10', type: 'email', title: 'Email: Re-engagement', description: 'Sent re-engagement campaign. No response.' },
  { id: 'e9', customerId: 'c2', date: '2026-10-03', type: 'call', title: 'Call: Upsell discussion', description: 'Discussed upgrading to Pro plan.' },
  { id: 'e10', customerId: 'c2', date: '2026-09-28', type: 'purchase', title: 'Purchase: Pro Plan', description: 'Quarterly renewal.', amount: 399 },
  { id: 'e11', customerId: 'c4', date: '2026-10-04', type: 'purchase', title: 'Purchase: Starter Plan', description: 'First purchase — welcome email sent.', amount: 420 },
  { id: 'e12', customerId: 'c1', date: '2026-07-20', type: 'refund', title: 'Refund: Overage charge', description: 'Overage refunded per agreement. $45.', amount: -45 },
  { id: 'e13', customerId: 'c1', date: '2026-06-10', type: 'payment', title: 'Payment: 1,299 USDC', description: 'USDC payment confirmed on-chain.', amount: 1299 },
];

// ─── Tickets ───────────────────────────────────────────────────────────────
export const tickets: Ticket[] = [
  { id: 't1', ticketNumber: 'RU-4821', customerId: 'c1', customerName: 'Sarah Mitchell',
    subject: 'API rate limit exceeded unexpectedly', status: 'resolved', priority: 'high',
    department: 'Technical', assignedTo: 'Omar Hassan', createdAt: '2026-09-01',
    updatedAt: '2026-09-01', resolvedAt: '2026-09-01',
    description: 'Customer reported API calls failing with 429 even under their plan limit.' },
  { id: 't2', ticketNumber: 'RU-5201', customerId: 'c3', customerName: 'Elena Vasquez',
    subject: 'Double charged in August', status: 'resolved', priority: 'urgent',
    department: 'Billing', assignedTo: 'Aisha Diallo', createdAt: '2026-08-20',
    updatedAt: '2026-08-22', resolvedAt: '2026-08-22',
    description: 'Customer was billed twice for August. Refund of $49 issued.' },
  { id: 't3', ticketNumber: 'RU-5480', customerId: 'c5', customerName: 'Mei Lin',
    subject: 'Cannot export reports to CSV', status: 'open', priority: 'medium',
    department: 'Technical', assignedTo: 'Omar Hassan', createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
    description: 'Export button unresponsive in Analytics module on Safari.' },
  { id: 't4', ticketNumber: 'RU-5501', customerId: 'c7', customerName: 'Priya Sharma',
    subject: 'Request: SSO integration with Okta', status: 'in-progress', priority: 'high',
    department: 'Technical', assignedTo: 'Dev Team', createdAt: '2026-10-06',
    updatedAt: '2026-10-07',
    description: 'Enterprise SSO setup required for their 80-person team.' },
  { id: 't5', ticketNumber: 'RU-5512', customerId: 'c4', customerName: 'Kwame Asante',
    subject: 'Onboarding: how do I add team members?', status: 'open', priority: 'low',
    department: 'Support', assignedTo: 'Lena Schmidt', createdAt: '2026-10-07',
    updatedAt: '2026-10-07',
    description: 'New customer needs onboarding guidance for team management.' },
];

// ─── Deals ─────────────────────────────────────────────────────────────────
export const deals: Deal[] = [
  { id: 'd1', title: 'Enterprise Expansion — Acme Corp', customerId: 'c1', customerName: 'Sarah Mitchell',
    stage: 'negotiation', value: 48000, probability: 80, expectedClose: '2026-10-31',
    assignedTo: 'Marcus Levy', createdAt: '2026-09-01', notes: 'Legal reviewing contract. Should close EOMonth.' },
  { id: 'd2', title: 'Annual Pro Plan — FinWave India', customerId: 'c7', customerName: 'Priya Sharma',
    stage: 'proposal', value: 28800, probability: 65, expectedClose: '2026-11-15',
    assignedTo: 'Sofia Reyes', createdAt: '2026-09-20', notes: 'Proposal sent. Awaiting procurement sign-off.' },
  { id: 'd3', title: 'Starter Upgrade — CloudNine SG', customerId: 'c5', customerName: 'Mei Lin',
    stage: 'lead', value: 4800, probability: 30, expectedClose: '2026-12-01',
    assignedTo: 'Marcus Levy', createdAt: '2026-10-01', notes: 'Re-engagement campaign triggered. Low intent.' },
  { id: 'd4', title: 'Pro Renewal — Brightleaf IO', customerId: 'c2', customerName: 'James Okonkwo',
    stage: 'closed-won', value: 9600, probability: 100, expectedClose: '2026-09-30',
    assignedTo: 'Sofia Reyes', createdAt: '2026-09-01', notes: 'Closed. Contract signed and payment received.' },
  { id: 'd5', title: 'Enterprise Trial — Draftline RO', customerId: 'c6', customerName: 'Andrei Popescu',
    stage: 'qualified', value: 18000, probability: 50, expectedClose: '2026-11-30',
    assignedTo: 'Marcus Levy', createdAt: '2026-09-28', notes: 'Trial running. Onboarding call scheduled.' },
  { id: 'd6', title: 'Starter Launch — StellarTech GH', customerId: 'c4', customerName: 'Kwame Asante',
    stage: 'closed-won', value: 420, probability: 100, expectedClose: '2026-10-04',
    assignedTo: 'Sofia Reyes', createdAt: '2026-10-04', notes: 'First deal closed. Welcome package sent.' },
];

// ─── Automations ───────────────────────────────────────────────────────────
export const automations: Automation[] = [
  { id: 'a1', name: 'Abandoned Cart Recovery', trigger: 'Cart inactive > 2 hours',
    condition: 'Cart value > $0', action: 'Send email: "You left something behind"',
    active: true, runs: 1248, lastRun: '2026-10-07' },
  { id: 'a2', name: 'Support Follow-Up', trigger: 'Ticket resolved',
    condition: 'Always', action: 'Wait 7 days → Send satisfaction email',
    active: true, runs: 342, lastRun: '2026-10-06' },
  { id: 'a3', name: 'At-Risk Customer Alert', trigger: 'No purchase > 60 days',
    condition: 'Previous orders > 2', action: 'Flag as At-Risk + Notify account manager',
    active: true, runs: 89, lastRun: '2026-10-05' },
  { id: 'a4', name: 'New Customer Welcome', trigger: 'First purchase',
    condition: 'Always', action: 'Send welcome email sequence (3 emails over 7 days)',
    active: true, runs: 215, lastRun: '2026-10-04' },
  { id: 'a5', name: 'Lead Stale Alert', trigger: 'Lead no activity > 14 days',
    condition: 'Deal stage = Lead or Qualified', action: 'Notify sales rep: "Follow up needed"',
    active: false, runs: 56, lastRun: '2026-09-20' },
  { id: 'a6', name: 'VIP Upsell Trigger', trigger: 'LTV > $5,000',
    condition: 'Current plan ≠ Enterprise', action: 'Add to upsell campaign + assign to senior rep',
    active: true, runs: 24, lastRun: '2026-10-02' },
];

// ─── Payments ──────────────────────────────────────────────────────────────
export const payments: Payment[] = [
  { id: 'p1', customerId: 'c1', customerName: 'Sarah Mitchell', type: 'receive',
    asset: 'USDC', amount: 1299, status: 'completed',
    txHash: '0xa3f2...91bc', from: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    to: '0x5B12Ce46C7194aD57d143bC22847224047b1Ef42', date: '2026-10-01', note: 'Enterprise Plan renewal' },
  { id: 'p2', customerId: 'c2', customerName: 'James Okonkwo', type: 'receive',
    asset: 'USDC', amount: 399, status: 'completed',
    txHash: '0xb91a...33de', from: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    to: '0x5B12Ce46C7194aD57d143bC22847224047b1Ef42', date: '2026-09-28', note: 'Pro Plan Q3 renewal' },
  { id: 'p3', customerId: 'c4', customerName: 'Kwame Asante', type: 'receive',
    asset: 'EURC', amount: 420, status: 'completed',
    txHash: '0xd44b...78fa', date: '2026-10-04', note: 'Starter Plan — first payment' },
  { id: 'p4', type: 'send', asset: 'USDC', amount: 45, status: 'completed',
    txHash: '0xe12c...aab2', to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    date: '2026-09-05', note: 'Refund: overage charge — Sarah Mitchell' },
  { id: 'p5', type: 'receive', asset: 'cirBTC', amount: 0.014, status: 'pending',
    date: '2026-10-07', note: 'Awaiting confirmation — Priya Sharma' },
  { id: 'p6', customerId: 'c6', customerName: 'Andrei Popescu', type: 'receive',
    asset: 'USDC', amount: 622, status: 'completed',
    txHash: '0xf88a...cc01', date: '2026-09-15', note: 'Pro Plan monthly' },
];

// ─── Dashboard stats ───────────────────────────────────────────────────────
export const dashboardStats = {
  totalCustomers: 4821,
  newCustomers: 48,
  activeCustomers: 3102,
  atRiskCustomers: 214,
  openTickets: 12,
  pendingFollowUps: 34,
  activeDeals: 8,
  monthlyRevenue: 142800,
  conversionRate: 24.6,
  churnRate: 2.1,
  avgResponseTime: '2h 14m',
  avgResolutionTime: '18h 40m',
  customerSatisfaction: 4.6,
};

export const revenueData = [
  { month: 'May', revenue: 98200 },
  { month: 'Jun', revenue: 112400 },
  { month: 'Jul', revenue: 119800 },
  { month: 'Aug', revenue: 108600 },
  { month: 'Sep', revenue: 131200 },
  { month: 'Oct', revenue: 142800 },
];

export const dealsByStage = [
  { stage: 'Lead', count: 18, value: 92000 },
  { stage: 'Qualified', count: 12, value: 148000 },
  { stage: 'Proposal', count: 8, value: 210000 },
  { stage: 'Negotiation', count: 5, value: 180000 },
  { stage: 'Closed Won', count: 22, value: 420000 },
];

export const segmentData = [
  { label: 'High-Value', count: 312, color: '#1a56db' },
  { label: 'Loyal', count: 840, color: '#0e7b3e' },
  { label: 'New', count: 594, color: '#a16207' },
  { label: 'At-Risk', count: 214, color: '#c8283c' },
  { label: 'Inactive', count: 489, color: '#8898aa' },
];

export const teamPerformance = [
  { rep: 'Marcus Levy', deals: 14, revenue: 58400, quota: 65000 },
  { rep: 'Sofia Reyes', deals: 11, revenue: 49200, quota: 55000 },
  { rep: 'Omar Hassan', deals: 9, revenue: 38800, quota: 45000 },
  { rep: 'Lena Schmidt', deals: 7, revenue: 28100, quota: 35000 },
];
