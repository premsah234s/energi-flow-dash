import { useEnergyData } from "@/hooks/useEnergyData";
import { StatCard } from "@/components/dashboard/StatCard";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { EnergyBarChart } from "@/components/dashboard/EnergyBarChart";
import { EnergyPieChart } from "@/components/dashboard/EnergyPieChart";
import { EnergyGauge } from "@/components/dashboard/EnergyGauge";
import { OLAPControls } from "@/components/dashboard/OLAPControls";
import { PeakPrediction } from "@/components/dashboard/PeakPrediction";
import { Recommendations } from "@/components/dashboard/Recommendations";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { Zap, TrendingUp, Clock, Activity } from "lucide-react";
import { ThemeProvider } from "next-themes";

function DashboardContent() {
  const {
    data,
    rawData,
    stats,
    applianceBreakdown,
    peakPredictions,
    recommendations,
    filters,
    setFilters,
    drillLevel,
    setDrillLevel,
  } = useEnergyData();

  const currentUsage = rawData.length > 0 ? rawData[rawData.length - 1].usage : 0;

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Energy Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time home energy monitoring with BI capabilities
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Usage"
          value={`${stats.total} kWh`}
          subtitle={`Last ${filters.days} days`}
          icon={Zap}
          gradient="energy"
        />
        <StatCard
          title="Average Usage"
          value={`${stats.average} kWh`}
          subtitle="Per hour"
          icon={Activity}
          gradient="accent"
        />
        <StatCard
          title="Peak Usage"
          value={`${stats.peak} kWh`}
          subtitle={stats.peakTime}
          icon={TrendingUp}
          trend="up"
          gradient="energy"
        />
        <StatCard
          title="Current"
          value={`${currentUsage.toFixed(2)} kWh`}
          subtitle="Live monitoring"
          icon={Clock}
          gradient="accent"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <TimeSeriesChart data={data} drillLevel={drillLevel} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EnergyBarChart data={applianceBreakdown} />
            <EnergyPieChart data={applianceBreakdown} />
          </div>
        </div>

        {/* Right Column - Controls & Insights */}
        <div className="space-y-6">
          <EnergyGauge currentUsage={currentUsage} />
          
          <OLAPControls
            filters={filters}
            setFilters={setFilters}
            drillLevel={drillLevel}
            setDrillLevel={setDrillLevel}
          />
        </div>
      </div>

      {/* Bottom Row - Predictions & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PeakPrediction predictions={peakPredictions} />
        <Recommendations recommendations={recommendations} />
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <DashboardContent />
    </ThemeProvider>
  );
};

export default Index;
