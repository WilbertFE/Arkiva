import { TrendingUp, Award, BookMarked, Percent } from "lucide-react";
import { summaryStats } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SummaryCards() {
  const cards = [
    {
      label: "Current GPA",
      value: summaryStats.currentGpa,
      delta: "+0.05",
      deltaLabel: "vs last semester",
      icon: TrendingUp,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      label: "Highest GPA",
      value: summaryStats.highestGpa,
      delta: "Sem 4",
      deltaLabel: "personal best",
      icon: Award,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
    },
    {
      label: "Semesters",
      value: String(summaryStats.totalSemesters),
      delta: "2 yrs",
      deltaLabel: "completed",
      icon: BookMarked,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-100",
    },
    {
      label: "Avg Score",
      value: `${summaryStats.averageScore}%`,
      delta: "All subjects",
      deltaLabel: "combined",
      icon: Percent,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
      {cards.map((card, i) => (
        <Card key={i} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{card.label}</CardTitle>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${card.iconBg}`}>
              <card.icon className={`h-4 w-4 ${card.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{card.value}</div>
            <p className="text-xs font-medium text-slate-500 mt-1">
              <span className="text-slate-700">{card.delta}</span> {card.deltaLabel}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
