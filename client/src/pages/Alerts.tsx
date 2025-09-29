import { useState } from 'react';
import AlertCreator from '@/components/AlertCreator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Radio, Clock, MapPin, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// TODO: Remove mock data - replace with real API calls
const mockActiveAlerts = [
  {
    id: '1',
    message: 'High wave warning issued for Chennai coast. Please stay away from beaches.',
    severity: 'warning',
    region: 'Chennai, Tamil Nadu',
    sentAt: '2024-01-15T10:00:00Z',
    recipientCount: 12450
  },
  {
    id: '2',
    message: 'CRITICAL: Tsunami warning for Goa coast. Evacuate immediately to higher ground.',
    severity: 'critical',
    region: 'Goa',
    sentAt: '2024-01-15T08:30:00Z',
    recipientCount: 8920
  },
  {
    id: '3',
    message: 'Weather update: Moderate rainfall expected along Kerala coast.',
    severity: 'info',
    region: 'Kerala',
    sentAt: '2024-01-15T12:15:00Z',
    recipientCount: 15300
  }
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockActiveAlerts);

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

  const handleSendAlert = (alert: { message: string; severity: string }) => {
    console.log('Sending alert:', alert);
    // TODO: Call API to send alert
    const newAlert = {
      id: Date.now().toString(),
      message: alert.message,
      severity: alert.severity,
      region: 'Selected Area',
      sentAt: new Date().toISOString(),
      recipientCount: 0
    };
    setAlerts([newAlert, ...alerts]);
  };

  const handleDeleteAlert = (id: string) => {
    console.log('Deleting alert:', id);
    // TODO: Call API to delete alert
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="h-screen flex">
      {/* Alert Creator */}
      <div className="w-2/5 border-r p-6">
        <AlertCreator onSend={handleSendAlert} />
      </div>

      {/* Active Alerts */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Active Alerts</h1>
          <p className="text-muted-foreground">
            Manage and monitor active emergency alerts
          </p>
        </div>

        <div className="space-y-4">
          {alerts.map(alert => (
            <Card key={alert.id} data-testid={`alert-${alert.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-muted-foreground" />
                    <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteAlert(alert.id)}
                    data-testid={`button-delete-${alert.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{alert.message}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {alert.region}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(alert.sentAt), { addSuffix: true })}
                  </div>
                  <div>
                    {alert.recipientCount.toLocaleString()} recipients
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
