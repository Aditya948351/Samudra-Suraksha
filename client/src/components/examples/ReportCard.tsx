import ReportCard from '../ReportCard';

export default function ReportCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ReportCard
        id="1"
        type="High Waves"
        description="Unusually high waves observed near Marina Beach. Water level is rising rapidly."
        location="Chennai, Tamil Nadu"
        timestamp="2024-01-15T10:30:00Z"
        trustScore={85}
        verified={true}
        onClick={() => console.log('Report card clicked')}
      />
    </div>
  );
}
