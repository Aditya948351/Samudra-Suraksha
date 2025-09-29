import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TrustScoreMeter from './TrustScoreMeter';
import { CheckCircle, AlertTriangle, XCircle, MapPin, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Report {
  id: string;
  type: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  trustScore: number;
  imageUrl?: string;
  reporterName: string;
}

interface VerificationPanelProps {
  report: Report | null;
  onVerify?: (reportId: string) => void;
  onEscalate?: (reportId: string) => void;
  onDismiss?: (reportId: string) => void;
}

export default function VerificationPanel({ report, onVerify, onEscalate, onDismiss }: VerificationPanelProps) {
  if (!report) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          <p>Select a report to view details</p>
        </CardContent>
      </Card>
    );
  }

  const getHazardBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      'High Waves': 'bg-blue-500',
      'Coastal Flooding': 'bg-red-500',
      'Tsunami Sighting': 'bg-purple-500',
      'Abnormal Tide': 'bg-yellow-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <Card className="h-full overflow-auto" data-testid="verification-panel">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <Badge className={`${getHazardBadgeColor(report.type)} text-white`}>
            {report.type}
          </Badge>
          <span className="text-xs text-muted-foreground">
            ID: {report.id}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Trust Score */}
        <div className="flex flex-col items-center">
          <TrustScoreMeter score={report.trustScore} size="lg" />
          <p className="text-sm text-muted-foreground mt-2">Trust Score</p>
        </div>

        {/* Image */}
        {report.imageUrl && (
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img 
              src={report.imageUrl} 
              alt={report.type}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground">{report.description}</p>
        </div>

        {/* Metadata */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Location</p>
              <p className="text-xs text-muted-foreground">{report.location}</p>
              <p className="text-xs text-muted-foreground">
                {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Timestamp</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(report.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Reporter</p>
              <p className="text-xs text-muted-foreground">{report.reporterName}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-4 border-t">
          <Button 
            className="w-full gap-2" 
            variant="default"
            onClick={() => onVerify?.(report.id)}
            data-testid="button-verify"
          >
            <CheckCircle className="h-4 w-4" />
            Verify Report
          </Button>
          <Button 
            className="w-full gap-2" 
            variant="secondary"
            onClick={() => onEscalate?.(report.id)}
            data-testid="button-escalate"
          >
            <AlertTriangle className="h-4 w-4" />
            Escalate
          </Button>
          <Button 
            className="w-full gap-2" 
            variant="outline"
            onClick={() => onDismiss?.(report.id)}
            data-testid="button-dismiss"
          >
            <XCircle className="h-4 w-4" />
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
