"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sun, Moon, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Theme = "light" | "dark" | "system";

const THEMES: { value: Theme; label: string; icon: React.ElementType; description: string }[] = [
  { value: "light",  label: "Light",  icon: Sun,     description: "Clean white interface" },
  { value: "dark",   label: "Dark",   icon: Moon,    description: "Easy on the eyes at night" },
  { value: "system", label: "System", icon: Monitor, description: "Follows your OS setting" },
];

export function AppearanceSettings() {
  const [theme, setTheme] = useState<Theme>("light");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">Appearance</CardTitle>
        <CardDescription className="text-sm">
          Choose how GradeTracker looks to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {THEMES.map(({ value, label, icon: Icon, description }) => {
            const active = theme === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => { setTheme(value); setSaved(false); }}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                  active
                    ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                )}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className={cn("text-sm font-semibold", active ? "text-slate-900" : "text-slate-700")}>
                    {label}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{description}</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Button className="text-sm bg-blue-600 hover:bg-blue-700 h-10 px-6" onClick={handleSave}>
            Save Preference
          </Button>
          {saved && <span className="text-sm font-medium text-emerald-600 transition-opacity animate-in fade-in duration-300">Preference saved successfully.</span>}
        </div>
      </CardContent>
    </Card>
  );
}
