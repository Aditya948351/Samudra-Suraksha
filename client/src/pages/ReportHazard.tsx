import HazardReportForm from '@/components/HazardReportForm';

export default function ReportHazard() {
  const handleSubmit = (report: any) => {
    console.log('Hazard report submitted:', report);
    // TODO: Call API to submit report
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Report Coastal Hazard</h1>
          <p className="text-muted-foreground">
            Help protect our coastline by reporting hazards you observe
          </p>
        </div>
        <HazardReportForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
