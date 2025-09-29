import VerificationPanel from '../VerificationPanel';

const mockReport = {
  id: 'RPT-001',
  type: 'High Waves',
  description: 'Unusually high waves observed near Marina Beach. Water level is rising rapidly and approaching the shoreline. Several fishing boats have been advised to return to harbor.',
  location: 'Chennai, Tamil Nadu',
  latitude: 13.0827,
  longitude: 80.2707,
  timestamp: '2024-01-15T10:30:00Z',
  trustScore: 85,
  imageUrl: '/api/placeholder/400/300',
  reporterName: 'Rajesh Kumar'
};

export default function VerificationPanelExample() {
  return (
    <div className="p-8 max-w-md h-screen">
      <VerificationPanel
        report={mockReport}
        onVerify={(id) => console.log('Verify:', id)}
        onEscalate={(id) => console.log('Escalate:', id)}
        onDismiss={(id) => console.log('Dismiss:', id)}
      />
    </div>
  );
}
