import AnalyticsChart from '@/components/AnalyticsChart';

// TODO: Remove mock data - replace with real API calls
const trendData = [
  { name: 'Jan', value: 145 },
  { name: 'Feb', value: 152 },
  { name: 'Mar', value: 148 },
  { name: 'Apr', value: 161 },
  { name: 'May', value: 155 },
  { name: 'Jun', value: 167 },
];

const hazardData = [
  { name: 'High Waves', value: 485 },
  { name: 'Coastal Flooding', value: 320 },
  { name: 'Tsunami Sighting', value: 52 },
  { name: 'Abnormal Tide', value: 210 },
  { name: 'Storm Surge', value: 180 },
];

const regionData = [
  { name: 'Tamil Nadu', value: 420 },
  { name: 'Maharashtra', value: 295 },
  { name: 'Goa', value: 178 },
  { name: 'Kerala', value: 265 },
  { name: 'Karnataka', value: 189 },
];

const trustScoreData = [
  { name: 'Mon', value: 68 },
  { name: 'Tue', value: 72 },
  { name: 'Wed', value: 65 },
  { name: 'Thu', value: 75 },
  { name: 'Fri', value: 70 },
  { name: 'Sat', value: 78 },
  { name: 'Sun', value: 73 },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6 h-screen overflow-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive insights and trends from coastal hazard reports
        </p>
      </div>

      {/* Full Width Chart */}
      <AnalyticsChart
        type="line"
        title="Report Volume Over Time (6 Months)"
        data={trendData}
        dataKey="value"
      />

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          type="pie"
          title="Hazard Type Distribution"
          data={hazardData}
          dataKey="value"
        />
        <AnalyticsChart
          type="bar"
          title="Reports by Region"
          data={regionData}
          dataKey="value"
        />
      </div>

      {/* Trust Score Trends */}
      <AnalyticsChart
        type="line"
        title="Average Trust Score Trends (Last 7 Days)"
        data={trustScoreData}
        dataKey="value"
      />
    </div>
  );
}
