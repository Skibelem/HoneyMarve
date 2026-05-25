import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Inbox, Package, BarChart2, Settings, Menu, X, ArrowLeft } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Requests & Enquiries', path: '/admin/orders', icon: Inbox },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Insights', path: '/admin/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
        <Link to="/" className="flex flex-col group inline-block">
          <span className="font-serif font-semibold text-xl tracking-tight leading-none text-white">
            HoneyMarve
          </span>
          <span className="text-[0.6rem] font-sans tracking-[0.2em] uppercase mt-1 text-muted-honey-gold">
            Admin Portal
          </span>
        </Link>
        <div className="hidden md:block px-2 py-1 bg-white/10 rounded text-[0.65rem] uppercase tracking-wider text-white font-medium border border-white/20">
          Prototype Owner View
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                isActive
                  ? 'bg-muted-honey-gold text-deep-wine shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-deep-wine' : 'text-white/60'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link 
          to="/"
          className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-3 text-white/60" />
          Back to Public Site
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-soft-cream flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-espresso-text/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-deep-wine text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="md:hidden absolute top-4 right-4">
          <button onClick={() => setIsSidebarOpen(false)} className="text-white/80 hover:text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-soft-cream flex items-center justify-between px-6 shrink-0 md:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="text-espresso-text p-2 -ml-2">
            <Menu className="w-6 h-6" />
          </button>
          <div className="px-2 py-1 bg-deep-wine/5 rounded text-[0.65rem] uppercase tracking-wider text-deep-wine font-medium border border-deep-wine/10">
            Prototype Owner View
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-warm-ivory">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
