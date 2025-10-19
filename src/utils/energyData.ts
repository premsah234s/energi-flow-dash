export interface EnergyReading {
  timestamp: string;
  usage: number;
  hour: number;
  appliance?: string;
}

export interface ApplianceBreakdown {
  name: string;
  usage: number;
  percentage: number;
}

// Generate realistic energy usage data with daily patterns
export function generateEnergyData(days: number = 7): EnergyReading[] {
  const data: EnergyReading[] = [];
  const now = new Date();
  const msPerHour = 1000 * 60 * 60;

  for (let d = days - 1; d >= 0; d--) {
    for (let h = 0; h < 24; h++) {
      const timestamp = new Date(now.getTime() - d * 24 * msPerHour - (23 - h) * msPerHour);
      
      // Base usage pattern (lower at night, higher during day)
      let baseUsage = 2; // kWh base
      
      // Morning peak (6-9 AM)
      if (h >= 6 && h <= 9) {
        baseUsage += 3 + Math.random() * 2;
      }
      // Evening peak (17-22 PM)
      else if (h >= 17 && h <= 22) {
        baseUsage += 4 + Math.random() * 3;
      }
      // Daytime moderate
      else if (h >= 10 && h <= 16) {
        baseUsage += 2 + Math.random() * 1.5;
      }
      // Night low
      else {
        baseUsage += Math.random() * 1;
      }

      // Weekend variation (slightly higher usage)
      const dayOfWeek = timestamp.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        baseUsage *= 1.2;
      }

      data.push({
        timestamp: timestamp.toISOString(),
        usage: Number(baseUsage.toFixed(2)),
        hour: h,
      });
    }
  }

  return data.reverse();
}

export function getApplianceBreakdown(): ApplianceBreakdown[] {
  const breakdown = [
    { name: "HVAC", usage: 450, percentage: 35 },
    { name: "Water Heater", usage: 300, percentage: 23 },
    { name: "Lighting", usage: 200, percentage: 16 },
    { name: "Kitchen", usage: 150, percentage: 12 },
    { name: "Electronics", usage: 120, percentage: 9 },
    { name: "Other", usage: 65, percentage: 5 },
  ];
  return breakdown;
}

export function calculateStats(data: EnergyReading[]) {
  if (data.length === 0) return { total: 0, average: 0, peak: 0, peakTime: "" };

  const total = data.reduce((sum, reading) => sum + reading.usage, 0);
  const average = total / data.length;
  const peakReading = data.reduce((max, reading) => 
    reading.usage > max.usage ? reading : max
  );

  return {
    total: Number(total.toFixed(2)),
    average: Number(average.toFixed(2)),
    peak: peakReading.usage,
    peakTime: new Date(peakReading.timestamp).toLocaleString(),
  };
}

export function predictPeakUsage(data: EnergyReading[]): { hour: number; predictedUsage: number }[] {
  // Simple prediction based on historical averages per hour
  const hourlyAverages = new Map<number, number[]>();
  
  data.forEach(reading => {
    if (!hourlyAverages.has(reading.hour)) {
      hourlyAverages.set(reading.hour, []);
    }
    hourlyAverages.get(reading.hour)!.push(reading.usage);
  });

  const predictions = Array.from(hourlyAverages.entries()).map(([hour, usages]) => {
    const avg = usages.reduce((sum, u) => sum + u, 0) / usages.length;
    // Add slight upward trend for prediction
    const predictedUsage = Number((avg * 1.05).toFixed(2));
    return { hour, predictedUsage };
  });

  return predictions.sort((a, b) => b.predictedUsage - a.predictedUsage).slice(0, 3);
}

export function getRecommendations(stats: ReturnType<typeof calculateStats>): string[] {
  const recommendations = [];

  if (stats.average > 4) {
    recommendations.push("Your average consumption is high. Consider scheduling high-energy tasks during off-peak hours.");
  }

  if (stats.peak > 8) {
    recommendations.push("Peak usage detected. Avoid running multiple high-power appliances simultaneously.");
  }

  recommendations.push("Install smart thermostats to optimize HVAC usage and reduce costs by up to 23%.");
  recommendations.push("Switch to LED lighting to reduce lighting costs by 75%.");
  recommendations.push("Use power strips to eliminate phantom loads from electronics.");

  return recommendations;
}
