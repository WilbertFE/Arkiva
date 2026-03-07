"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface NotifRow {
  key: string;
  label: string;
  description: string;
}

const ROWS: NotifRow[] = [
  {
    key: "email",
    label: "Email notifications",
    description: "Receive important updates and announcements via email.",
  },
  {
    key: "gpa",
    label: "GPA change alerts",
    description: "Get notified whenever your cumulative GPA changes.",
  },
  {
    key: "semester",
    label: "Semester reminders",
    description: "Reminders for upcoming semester start and end dates.",
  },
  {
    key: "weekly",
    label: "Weekly progress report",
    description: "A summary of your academic progress every Monday.",
  },
];

export function NotificationSettings() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    email: true,
    gpa: true,
    semester: false,
    weekly: false,
  });
  const [saved, setSaved] = useState(false);

  function toggle(key: string) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">Notifications</CardTitle>
        <CardDescription className="text-sm">
          Control which notifications you receive.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-0">
        <ul className="divide-y divide-slate-100">
          {ROWS.map(({ key, label, description }) => (
            <li key={key} className="flex items-center justify-between gap-6 px-6 py-4 transition-colors hover:bg-slate-50/50">
              <div className="min-w-0 pr-4">
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  {description}
                </p>
              </div>
              <Switch
                checked={prefs[key]}
                onCheckedChange={() => toggle(key)}
                aria-label={label}
                className="shrink-0 data-[state=checked]:bg-blue-600"
              />
            </li>
          ))}
        </ul>
        <div className="border-t border-slate-100 px-6 py-5 bg-slate-50/50 rounded-b-lg">
          <div className="flex items-center gap-4">
            <Button className="text-sm bg-blue-600 hover:bg-blue-700 h-10 px-6" onClick={() => setSaved(true)}>
              Save Preferences
            </Button>
            {saved && <span className="text-sm font-medium text-emerald-600 transition-opacity animate-in fade-in duration-300">Preferences saved successfully.</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
