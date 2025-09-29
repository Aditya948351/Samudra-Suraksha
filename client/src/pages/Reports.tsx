import { useState } from 'react';
import ReportCard from '@/components/ReportCard';
import VerificationPanel from '@/components/VerificationPanel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

// TODO: Remove mock data - replace with real API calls
const mockReports = [
  {
    id: 'RPT-001',
    type: 'High Waves',
    description: 'Unusually high waves observed near Marina Beach. Water level is rising rapidly.',
    location: 'Chennai, Tamil Nadu',
    latitude: 13.0827,
    longitude: 80.2707,
    timestamp: '2024-01-15T10:30:00Z',
    trustScore: 85,
    verified: true,
    reporterName: 'Rajesh Kumar',
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: 'RPT-002',
    type: 'Coastal Flooding',
    description: 'Severe flooding in coastal residential areas. Multiple houses affected.',
    location: 'Pondicherry',
    latitude: 11.9139,
    longitude: 79.8145,
    timestamp: '2024-01-15T11:00:00Z',
    trustScore: 65,
    verified: false,
    reporterName: 'Priya Sharma'
  },
  {
    id: 'RPT-003',
    type: 'Abnormal Tide',
    description: 'Unusual tidal patterns observed. Water receding faster than normal.',
    location: 'Mangalore, Karnataka',
    latitude: 12.9141,
    longitude: 74.8560,
    timestamp: '2024-01-15T09:15:00Z',
    trustScore: 45,
    verified: false,
    reporterName: 'Amit Patel'
  },
  {
    id: 'RPT-004',
    type: 'Tsunami Sighting',
    description: 'Potential tsunami warning signs detected. Birds fleeing inland.',
    location: 'Goa',
    latitude: 15.2993,
    longitude: 74.1240,
    timestamp: '2024-01-15T08:00:00Z',
    trustScore: 92,
    verified: true,
    reporterName: 'Maria D\'Souza',
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: 'RPT-005',
    type: 'High Waves',
    description: 'High wave activity near Gateway of India. Tourists advised to stay away.',
    location: 'Mumbai, Maharashtra',
    latitude: 19.0760,
    longitude: 72.8777,
    timestamp: '2024-01-15T12:45:00Z',
    trustScore: 72,
    verified: false,
    reporterName: 'Suresh Menon'
  }
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = mockReports.filter(report => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && !report.verified) ||
      (filter === 'verified' && report.verified) ||
      (filter === 'high-priority' && report.trustScore >= 80);
    
    const matchesSearch = report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleVerify = (reportId: string) => {
    console.log('Verify report:', reportId);
    // TODO: Call API to verify report
  };

  const handleEscalate = (reportId: string) => {
    console.log('Escalate report:', reportId);
    // TODO: Call API to escalate report
  };

  const handleDismiss = (reportId: string) => {
    console.log('Dismiss report:', reportId);
    // TODO: Call API to dismiss report
  };

  return (
    <div className="h-screen flex">
      {/* Reports List */}
      <div className="w-2/5 border-r flex flex-col">
        <div className="p-6 border-b space-y-4">
          <h1 className="text-2xl font-bold">Hazard Reports</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-reports"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full" data-testid="select-filter">
                <SelectValue placeholder="Filter reports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="high-priority">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Report Cards */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {filteredReports.map(report => (
            <ReportCard
              key={report.id}
              id={report.id}
              type={report.type}
              description={report.description}
              location={report.location}
              timestamp={report.timestamp}
              trustScore={report.trustScore}
              imageUrl={report.imageUrl}
              verified={report.verified}
              onClick={() => setSelectedReport(report)}
            />
          ))}
          {filteredReports.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              No reports found
            </div>
          )}
        </div>
      </div>

      {/* Verification Panel */}
      <div className="flex-1 p-6">
        <VerificationPanel
          report={selectedReport}
          onVerify={handleVerify}
          onEscalate={handleEscalate}
          onDismiss={handleDismiss}
        />
      </div>
    </div>
  );
}
