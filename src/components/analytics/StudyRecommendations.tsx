import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle2, Clock, Zap } from "lucide-react";

const recommendations = [
  {
    id: 1,
    category: "Time Management",
    title: "Focus more study time on Physics",
    description: "Your Physics grades tend to dip after midterm week. Try scheduling 30 extra minutes of review every Tuesday and Thursday.",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    id: 2,
    category: "Consistency",
    title: "Maintain consistency in Mathematics",
    description: "You've found a great rhythm here. Keep using your current active recall strategies, as they are clearly working.",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    id: 3,
    category: "Strategy",
    title: "Review Biology lab concepts",
    description: "Your theoretical scores are high, but lab scores are dragging the average down. Spend more time reviewing practical applications.",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 4,
    category: "Habits",
    title: "Increase overall study time by 20 mins",
    description: "Data shows that students jumping from a 3.8 to a 4.0 average typically dedicate 20% more focused review time per day.",
    icon: BookOpen,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  }
];

export function StudyRecommendations() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Actionable Recommendations</CardTitle>
        <CardDescription>Personalized suggestions to optimize your study habits.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="flex gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className={`mt-1 flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full ${rec.bgColor}`}>
                <rec.icon className={`h-5 w-5 ${rec.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-slate-900">{rec.title}</h4>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${rec.bgColor} ${rec.color} opacity-80`}>
                    {rec.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
