import { performanceStats } from "@/lib/data";
import type { PerformanceStat } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PerformanceSnapshotProps {
  stats?: PerformanceStat[];
}

export function PerformanceSnapshot({
  stats = performanceStats,
}: PerformanceSnapshotProps) {
  return (
    <Card className="shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-900">Performance Snapshot</CardTitle>
        <CardDescription className="text-sm">Key highlights this term</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stats.map(({ label, value, sub }) => (
            <div key={label} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-700">{label}</p>
                <p className="text-xs text-slate-500">{sub}</p>
              </div>
              <div className="text-lg font-semibold text-slate-900">
                {value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
