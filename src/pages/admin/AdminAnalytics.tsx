import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { useRequestStore } from '../../store/useRequestStore';
import { TrendingUp } from 'lucide-react';

const COLORS = ['#3B070A', '#C59B58', '#540D12', '#241817', '#7c3aed', '#6b7280'];

const AdminAnalytics: React.FC = () => {
  const { requests } = useRequestStore();

  if (requests.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif text-deep-wine mb-1">Insights</h1>
          <p className="text-espresso-text/70">Request-based analytics calculated from recorded prototype data.</p>
        </div>
        <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-soft-cream flex flex-col items-center">
          <div className="w-20 h-20 bg-soft-cream rounded-full flex items-center justify-center text-primary-burgundy/30 mb-6">
            <TrendingUp className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-serif text-deep-wine mb-3">No Data to Display</h2>
          <p className="text-espresso-text/60 max-w-md text-sm leading-relaxed">
            Insights will automatically populate once customers begin submitting selections and catering enquiries through the public website.
          </p>
        </div>
      </div>
    );
  }

  // Status distribution
  const statusCounts: Record<string, number> = {};
  requests.forEach((r) => {
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
  });
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // Request type split
  const selectionCount = requests.filter((r) => r.requestType === 'selection').length;
  const cateringCount = requests.filter((r) => r.requestType === 'catering').length;
  const typeData = [
    { name: 'Selection Requests', value: selectionCount },
    { name: 'Catering Enquiries', value: cateringCount },
  ];

  // Most selected products
  const productCounts: Record<string, number> = {};
  requests.forEach((req) => {
    req.selectedItems.forEach((item) => {
      productCounts[item.productName] = (productCounts[item.productName] || 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(productCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, count]) => ({ name: name.length > 20 ? name.slice(0, 18) + '…' : name, count }));

  // Recent activity (last 7 days by day)
  const activityMap: Record<string, number> = {};
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
    activityMap[key] = 0;
  }
  requests.forEach((req) => {
    const d = new Date(req.createdAt);
    const key = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
    if (key in activityMap) activityMap[key]++;
  });
  const activityData = Object.entries(activityMap).map(([date, count]) => ({ date, count }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-deep-wine mb-1">Insights</h1>
        <p className="text-espresso-text/70">Analytics calculated from {requests.length} recorded prototype request{requests.length !== 1 ? 's' : ''}.</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: requests.length },
          { label: 'Selection Requests', value: selectionCount },
          { label: 'Catering Enquiries', value: cateringCount },
          { label: 'Unique Products Selected', value: Object.keys(productCounts).length },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-soft-cream"
          >
            <p className="text-xs uppercase tracking-wider text-espresso-text/50 font-medium mb-2">{stat.label}</p>
            <p className="text-3xl font-serif text-deep-wine">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Pie */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-soft-cream">
          <h2 className="text-xl font-serif text-deep-wine mb-6">Requests by Status</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Requests']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Type Split */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-soft-cream">
          <h2 className="text-xl font-serif text-deep-wine mb-6">Request Type Split</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={typeData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                <Cell fill="#3B070A" />
                <Cell fill="#C59B58" />
              </Pie>
              <Tooltip formatter={(value) => [value, 'Requests']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Selected Products */}
      {topProducts.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-soft-cream">
          <h2 className="text-xl font-serif text-deep-wine mb-6">Most Selected Products</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topProducts} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#241817' }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip formatter={(value) => [value, 'Quantity Selected']} />
              <Bar dataKey="count" fill="#3B070A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-soft-cream">
        <h2 className="text-xl font-serif text-deep-wine mb-6">Request Activity (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip formatter={(value) => [value, 'Requests']} />
            <Bar dataKey="count" fill="#C59B58" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
