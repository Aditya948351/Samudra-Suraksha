interface TrustScoreMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function TrustScoreMeter({ score, size = 'md' }: TrustScoreMeterProps) {
  const getColor = (score: number) => {
    if (score >= 80) return { bg: 'text-green-600', stroke: '#10b981' };
    if (score >= 50) return { bg: 'text-yellow-600', stroke: '#f59e0b' };
    return { bg: 'text-red-600', stroke: '#ef4444' };
  };

  const sizes = {
    sm: { dimension: 60, strokeWidth: 4, fontSize: 'text-sm' },
    md: { dimension: 80, strokeWidth: 6, fontSize: 'text-lg' },
    lg: { dimension: 120, strokeWidth: 8, fontSize: 'text-2xl' }
  };

  const { dimension, strokeWidth, fontSize } = sizes[size];
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" data-testid="trust-score-meter">
      <svg width={dimension} height={dimension} className="transform -rotate-90">
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke={color.stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${fontSize} font-bold ${color.bg}`}>
        <span>{score}</span>
        <span className="text-xs font-normal text-muted-foreground">Trust</span>
      </div>
    </div>
  );
}
