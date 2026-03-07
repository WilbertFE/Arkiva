import { LineChart } from "lucide-react";

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
          <LineChart className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics & Insights</h1>
      </div>
      <p className="text-slate-500">
        Discover hidden patterns in your academic performance, view future predictions, and get AI-driven study recommendations.
      </p>
    </div>
  );
}
