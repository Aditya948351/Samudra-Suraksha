import { useState } from 'react';
import MapView from '@/components/MapView';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Radio, AlertTriangle, MessageSquare, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

const mockLiveMessages = [
  {
    id: '1',
    message: 'High wave warning issued for Chennai coast',
    severity: 'warning',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    message: 'Tsunami alert activated for Goa region',
    severity: 'critical',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    message: 'Weather update: Moderate rainfall expected',
    severity: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

export default function Dashboard() {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

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

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 p-6 overflow-hidden">
        {/* Map Card */}
        <Card className="flex-1 overflow-hidden" data-testid="card-map">
          <CardContent className="p-0 h-full">
            <MapView 
              reports={mockReports}
              onReportClick={(report) => {
                console.log('Report selected:', report);
                setSelectedReport(report);
              }}
              showSocialHeatmap={true}
            />
          </CardContent>
        </Card>

        {/* Side Panel */}
        <div className="w-80 flex flex-col gap-4 overflow-auto">
          {/* AI Help Card */}
          <Card data-testid="card-ai-help">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-accent" />
                AI Help for Citizens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Get instant AI-powered assistance for reporting hazards:
              </p>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li>📸 Capture and analyze hazard photos</li>
                <li>📍 Auto-detect your location</li>
                <li>🤖 AI-guided report submission</li>
                <li>💬 Ask questions about coastal safety</li>
              </ul>
              <div className="pt-2">
                <Badge className="bg-accent text-accent-foreground">
                  ⚡ Powered by Gemini AI
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Live Messages */}
          <Card data-testid="card-live-messages">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4" />
                Live Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLiveMessages.map(msg => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getSeverityColor(msg.severity)} text-white text-xs`}>
                      {msg.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
