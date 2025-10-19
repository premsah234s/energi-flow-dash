import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface EnergyGaugeProps {
  currentUsage: number;
  maxUsage?: number;
}

export function EnergyGauge({ currentUsage, maxUsage = 10 }: EnergyGaugeProps) {
  const [animatedUsage, setAnimatedUsage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedUsage(currentUsage);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentUsage]);

  const percentage = Math.min((animatedUsage / maxUsage) * 100, 100);
  const rotation = (percentage / 100) * 180 - 90;

  const getColor = () => {
    if (percentage < 50) return "hsl(var(--accent))";
    if (percentage < 75) return "hsl(var(--primary))";
    return "hsl(var(--destructive))";
  };

  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Current Usage</h3>
        <p className="text-sm text-muted-foreground">Real-time consumption gauge</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-48 h-24">
          {/* Gauge background */}
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke={getColor()}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
              className="transition-all duration-1000 ease-out"
            />
            {/* Needle */}
            <line
              x1="100"
              y1="80"
              x2="100"
              y2="30"
              stroke={getColor()}
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                transformOrigin: "100px 80px",
                transform: `rotate(${rotation}deg)`,
                transition: "transform 1s ease-out",
              }}
            />
            <circle cx="100" cy="80" r="6" fill={getColor()} />
          </svg>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold" style={{ color: getColor() }}>
            {animatedUsage.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground">kWh</div>
        </div>
        <div className="flex justify-between w-full text-xs text-muted-foreground px-4">
          <span>0</span>
          <span>{maxUsage} kWh</span>
        </div>
      </div>
    </Card>
  );
}
