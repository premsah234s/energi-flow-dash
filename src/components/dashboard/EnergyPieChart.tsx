import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ApplianceBreakdown } from "@/utils/energyData";

interface EnergyPieChartProps {
  data: ApplianceBreakdown[];
}

const COLORS = [
  "hsl(174, 60%, 51%)",
  "hsl(200, 98%, 48%)",
  "hsl(142, 76%, 36%)",
  "hsl(280, 60%, 50%)",
  "hsl(30, 80%, 50%)",
  "hsl(0, 70%, 50%)",
];

export function EnergyPieChart({ data }: EnergyPieChartProps) {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Appliance Breakdown</h3>
        <p className="text-sm text-muted-foreground">Energy consumption by category</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="usage"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => `${value} kWh`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
