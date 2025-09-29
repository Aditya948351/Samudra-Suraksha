import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Image as ImageIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ReportCardProps {
  id: string;
  type: string;
  description: string;
  location: string;
  timestamp: string;
  trustScore: number;
  imageUrl?: string;
  verified: boolean;
  onClick?: () => void;
}

export default function ReportCard({
  id,
  type,
  description,
  location,
  timestamp,
  trustScore,
  imageUrl,
  verified,
  onClick
}: ReportCardProps) {
  const getHazardBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      'High Waves': 'bg-blue-500',
      'Coastal Flooding': 'bg-red-500',
      'Tsunami Sighting': 'bg-purple-500',
      'Abnormal Tide': 'bg-yellow-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all" 
      onClick={onClick}
      data-testid={`card-report-${id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={`${getHazardBadgeColor(type)} text-white`}>
            {type}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        {imageUrl && (
          <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-muted">
            <img 
              src={imageUrl} 
              alt={type}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p className="text-sm line-clamp-2 text-foreground">{description}</p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate max-w-[150px]">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          {verified && (
            <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
              Verified
            </Badge>
          )}
          <span className={`text-xs font-semibold ${getTrustScoreColor(trustScore)}`}>
            {trustScore}%
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
