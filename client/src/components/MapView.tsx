import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Layers, ZoomIn, ZoomOut, Navigation } from 'lucide-react';

interface Report {
  id: string;
  type: string;
  latitude: number;
  longitude: number;
  trustScore: number;
  verified: boolean;
  description: string;
  timestamp: string;
  imageUrl?: string;
}

interface MapViewProps {
  reports: Report[];
  onReportClick?: (report: Report) => void;
  showSocialHeatmap?: boolean;
}

export default function MapView({ reports, onReportClick, showSocialHeatmap = false }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [showCitizenReports, setShowCitizenReports] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(showSocialHeatmap);
  const [showOfficialData, setShowOfficialData] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstance) return;

    // Initialize Leaflet map
    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapRef.current).setView([13.0827, 80.2707], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapInstance) return;

    const L = (window as any).L;
    if (!L) return;

    // Clear existing markers
    mapInstance.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        mapInstance.removeLayer(layer);
      }
    });

    // Add markers for reports if enabled
    if (showCitizenReports) {
      reports.forEach(report => {
        const color = report.verified ? '#10b981' : (report.trustScore > 50 ? '#f59e0b' : '#ef4444');
        
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); opacity: ${report.trustScore / 100};"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([report.latitude, report.longitude], { icon })
          .addTo(mapInstance);
        
        if (onReportClick) {
          marker.on('click', () => onReportClick(report));
        }
      });
    }
  }, [mapInstance, reports, showCitizenReports, onReportClick]);

  const handleZoomIn = () => {
    if (mapInstance) mapInstance.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstance) mapInstance.zoomOut();
  };

  const handleRecenter = () => {
    if (mapInstance) mapInstance.setView([13.0827, 80.2707], 6);
  };

  const getHazardColor = (type: string) => {
    const colors: Record<string, string> = {
      'High Waves': 'bg-blue-500',
      'Coastal Flooding': 'bg-red-500',
      'Tsunami Sighting': 'bg-purple-500',
      'Abnormal Tide': 'bg-yellow-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="absolute inset-0 z-0" />
      
      {/* Layer Controls */}
      <Card className="absolute top-4 right-4 z-10 p-4 shadow-lg" data-testid="map-layer-controls">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Map Layers</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="citizen-reports" 
              checked={showCitizenReports}
              onCheckedChange={(checked) => setShowCitizenReports(!!checked)}
              data-testid="checkbox-citizen-reports"
            />
            <label htmlFor="citizen-reports" className="text-sm cursor-pointer">
              Citizen Reports
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="social-heatmap" 
              checked={showHeatmap}
              onCheckedChange={(checked) => setShowHeatmap(!!checked)}
              data-testid="checkbox-social-heatmap"
            />
            <label htmlFor="social-heatmap" className="text-sm cursor-pointer">
              Social Media Hotspots
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="official-data" 
              checked={showOfficialData}
              onCheckedChange={(checked) => setShowOfficialData(!!checked)}
              data-testid="checkbox-official-data"
            />
            <label htmlFor="official-data" className="text-sm cursor-pointer">
              Official Warning Zones
            </label>
          </div>
        </div>
      </Card>

      {/* Zoom Controls */}
      <div className="absolute bottom-24 right-4 z-10 flex flex-col gap-2">
        <Button 
          size="icon" 
          variant="secondary"
          onClick={handleZoomIn}
          data-testid="button-zoom-in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary"
          onClick={handleZoomOut}
          data-testid="button-zoom-out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary"
          onClick={handleRecenter}
          data-testid="button-recenter"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <Card className="absolute bottom-4 left-4 z-10 p-4 shadow-lg" data-testid="map-legend">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Legend</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span>Verified Reports</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <span>Pending (High Trust)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span>Pending (Low Trust)</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t space-y-1">
          <div className="text-xs font-medium mb-2">Hazard Types:</div>
          <div className="flex flex-wrap gap-1">
            <Badge className={`${getHazardColor('High Waves')} text-white text-xs`}>High Waves</Badge>
            <Badge className={`${getHazardColor('Coastal Flooding')} text-white text-xs`}>Flooding</Badge>
            <Badge className={`${getHazardColor('Tsunami Sighting')} text-white text-xs`}>Tsunami</Badge>
            <Badge className={`${getHazardColor('Abnormal Tide')} text-white text-xs`}>Abnormal Tide</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
