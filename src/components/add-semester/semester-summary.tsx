import { TrendingUp, Percent, BookOpen } from "lucide-react";
import type { SubjectEntry } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const GRADE_POINTS: Record<string, number> = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, E: 0.0 };

function calcSummary(subjects: SubjectEntry[]) {
  const valid = subjects.filter((s) => s.name && s.score !== "" && s.grade && s.credits !== "");

  if (valid.length === 0) return { gpa: "—", avgScore: "—", total: 0 };

  const totalCredits = valid.reduce((sum, s) => sum + Number(s.credits), 0);
  const weightedGrade = valid.reduce(
    (sum, s) => sum + (GRADE_POINTS[s.grade] ?? 0) * Number(s.credits),
    0
  );
  const avgScore =
    valid.reduce((sum, s) => sum + Number(s.score), 0) / valid.length;

  return {
    gpa: totalCredits > 0 ? (weightedGrade / totalCredits).toFixed(2) : "—",
    avgScore: avgScore.toFixed(1),
    total: valid.length,
  };
}

interface SemesterSummaryProps {
  subjects: SubjectEntry[];
}

export function SemesterSummary({ subjects }: SemesterSummaryProps) {
  const { gpa, avgScore, total } = calcSummary(subjects);

  const stats = [
    { label: "GPA", value: gpa, icon: TrendingUp, iconColor: "text-blue-600", iconBg: "bg-blue-100" },
    { label: "Average Score", value: avgScore !== "—" ? `${avgScore}%` : "—", icon: Percent, iconColor: "text-emerald-600", iconBg: "bg-emerald-100" },
    { label: "Total Subjects", value: String(total), icon: BookOpen, iconColor: "text-sky-600", iconBg: "bg-sky-100" },
  ] as const;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">Semester Summary</CardTitle>
        <CardDescription className="text-sm">
          Calculated from the subjects entered above.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map(({ label, value, icon: Icon, iconColor, iconBg }) => (
            <div key={label} className="flex flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:text-left bg-slate-50/50 first:rounded-tl-b transition-colors hover:bg-slate-50">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
              </span>
              <div>
                <p className="tabular text-2xl font-bold leading-none tracking-tight text-slate-900">
                  {value}
                </p>
                <p className="mt-1.5 text-xs font-medium text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
