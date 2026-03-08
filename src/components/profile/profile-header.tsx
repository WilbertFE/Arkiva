import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EditProfileDialog } from "./edit-profile-dialog";
import { useState } from "react";
import type { User } from "@/lib/types";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function ProfileHeader({ user }: { user: User }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const initials = getInitials(user.full_name);
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Avatar + info */}
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 shrink-0 ring-4 ring-slate-50">
            <AvatarFallback className="bg-blue-600 text-white text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex flex-col justify-center">
            <p className="text-lg font-bold tracking-tight text-slate-900 leading-none mb-1.5">
              {user.full_name}
            </p>
            <p className="text-sm font-medium text-slate-500 mb-2">
              {user.email}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                @{user.username}
              </span>
              <span
                className="hidden text-slate-300 sm:block"
                aria-hidden="true"
              >
                {user.class || "N/A"}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {user.school || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Edit button */}
        <Button
          variant="outline"
          className="w-full gap-2 text-sm h-10 px-5 sm:w-auto mt-2 sm:mt-0"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit Profile
        </Button>

        {/* Edit Dialog */}
        <EditProfileDialog
          user={user}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      </CardContent>
    </Card>
  );
}
