import { useState } from 'react';
import Sidebar, { type ActiveView } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import CustomerDetail from './components/CustomerDetail';
import Sales from './components/Sales';
import Support from './components/Support';
import Automations from './components/Automations';
import Analytics from './components/Analytics';
import AIIntelligence from './components/AIIntelligence';
import Payments from './components/Payments';
import Settings from './components/Settings';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleSelectCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setActiveView('customer-detail');
  };

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    if (view !== 'customer-detail') setSelectedCustomerId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':      return <Dashboard />;
      case 'customers':      return <Customers onSelectCustomer={handleSelectCustomer} />;
      case 'customer-detail':
        return selectedCustomerId
          ? <CustomerDetail customerId={selectedCustomerId} onBack={() => handleNavigate('customers')} />
          : <Customers onSelectCustomer={handleSelectCustomer} />;
      case 'sales':          return <Sales />;
      case 'support':        return <Support />;
      case 'automations':    return <Automations />;
      case 'ai':             return <AIIntelligence />;
      case 'analytics':      return <Analytics />;
      case 'payments':       return <Payments />;
      case 'settings':       return <Settings />;
      default:               return <Dashboard />;
    }
  };

  return (
    <div className="min-h-dvh flex" style={{ background: 'var(--bg-gradient)' }}>
      <Sidebar active={activeView} onNavigate={handleNavigate} />

      {/* Main content area */}
      <main
        className="flex-1 min-w-0 overflow-y-auto"
        style={{ marginLeft: '240px' }}
      >
        {renderContent()}
      </main>

      {/* AI Intelligence floating button — only visible on non-AI views */}
      {activeView !== 'analytics' && (
        <button
          onClick={() => handleNavigate('analytics')}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg transition-all"
          style={{
            background: 'var(--sidebar)',
            color: '#fff',
            boxShadow: '0 4px 24px rgba(15,28,46,0.25)',
          }}
          onMouseEnter={e => {
            (e.currentTarget).style.background = 'var(--accent)';
          }}
          onMouseLeave={e => {
            (e.currentTarget).style.background = 'var(--sidebar)';
          }}
          title="Open Analytics"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
          Analytics
        </button>
      )}
    </div>
  );
}
