import { type FC, useState } from 'react';
import {
  ArrowUpRight, ArrowDownLeft, Send, Plus, Copy,
  CheckCircle2, Clock, XCircle, ExternalLink
} from 'lucide-react';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { payments, type Payment } from '../data/mockData';

// Token icons using simple SVG shapes since web3icons may vary
const TokenIcon: FC<{ asset: string; size?: number }> = ({ asset, size = 22 }) => {
  const configs = {
    USDC:   { bg: '#2775CA', text: 'U' },
    EURC:   { bg: '#0052FF', text: 'E' },
    cirBTC: { bg: '#F7931A', text: 'B' },
  };
  const cfg = configs[asset as keyof typeof configs] ?? { bg: '#8898aa', text: '?' };
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{ width: size, height: size, background: cfg.bg, fontSize: size * 0.4, color: '#fff' }}
    >
      {cfg.text}
    </div>
  );
};

const fmtAmount = (amount: number, asset: string) => {
  if (asset === 'cirBTC') return `${amount.toFixed(6)} cirBTC`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: asset === 'EURC' ? 'EUR' : 'USD', maximumFractionDigits: 2 }).format(amount);
};

const statusConfig = {
  completed: { label: 'Completed', color: 'var(--success)', bg: 'var(--success-soft)', icon: CheckCircle2 },
  pending:   { label: 'Pending',   color: 'var(--warning)', bg: 'var(--warning-soft)', icon: Clock },
  failed:    { label: 'Failed',    color: 'var(--danger)',  bg: 'var(--danger-soft)',  icon: XCircle },
};

const WalletBalances: FC = () => {
  const { address, isConnected } = useAccount();

  const walletAssets = [
    { asset: 'USDC', label: 'USD Coin', balance: null, note: 'Connect wallet to view' },
    { asset: 'EURC', label: 'Euro Coin', balance: null, note: 'Connect wallet to view' },
    { asset: 'cirBTC', label: 'Circle Bitcoin', balance: null, note: 'Connect wallet to view' },
  ];

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold" style={{ color: 'var(--ink)' }}>Business Wallet</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Send, receive, and manage digital assets</p>
        </div>
        <ConnectKitButton />
      </div>

      {isConnected && address ? (
        <>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4"
            style={{ background: 'var(--surface-muted)' }}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--success)' }} />
            <span className="mono text-xs flex-1 truncate" style={{ color: 'var(--muted)' }}>{address}</span>
            <button
              className="flex-shrink-0"
              onClick={() => { void navigator.clipboard.writeText(address); }}
              style={{ color: 'var(--subtle)' }}
            >
              <Copy size={12} />
            </button>
          </div>

          <div className="space-y-2">
            {walletAssets.map(a => (
              <div
                key={a.asset}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: 'var(--surface-muted)' }}
              >
                <TokenIcon asset={a.asset} size={36} />
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{a.asset}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{a.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: 'var(--subtle)' }}>Connect to view balance</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--accent)', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
            >
              <Send size={14} />
              Send
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--success-soft)', color: 'var(--success)' }}
            >
              <ArrowDownLeft size={14} />
              Receive
            </button>
          </div>
        </>
      ) : (
        <div
          className="py-8 text-center rounded-xl"
          style={{ background: 'var(--surface-muted)' }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
            Connect your wallet to view balances and send payments
          </p>
          <div className="mt-4 flex justify-center">
            <ConnectKitButton label="Connect Wallet" />
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentRow: FC<{ payment: Payment }> = ({ payment: p }) => {
  const st = statusConfig[p.status];
  const StatusIcon = st.icon;
  return (
    <div
      className="flex items-center gap-3 px-5 py-3.5 transition-all"
      style={{ borderBottom: '1px solid var(--border)', cursor: 'default' }}
      onMouseEnter={e => (e.currentTarget).style.background = 'var(--surface-muted)'}
      onMouseLeave={e => (e.currentTarget).style.background = ''}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={
          p.type === 'receive'
            ? { background: 'var(--success-soft)' }
            : { background: 'var(--danger-soft)' }
        }
      >
        {p.type === 'receive'
          ? <ArrowDownLeft size={15} style={{ color: 'var(--success)' }} />
          : <ArrowUpRight size={15} style={{ color: 'var(--danger)' }} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <TokenIcon asset={p.asset} size={16} />
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            {p.type === 'receive' ? 'Received' : 'Sent'} {p.asset}
          </p>
        </div>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted)' }}>
          {p.note ?? (p.customerName ? `— ${p.customerName}` : '')}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p
          className="font-semibold tabular-nums text-sm"
          style={{ color: p.type === 'receive' ? 'var(--success)' : 'var(--danger)' }}
        >
          {p.type === 'receive' ? '+' : '-'}{fmtAmount(p.amount, p.asset)}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--subtle)' }}>{p.date}</p>
      </div>

      <div className="flex items-center gap-1.5 ml-2">
        <span
          className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: st.bg, color: st.color }}
        >
          <StatusIcon size={9} />
          {st.label}
        </span>
        {p.txHash && (
          <button style={{ color: 'var(--subtle)' }} title="View on explorer">
            <ExternalLink size={11} />
          </button>
        )}
      </div>
    </div>
  );
};

