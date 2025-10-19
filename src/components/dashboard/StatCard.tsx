import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  gradient?: "energy" | "accent";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
  gradient = "energy",
}: StatCardProps) {
  const trendColors = {
    up: "text-red-500",
    down: "text-green-500",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="glass-card p-6 hover:shadow-xl transition-all duration-300 border-2">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          {subtitle && (
            <p className={`text-sm ${trendColors[trend]}`}>{subtitle}</p>
          )}
        </div>
        <div
          className={`p-3 rounded-xl ${
            gradient === "energy" ? "energy-gradient" : "accent-gradient"
          }`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );
}
