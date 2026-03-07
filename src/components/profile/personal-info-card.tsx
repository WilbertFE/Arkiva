"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ProfileUser } from "@/lib/types";

interface PersonalInfoCardProps {
  user: ProfileUser;
}

export function PersonalInfoCard({ user }: PersonalInfoCardProps) {
  const [values, setValues] = useState({
    fullName: user.fullName,
    email: user.email,
    studentId: user.studentId,
    school: user.school,
    gradeClass: user.gradeClass,
  });

  const [saved, setSaved] = useState(false);

  function handleChange(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setSaved(false);
    };
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  const fields: { label: string; key: keyof typeof values; type?: string }[] = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email", type: "email" },
    { label: "Student ID", key: "studentId" },
    { label: "School Name", key: "school" },
    { label: "Grade / Class", key: "gradeClass" },
  ];

  return (
    <Card className="shadow-sm">
      {/* Card header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          Personal Information
        </CardTitle>
        <CardDescription className="text-sm">
          Update your name, email, and school details.
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {fields.map(({ label, key, type = "text" }) => (
              <div key={key} className="flex flex-col gap-2">
                <Label
                  htmlFor={`field-${key}`}
                  className="text-sm font-medium text-slate-700"
                >
                  {label}
                </Label>
                <Input
                  id={`field-${key}`}
                  type={type}
                  value={values[key]}
                  onChange={handleChange(key)}
                  className="text-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" className="text-sm bg-blue-600 hover:bg-blue-700 h-10 px-6">
              Save Changes
            </Button>
            {saved && (
              <span className="text-sm font-medium text-emerald-600 transition-opacity animate-in fade-in duration-300">
                Changes saved successfully.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
