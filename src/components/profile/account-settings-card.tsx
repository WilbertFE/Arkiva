import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldAlert, LogOut, KeyRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ProfileUser, User } from "@/lib/types";
import { signOut } from "next-auth/react";


export function AccountSettingsCard({ user }: { user: User }) {
  const date = new Date(user.created_at);
  const updatedDate = new Date(user.updated_at);

  const formatted = new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedUpdated = new Date(updatedDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rows: {
    label: string;
    value: React.ReactNode;
    action?: React.ReactNode;
  }[] = [
      {
        label: "Password",
        value: (
          <span className="text-[13px] text-muted-foreground">
            Last changed {formattedUpdated}
          </span>
        ),

      },
      {
        label: "Email verification",
        value: (
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--success)]">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Verified
          </span>
        ),
      },
      {
        label: "Account created",
        value: (
          <span className="text-[13px] text-foreground">
            {formatted}
          </span>
        ),
      },
    ];

  return (
    <Card className="shadow-sm">
      {/* Card header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          Account Settings
        </CardTitle>
        <CardDescription className="text-sm">
          Manage your password, verification, and account info.
        </CardDescription>
      </CardHeader>

      {/* Rows */}
      <CardContent className="p-0 sm:p-0">
        <ul className="divide-y divide-slate-100">
          {rows.map(({ label, value, action }) => (
            <li
              key={label}
              className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-slate-50/50"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <div className="mt-1">{value}</div>
              </div>
              {action && <div className="shrink-0">{action}</div>}
            </li>
          ))}
        </ul>

        {/* Logout — destructive zone */}
        <div className="border-t border-slate-100 px-6 py-5 bg-red-50/30 rounded-b-lg">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Sign out</p>
              <p className="text-sm text-slate-500 mt-1">
                You will be signed out of all devices.
              </p>
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              variant="destructive"
              className="mt-3 gap-2 text-sm sm:mt-0 cursor-pointer"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
