import StatCard from '../StatCard';
import { FileText, CheckCircle, AlertTriangle, Radio } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Reports"
        value="1,247"
        icon={FileText}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Verified Today"
        value="89"
        icon={CheckCircle}
        trend={{ value: 8, isPositive: true }}
        color="text-green-600"
      />
      <StatCard
        title="Active Alerts"
        value="3"
        icon={Radio}
        color="text-accent"
      />
      <StatCard
        title="High Priority"
        value="15"
        icon={AlertTriangle}
        trend={{ value: 5, isPositive: false }}
        color="text-destructive"
      />
    </div>
  );
}
