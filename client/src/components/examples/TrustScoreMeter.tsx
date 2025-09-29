import TrustScoreMeter from '../TrustScoreMeter';

export default function TrustScoreMeterExample() {
  return (
    <div className="p-8 flex gap-8 items-center">
      <TrustScoreMeter score={85} size="sm" />
      <TrustScoreMeter score={65} size="md" />
      <TrustScoreMeter score={35} size="lg" />
    </div>
  );
}
