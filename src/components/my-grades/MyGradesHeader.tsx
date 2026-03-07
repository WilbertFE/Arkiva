import { GraduationCap } from "lucide-react";

export function MyGradesHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <GraduationCap className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Grades</h1>
      </div>
      <p className="text-slate-500">
        Review your detailed academic performance, track your overall progress, and analyze subject strengths.
      </p>
    </div>
  );
}
