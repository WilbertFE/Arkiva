import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, CalendarDays, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Current GPA",
    value: "3.84",
    description: "+0.12 from last semester",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Highest GPA",
    value: "3.92",
    description: "Achieved in Fall 2023",
    icon: Award,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Total Subjects",
    value: "24",
    description: "Across 6 distinct fields",
    icon: BookOpen,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Total Semesters",
    value: "5",
    description: "2 semesters remaining",
    icon: CalendarDays,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
];

export function MyGradesStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat, i) => (
        <Card key={i} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
