import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { EnergyReading } from "@/utils/energyData";

interface TimeSeriesChartProps {
  data: EnergyReading[];
  drillLevel: "week" | "day" | "hour";
}

export function TimeSeriesChart({ data, drillLevel }: TimeSeriesChartProps) {
  const formatXAxis = (value: string) => {
    if (drillLevel === "week") {
      return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else if (drillLevel === "day") {
      return value;
    }
    return new Date(value).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Energy Usage Over Time</h3>
        <p className="text-sm text-muted-foreground">
          Real-time consumption tracking ({drillLevel} view)
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            label={{ value: "kWh", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`${value.toFixed(2)} kWh`, "Usage"]}
            labelFormatter={(label) => formatXAxis(label)}
          />
          <Area
            type="monotone"
            dataKey="usage"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUsage)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