const Payments: FC = () => {
  const [assetFilter, setAssetFilter] = useState<'all' | 'USDC' | 'EURC' | 'cirBTC'>('all');

  const filtered = payments.filter(p => assetFilter === 'all' || p.asset === assetFilter);

  const totalReceived = payments.filter(p => p.type === 'receive' && p.status === 'completed')
    .reduce((s, p) => s + (p.asset === 'USDC' ? p.amount : p.asset === 'EURC' ? p.amount * 1.08 : 0), 0);

  return (
    <div className="p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Payments</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            USDC, EURC, and cirBTC — connected to your customer relationships.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
        >
          <Plus size={15} />
          New Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Received (USD eq.)', value: `$${Math.round(totalReceived).toLocaleString()}`, color: 'var(--success)' },
          { label: 'Pending Transactions', value: payments.filter(p => p.status === 'pending').length.toString(), color: 'var(--warning)' },
          { label: 'Assets Supported', value: '3', color: 'var(--accent)' },
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

      <div className="grid grid-cols-1 xl:grid-cols-[1fr,340px] gap-5">
        {/* Transaction history */}
        <div className="space-y-3">
          {/* Asset filter */}
          <div
            className="flex items-center gap-1 p-1 rounded-xl w-fit"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {(['all', 'USDC', 'EURC', 'cirBTC'] as const).map(a => (
              <button
                key={a}
                onClick={() => setAssetFilter(a)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={assetFilter === a ? { background: 'var(--accent)', color: '#fff' } : { color: 'var(--muted)' }}
              >
                {a !== 'all' && <TokenIcon asset={a} size={14} />}
                {a === 'all' ? 'All Assets' : a}
              </button>
            ))}
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>Transaction History</p>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{filtered.length} transactions</span>
            </div>
            {filtered.map(p => <PaymentRow key={p.id} payment={p} />)}
          </div>
        </div>

        {/* Wallet panel */}
        <WalletBalances />
      </div>

      {/* Asset info */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { asset: 'USDC', name: 'USD Coin', desc: 'US Dollar stablecoin by Circle. 1:1 with USD.', bg: '#2775CA' },
          { asset: 'EURC', name: 'Euro Coin', desc: 'Euro stablecoin by Circle. 1:1 with EUR.', bg: '#0052FF' },
          { asset: 'cirBTC', name: 'Circle Bitcoin', desc: 'Tokenized Bitcoin backed by Circle.', bg: '#F7931A' },
        ].map(a => (
          <div
            key={a.asset}
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <TokenIcon asset={a.asset} size={36} />
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{a.name}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
