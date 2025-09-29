import { useState } from 'react';
import MapView from '@/components/MapView';
import StatCard from '@/components/StatCard';
import { FileText, CheckCircle, Radio, AlertTriangle } from 'lucide-react';

// TODO: Remove mock data - replace with real API calls
const mockReports = [
  {
    id: '1',
    type: 'High Waves',
    latitude: 13.0827,
    longitude: 80.2707,
    trustScore: 85,
    verified: true,
    description: 'Unusually high waves observed near Marina Beach',
    timestamp: '2024-01-15T10:30:00Z',
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: '2',
    type: 'Coastal Flooding',
    latitude: 11.9139,
    longitude: 79.8145,
    trustScore: 65,
    verified: false,
    description: 'Flooding reported in coastal areas',
    timestamp: '2024-01-15T11:00:00Z'
  },
  {
    id: '3',
    type: 'Abnormal Tide',
    latitude: 12.9141,
    longitude: 74.8560,
    trustScore: 45,
    verified: false,
    description: 'Unusual tidal patterns observed',
    timestamp: '2024-01-15T09:15:00Z'
  },
  {
    id: '4',
    type: 'Tsunami Sighting',
    latitude: 15.2993,
    longitude: 74.1240,
    trustScore: 92,
    verified: true,
    description: 'Potential tsunami warning signs detected',
    timestamp: '2024-01-15T08:00:00Z'
  },
  {
    id: '5',
    type: 'High Waves',
    latitude: 19.0760,
    longitude: 72.8777,
    trustScore: 72,
    verified: false,
    description: 'High wave activity near Gateway of India',
    timestamp: '2024-01-15T12:45:00Z'
  }
];

export default function Dashboard() {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  return (
    <div className="h-screen flex flex-col">
      {/* Stats Row */}
      <div className="p-6 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <MapView 
          reports={mockReports}
          onReportClick={(report) => {
            console.log('Report selected:', report);
            setSelectedReport(report);
          }}
          showSocialHeatmap={true}
        />
      </div>
    </div>
  );
}
