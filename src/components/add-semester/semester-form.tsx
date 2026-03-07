"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SemesterInfo } from "@/components/add-semester/semester-info";
import { SubjectRow } from "@/components/add-semester/subject-row";
import { SemesterSummary } from "@/components/add-semester/semester-summary";
import { cn } from "@/lib/utils";
import type { SemesterInfo as SemesterInfoType, SubjectEntry } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function makeSubject(): SubjectEntry {
  return { id: crypto.randomUUID(), name: "", score: "", grade: "", credits: "" };
}

export function SemesterForm() {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const [info, setInfo] = useState<SemesterInfoType>({
    name: "",
    academicYear: "",
    gradeLevel: "",
    type: "",
  });

  const [subjects, setSubjects] = useState<SubjectEntry[]>([makeSubject()]);

  const handleInfoChange = useCallback(
    (field: keyof SemesterInfoType, value: string) =>
      setInfo((prev) => ({ ...prev, [field]: value })),
    []
  );

  const handleSubjectChange = useCallback(
    (id: string, field: keyof SubjectEntry, value: string) =>
      setSubjects((prev) =>
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      ),
    []
  );

  const addSubject = useCallback(() => {
    const next = makeSubject();
    setJustAddedId(next.id);
    setSubjects((prev) => [...prev, next]);
  }, []);

  // Scroll newly added row into view and focus its name input
  useEffect(() => {
    if (!justAddedId) return;
    const timer = setTimeout(() => {
      const el = listRef.current?.querySelector<HTMLElement>(
        `[data-row-id="${justAddedId}"] input`
      );
      el?.focus({ preventScroll: false });
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setJustAddedId(null);
    }, 50);
    return () => clearTimeout(timer);
  }, [justAddedId]);

  const removeSubject = useCallback(
    (id: string) => setSubjects((prev) => prev.filter((s) => s.id !== id)),
    []
  );

  const filledCount = subjects.filter((s) => s.name.trim()).length;

  return (
    <div className="flex flex-col gap-6 mt-6">
      <SemesterInfo info={info} onChange={handleInfoChange} />

      {/* Subjects card */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold text-slate-900">Subjects &amp; Grades</CardTitle>
            <CardDescription className="text-sm">
              {filledCount === 0
                ? "Add your subjects below."
                : `${filledCount} of ${subjects.length} subject${subjects.length !== 1 ? "s" : ""} filled in.`}
            </CardDescription>
          </div>
          <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
            {subjects.length} Subjects
          </div>
        </CardHeader>

        <CardContent>
          {/* Column headers — desktop only */}
          <div className="mb-3 hidden sm:grid sm:grid-cols-[20px_1fr_80px_80px_64px_36px] sm:gap-x-3 sm:px-0">
            {["", "Subject Name", "Score", "Grade", "Credits (SKS)", ""].map((h, i) => (
              <span
                key={i}
                className="text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows with enter animation */}
          <div ref={listRef} className="flex flex-col gap-3">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                data-row-id={subject.id}
                className={cn(
                  "transition-all duration-200 ease-out",
                  subject.id === justAddedId
                    ? "animate-in fade-in slide-in-from-bottom-1"
                    : ""
                )}
              >
                <SubjectRow
                  subject={subject}
                  index={index}
                  canRemove={subjects.length > 1}
                  onChange={handleSubjectChange}
                  onRemove={removeSubject}
                />
              </div>
            ))}
          </div>

          {/* Empty state hint — shown until at least one subject is filled */}
          {subjects.length === 1 && !subjects[0].name && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-5 py-4 text-sm text-slate-500">
              <BookOpen className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              Start by entering a subject name, then fill in the score — the grade is auto-calculated.
            </div>
          )}

          {/* Add row */}
          <div className="mt-6 flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSubject}
              className="gap-2 text-sm h-9"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add Subject
            </Button>
            {subjects.length >= 5 && (
              <span className="text-xs text-slate-500">
                {subjects.length} subjects added so far
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <SemesterSummary subjects={subjects} />

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end mt-4">
        <Button
          type="button"
          variant="outline"
          className="h-10 px-6 text-sm"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="button" className="h-10 px-6 text-sm bg-blue-600 hover:bg-blue-700">
          Save Semester
        </Button>
      </div>
    </div>
  );
}
