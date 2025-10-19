import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { OLAPFilters } from "@/hooks/useEnergyData";

interface OLAPControlsProps {
  filters: OLAPFilters;
  setFilters: (filters: OLAPFilters) => void;
  drillLevel: "week" | "day" | "hour";
  setDrillLevel: (level: "week" | "day" | "hour") => void;
}

export function OLAPControls({
  filters,
  setFilters,
  drillLevel,
  setDrillLevel,
}: OLAPControlsProps) {
  const drillLevels: Array<"week" | "day" | "hour"> = ["week", "day", "hour"];

  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            OLAP Controls
          </h3>
        </div>

        {/* Slice: Days selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Time Range (Days)</label>
            <Badge variant="secondary">{filters.days} days</Badge>
          </div>
          <div className="flex gap-2">
            {[1, 3, 7, 14, 30].map((days) => (
              <Button
                key={days}
                size="sm"
                variant={filters.days === days ? "default" : "outline"}
                onClick={() => setFilters({ ...filters, days })}
                className={filters.days === days ? "energy-gradient" : ""}
              >
                {days}d
              </Button>
            ))}
          </div>
        </div>

        {/* Dice: Hour range filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Hour Range Filter</label>
            <Badge variant="secondary">
              {filters.hourRange[0]}:00 - {filters.hourRange[1]}:00
            </Badge>
          </div>
          <Slider
            min={0}
            max={23}
            step={1}
            value={filters.hourRange}
            onValueChange={(value) =>
              setFilters({ ...filters, hourRange: value as [number, number] })
            }
            className="w-full"
          />
        </div>

        {/* Drill Down/Up controls */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Drill Level
          </label>
          <div className="flex gap-2">
            {drillLevels.map((level) => (
              <Button
                key={level}
                size="sm"
                variant={drillLevel === level ? "default" : "outline"}
                onClick={() => setDrillLevel(level)}
                className={drillLevel === level ? "accent-gradient" : ""}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {drillLevel === "week" && "Viewing daily averages"}
            {drillLevel === "day" && "Viewing hourly averages"}
            {drillLevel === "hour" && "Viewing detailed hourly data"}
          </p>
        </div>
      </div>
    </Card>
  );
}
