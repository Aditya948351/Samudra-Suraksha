import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Camera, Upload } from 'lucide-react';

interface HazardReportFormProps {
  onSubmit?: (report: any) => void;
}

export default function HazardReportForm({ onSubmit }: HazardReportFormProps) {
  const [hazardType, setHazardType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Auto-detected: 13.0827°N, 80.2707°E');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      hazardType,
      description,
      location,
      timestamp: new Date().toISOString()
    });
    setHazardType('');
    setDescription('');
  };

  return (
    <Card className="max-w-2xl mx-auto" data-testid="hazard-report-form">
      <CardHeader>
        <CardTitle>Report Coastal Hazard</CardTitle>
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
