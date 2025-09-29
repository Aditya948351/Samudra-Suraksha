import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Camera, Upload, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HazardReportFormProps {
  onSubmit?: (report: any) => void;
}

export default function HazardReportForm({ onSubmit }: HazardReportFormProps) {
  const [hazardType, setHazardType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Detecting location...');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          setLocation(`Auto-detected: ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocation('Location unavailable - using default');
          setLatitude(13.0827);
          setLongitude(80.2707);
        }
      );
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reportData = {
      hazardType,
      description,
      location,
      latitude,
      longitude,
      timestamp: new Date().toISOString()
    };

    try {
      // Save to offline storage using OfflineSync API
      if ((window as any).OfflineSync) {
        await (window as any).OfflineSync.saveReport(reportData);
        
        toast({
          title: 'Report Saved',
          description: isOnline 
            ? 'Report saved and will be synced to server.' 
            : 'Report saved offline. It will sync when connection is restored.',
          variant: 'default'
        });

        // Also call the onSubmit callback if provided
        onSubmit?.(reportData);

        // Reset form
        setHazardType('');
        setDescription('');
      } else {
        // Fallback if OfflineSync is not available
        onSubmit?.(reportData);
        toast({
          title: 'Report Submitted',
          description: 'Your report has been submitted.',
        });
      }
    } catch (error) {
      console.error('Failed to save report:', error);
      toast({
        title: 'Error',
        description: 'Failed to save report. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto" data-testid="hazard-report-form">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Report Coastal Hazard</CardTitle>
          <Badge variant={isOnline ? 'default' : 'destructive'} className="flex items-center gap-1">
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? 'Online' : 'Offline Mode'}
          </Badge>
        </div>
        {!isOnline && (
          <p className="text-sm text-muted-foreground mt-2">
            You're offline. Your report will be saved locally and synced when connection is restored.
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hazard Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="hazard-type">Hazard Type *</Label>
            <Select value={hazardType} onValueChange={setHazardType}>
              <SelectTrigger id="hazard-type" data-testid="select-hazard-type">
                <SelectValue placeholder="Select hazard type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High Waves">High Waves</SelectItem>
                <SelectItem value="Coastal Flooding">Coastal Flooding</SelectItem>
                <SelectItem value="Tsunami Sighting">Tsunami Sighting</SelectItem>
                <SelectItem value="Abnormal Tide">Abnormal Tide</SelectItem>
                <SelectItem value="Storm Surge">Storm Surge</SelectItem>
                <SelectItem value="Erosion">Coastal Erosion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what you observed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              data-testid="textarea-description"
            />
          </div>

          {/* Location (Auto-detected) */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                readOnly
                className="pl-10"
                data-testid="input-location"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Location automatically detected from your device
            </p>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photo/Video (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover-elevate cursor-pointer">
              <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload photo or video
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, MP4 (max 10MB)
              </p>
              <input
                type="file"
                className="hidden"
                accept="image/*,video/*"
                data-testid="input-file-upload"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full gap-2"
            disabled={!hazardType || !description}
            data-testid="button-submit-report"
          >
            <Upload className="h-4 w-4" />
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
