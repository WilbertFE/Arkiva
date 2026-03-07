"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PasswordSettings() {
  const [values, setValues] = useState({
    current: "",
    next:    "",
    confirm: "",
  });
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleChange(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setSaved(false);
      setError("");
    };
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (values.next !== values.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (values.next.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSaved(true);
    setValues({ current: "", next: "", confirm: "" });
  }

  const fields: { label: string; key: keyof typeof values; placeholder: string }[] = [
    { label: "Current Password", key: "current", placeholder: "Enter current password" },
    { label: "New Password",     key: "next",    placeholder: "At least 8 characters" },
    { label: "Confirm Password", key: "confirm", placeholder: "Repeat new password" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">Password &amp; Security</CardTitle>
        <CardDescription className="text-sm">
          Change your password. Use at least 8 characters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {fields.map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-2">
                <Label htmlFor={`pwd-${key}`} className="text-sm font-medium text-slate-700">
                  {label}
                </Label>
                <div className="relative">
                  <Input
                    id={`pwd-${key}`}
                    type={show ? "text" : "password"}
                    value={values[key]}
                    onChange={handleChange(key)}
                    placeholder={placeholder}
                    className="pr-10 text-sm"
                    autoComplete="off"
                  />
                  {key === "current" && (
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" className="text-sm bg-blue-600 hover:bg-blue-700 h-10 px-6">
              Change Password
            </Button>
            {saved && <span className="text-sm font-medium text-emerald-600 transition-opacity animate-in fade-in duration-300">Password updated successfully.</span>}
            {error && <span className="text-sm font-medium text-red-600">{error}</span>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
