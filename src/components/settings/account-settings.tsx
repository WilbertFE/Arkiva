"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { profileUser } from "@/lib/data";

export function AccountSettings() {
  const u = profileUser;
  const [values, setValues] = useState({
    fullName:  u.fullName,
    email:     u.email,
    studentId: u.studentId,
    school:    u.school,
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

  const fields: {
    label: string;
    key: keyof typeof values;
    type?: string;
    disabled?: boolean;
  }[] = [
    { label: "Full Name",   key: "fullName" },
    { label: "Email",       key: "email",     type: "email", disabled: true },
    { label: "Student ID",  key: "studentId", disabled: true },
    { label: "School Name", key: "school" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">Account Settings</CardTitle>
        <CardDescription className="text-sm">
          Update your name and school details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {fields.map(({ label, key, type = "text", disabled }) => (
              <div key={key} className="flex flex-col gap-2">
                <Label htmlFor={`acc-${key}`} className="text-sm font-medium text-slate-700">
                  {label}
                </Label>
                <Input
                  id={`acc-${key}`}
                  type={type}
                  value={values[key]}
                  onChange={handleChange(key)}
                  disabled={disabled}
                  className="text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
