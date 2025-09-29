import AlertCreator from '../AlertCreator';

export default function AlertCreatorExample() {
  return (
    <div className="p-8 max-w-2xl">
      <AlertCreator
        onSend={(alert) => console.log('Alert sent:', alert)}
      />
    </div>
  );
}
