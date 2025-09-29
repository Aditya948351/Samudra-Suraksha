import HazardReportForm from '../HazardReportForm';

export default function HazardReportFormExample() {
  return (
    <div className="p-8">
      <HazardReportForm
        onSubmit={(report) => console.log('Report submitted:', report)}
      />
    </div>
  );
}
