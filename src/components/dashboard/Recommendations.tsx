import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles } from "lucide-react";

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">AI Recommendations</h3>
          </div>
          <Badge variant="secondary" className="energy-gradient text-white">
            Smart Insights
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Personalized tips to reduce energy consumption
        </p>

        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 rounded-lg bg-card/50 border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 rounded-full bg-accent/10">
                  <Lightbulb className="h-4 w-4 text-accent" />
                </div>
              </div>
              <p className="text-sm leading-relaxed">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
