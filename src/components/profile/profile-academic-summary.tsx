import { TrendingUp, Award, BookMarked, Percent } from "lucide-react";
import { summaryStats } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const cards = [
  {
    label: "Current GPA",
    value: summaryStats.currentGpa,
    sub: "This semester",
    icon: TrendingUp,
    iconColor: "text-primary",
    iconBg: "bg-primary/8",
  },
  {
    label: "Highest GPA",
    value: summaryStats.highestGpa,
    sub: "Personal best",
    icon: Award,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/8",
  },
  {
    label: "Semesters",
    value: String(summaryStats.totalSemesters),
    sub: "Completed",
    icon: BookMarked,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/8",
  },
  {
    label: "Avg Score",
    value: `${summaryStats.averageScore}%`,
    sub: "All subjects",
    icon: Percent,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/8",
  },
] as const;

export function ProfileAcademicSummary() {
  return (
    <Card className="shadow-sm">
      {/* Card header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          Academic Summary
        </CardTitle>
        <CardDescription className="text-sm">
          Cumulative performance across all semesters.
        </CardDescription>
      </CardHeader>

      {/* Stat grid */}
      <CardContent className="p-0 sm:p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x lg:divide-y-0 lg:divide-x divide-slate-100">
          {cards.map(({ label, value, sub, icon: Icon, iconColor, iconBg }) => (
            <div key={label} className="flex flex-col gap-3 px-6 py-6 transition-colors hover:bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </span>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
                >
                  <Icon
                    className={`h-4 w-4 ${iconColor}`}
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div>
                <p className="tabular text-2xl font-bold leading-none tracking-tight text-slate-900">
                  {value}
                </p>
                <p className="text-xs text-slate-500 mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
