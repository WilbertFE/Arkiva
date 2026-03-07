"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { SemesterInfo as SemesterInfoType } from "@/lib/types";

interface SemesterInfoProps {
  info: SemesterInfoType;
  onChange: (field: keyof SemesterInfoType, value: string) => void;
}

export function SemesterInfo({ info, onChange }: SemesterInfoProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">Semester Information</CardTitle>
        <CardDescription className="text-sm">
          Basic details about this semester.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Semester Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="semester-name" className="text-sm font-medium text-slate-700">
              Semester Name
            </Label>
            <Input
              id="semester-name"
              value={info.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="e.g. Semester 5"
              className="text-sm"
            />
          </div>

          {/* Academic Year */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="academic-year" className="text-sm font-medium text-slate-700">
              Academic Year
            </Label>
            <Input
              id="academic-year"
              value={info.academicYear}
              onChange={(e) => onChange("academicYear", e.target.value)}
              placeholder="e.g. 2024/2025"
              className="text-sm"
            />
          </div>

          {/* Grade Level */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="grade-level" className="text-sm font-medium text-slate-700">
              Grade Level / Class
            </Label>
            <Input
              id="grade-level"
              value={info.gradeLevel}
              onChange={(e) => onChange("gradeLevel", e.target.value)}
              placeholder="e.g. Grade 11"
              className="text-sm"
            />
          </div>

          {/* Semester Type */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="semester-type" className="text-sm font-medium text-slate-700">
              Semester Type
            </Label>
            <Select value={info.type} onValueChange={(v) => onChange("type", v)}>
              <SelectTrigger id="semester-type" className="text-sm w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="odd" className="text-sm">Odd Semester</SelectItem>
                <SelectItem value="even" className="text-sm">Even Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
