"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/lib/types";


export function PersonalInfoCard({ user }: { user: User }) {

  const [values, setValues] = useState({
    fullName: user.full_name,
    school: user.school || "",
    gradeClass: user.class || "",
  });

  const [saved, setSaved] = useState(false);

  function handleChange(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      setValues((v) => ({ ...v, [key]: value }));
      setSaved(false);
    };
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  const fields: { label: string; key: keyof typeof values; type?: string }[] = [
    { label: "Full Name", key: "fullName" },
    { label: "School Name", key: "school" },
    { label: "Grade / Class", key: "gradeClass" },
  ];

  const gradeOptions = [
    "Grade 10",
    "Grade 11 MIPA",
    "Grade 11 IPS",
    "Grade 12 MIPA",
    "Grade 12 IPS",
  ];

  return (
    <Card className="shadow-sm">
      {/* Card header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          Personal Information
        </CardTitle>
        <CardDescription className="text-sm">
          Update your name, and school details.
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
                {key === "gradeClass" ? (
                  <Select
                    value={values[key]}
                    onValueChange={handleChange(key)}
                  >
                    <SelectTrigger id={`field-${key}`} className="text-sm">
                      <SelectValue placeholder="Select your grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={`field-${key}`}
                    type={type}
                    value={values[key]}
                    onChange={handleChange(key) as React.ChangeEventHandler<HTMLInputElement>}
                    className="text-sm"
                  />
                )}
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
