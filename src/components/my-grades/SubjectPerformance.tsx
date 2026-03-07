import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const subjects = [
  { name: "Mathematics", score: 92, color: "bg-emerald-500" },
  { name: "Physics", score: 85, color: "bg-blue-500" },
  { name: "English Literature", score: 88, color: "bg-indigo-500" },
  { name: "Biology", score: 78, color: "bg-amber-500" },
  { name: "History", score: 95, color: "bg-purple-500" },
  { name: "Computer Science", score: 98, color: "bg-emerald-600" },
];

export function SubjectPerformance() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
        <CardDescription>Your average score in each subject area.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {subjects.map((subject, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">{subject.name}</span>
                <span className="text-sm font-semibold text-slate-900">{subject.score} / 100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full ${subject.color}`} 
                  style={{ width: `${subject.score}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
