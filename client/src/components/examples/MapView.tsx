import MapView from '../MapView';

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
  }
];

export default function MapViewExample() {
  return (
    <div className="h-screen">
      <MapView 
        reports={mockReports} 
        onReportClick={(report) => console.log('Report clicked:', report)}
      />
    </div>
  );
}
