import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, ShieldAlert, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const predictions = [
  {
    id: 1,
    title: "Projected Spring GPA",
    insight: "If your current study routine remains steady, you're on track to hit a 3.9 GPA next semester.",
    value: "3.90",
    icon: Sparkles,
    trend: "positive",
    confidence: "High",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100"
  },
  {
    id: 2,
    title: "Likely to Improve",
    insight: "Based on recent quizzes, your Biology grade is trending upwards and could reach an A-.",
    value: "Biology",
    icon: TrendingUp,
    trend: "positive",
    confidence: "Medium",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100"
  },
  {
    id: 3,
    title: "Needs Attention",
    insight: "Physics scores have flatlined. Historical data suggests you might drop to a C if not addressed.",
    value: "Physics",
    icon: ShieldAlert,
    trend: "negative",
    confidence: "High",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100"
  }
];

export function PredictionCards() {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              AI Insights & Predictions
            </CardTitle>
            <CardDescription className="mt-1">Forecasts based on your historical academic patterns.</CardDescription>
          </div>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Beta Feature</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {predictions.map((pred) => (
            <div key={pred.id} className={`rounded-xl border p-5 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow ${pred.borderColor}`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${pred.bgColor}`}>
                  <pred.icon className={`h-5 w-5 ${pred.color}`} />
                </div>
                <Badge variant="outline" className="text-xs text-slate-500 font-normal">
                  {pred.confidence} Confidence
                </Badge>
              </div>
              
              <h3 className="font-semibold text-slate-900 mb-1">{pred.title}</h3>
              <p className="text-2xl font-bold text-slate-900 mb-3">{pred.value}</p>
              
              <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                {pred.insight}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm font-medium text-indigo-600 cursor-pointer hover:text-indigo-700">
                View detailed breakdown
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
