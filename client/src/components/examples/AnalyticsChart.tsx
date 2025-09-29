import AnalyticsChart from '../AnalyticsChart';

const trendData = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 52 },
  { name: 'Mar', value: 48 },
  { name: 'Apr', value: 61 },
  { name: 'May', value: 55 },
  { name: 'Jun', value: 67 },
];

const hazardData = [
  { name: 'High Waves', value: 45 },
  { name: 'Flooding', value: 30 },
  { name: 'Tsunami', value: 5 },
  { name: 'Abnormal Tide', value: 20 },
];

const regionData = [
  { name: 'Chennai', value: 120 },
  { name: 'Mumbai', value: 95 },
  { name: 'Goa', value: 78 },
  { name: 'Kerala', value: 65 },
];

export default function AnalyticsChartExample() {
  return (
    <div className="p-8 space-y-6">
      <AnalyticsChart
        type="line"
        title="Report Trends (6 Months)"
        data={trendData}
        dataKey="value"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}
