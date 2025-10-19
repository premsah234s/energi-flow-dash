import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Zap } from "lucide-react";

interface PeakPredictionProps {
  predictions: Array<{ hour: number; predictedUsage: number }>;
}

export function PeakPrediction({ predictions }: PeakPredictionProps) {
  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Peak Usage Prediction</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          AI-powered forecasting for upcoming peak hours
        </p>

        <div className="space-y-3">
          {predictions.map((pred, index) => (
            <div
              key={pred.hour}
              className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {pred.hour}:00 - {pred.hour + 1}:00
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Predicted peak #{index + 1}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {pred.predictedUsage.toFixed(2)} kWh
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
