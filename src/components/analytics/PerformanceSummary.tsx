import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Target, AlertTriangle } from "lucide-react";

const summaries = [
  {
    title: "Overall Trend",
    value: "Improving",
    description: "+8% growth over last 3 semesters",
    icon: ArrowUpRight,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Strongest Subject",
    value: "Mathematics",
    description: "Consistent A- average",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Weakest Subject",
    value: "Physics",
    description: "Currently averaging C+",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Avg. Improvement",
    value: "+0.15 GPA",
    description: "Per semester averge",
    icon: ArrowUpRight,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

export function PerformanceSummary() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {summaries.map((summary, i) => (
        <Card key={i} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{summary.title}</CardTitle>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${summary.bgColor}`}>
              <summary.icon className={`h-4 w-4 ${summary.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{summary.value}</div>
            <p className="text-xs font-medium text-slate-500 mt-1">{summary.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
