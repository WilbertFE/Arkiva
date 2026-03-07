import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ProfileUser } from "@/lib/types";

interface ProfileHeaderProps {
  user: ProfileUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Avatar + info */}
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 shrink-0 ring-4 ring-slate-50">
            <AvatarFallback className="bg-blue-600 text-white text-lg font-bold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex flex-col justify-center">
            <p className="text-lg font-bold tracking-tight text-slate-900 leading-none mb-1.5">
              {user.fullName}
            </p>
            <p className="text-sm font-medium text-slate-500 mb-2">
              {user.email}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                ID: {user.studentId}
              </span>
              <span
                className="hidden text-slate-300 sm:block"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="text-xs font-medium text-slate-600">
                {user.school}
              </span>
            </div>
          </div>
        </div>

        {/* Edit button */}
        <Button
          variant="outline"
          className="w-full gap-2 text-sm h-10 px-5 sm:w-auto mt-2 sm:mt-0"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
