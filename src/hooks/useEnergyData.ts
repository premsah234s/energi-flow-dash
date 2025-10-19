import { useState, useMemo, useEffect } from "react";
import {
  generateEnergyData,
  calculateStats,
  getApplianceBreakdown,
  predictPeakUsage,
  getRecommendations,
  EnergyReading,
} from "@/utils/energyData";

export interface OLAPFilters {
  days: number;
  hourRange: [number, number];
  appliance: string | null;
}

export function useEnergyData() {
  const [filters, setFilters] = useState<OLAPFilters>({
    days: 7,
    hourRange: [0, 23],
    appliance: null,
  });

  const [drillLevel, setDrillLevel] = useState<"week" | "day" | "hour">("week");

  // Generate base data
  const baseData = useMemo(() => generateEnergyData(filters.days), [filters.days]);

  // Apply OLAP filters (Slice & Dice)
  const filteredData = useMemo(() => {
    return baseData.filter((reading) => {
      const hour = reading.hour;
      return hour >= filters.hourRange[0] && hour <= filters.hourRange[1];
    });
  }, [baseData, filters.hourRange]);

  // Drill down/up aggregation
  const aggregatedData = useMemo(() => {
    if (drillLevel === "week") {
      // Group by day
      const dayGroups = new Map<string, EnergyReading[]>();
      filteredData.forEach((reading) => {
        const date = new Date(reading.timestamp).toLocaleDateString();
        if (!dayGroups.has(date)) {
          dayGroups.set(date, []);
        }
        dayGroups.get(date)!.push(reading);
      });

      return Array.from(dayGroups.entries()).map(([date, readings]) => ({
        timestamp: date,
        usage: Number(
          (readings.reduce((sum, r) => sum + r.usage, 0) / readings.length).toFixed(2)
        ),
        hour: 0,
      }));
    } else if (drillLevel === "day") {
      // Group by hour
      const hourGroups = new Map<number, EnergyReading[]>();
      filteredData.forEach((reading) => {
        if (!hourGroups.has(reading.hour)) {
          hourGroups.set(reading.hour, []);
        }
        hourGroups.get(reading.hour)!.push(reading);
      });

      return Array.from(hourGroups.entries()).map(([hour, readings]) => ({
        timestamp: `${hour}:00`,
        usage: Number(
          (readings.reduce((sum, r) => sum + r.usage, 0) / readings.length).toFixed(2)
        ),
        hour,
      }));
    } else {
      // Hour level - return as is
      return filteredData;
    }
  }, [filteredData, drillLevel]);

  const stats = useMemo(() => calculateStats(filteredData), [filteredData]);
  const applianceBreakdown = useMemo(() => getApplianceBreakdown(), []);
  const peakPredictions = useMemo(() => predictPeakUsage(filteredData), [filteredData]);
  const recommendations = useMemo(() => getRecommendations(stats), [stats]);

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch new data
      // For now, we'll just trigger a re-render
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    data: aggregatedData,
    rawData: filteredData,
    stats,
    applianceBreakdown,
    peakPredictions,
    recommendations,
    filters,
    setFilters,
    drillLevel,
    setDrillLevel,
  };
}
