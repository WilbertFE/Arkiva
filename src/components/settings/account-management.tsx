import { Button } from "@/components/ui/button";
import { LogOut, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function AccountManagement() {
  return (
    <Card className="shadow-sm border-red-100">
      <CardHeader className="pb-4 border-b border-red-100 bg-red-50/30 rounded-t-lg">
        <CardTitle className="text-base font-semibold text-red-700">Danger Zone</CardTitle>
        <CardDescription className="text-sm text-red-600/80">
          Manage your session and account data.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 sm:p-0">
        {/* Sign out row */}
        <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-slate-50/50">
          <div>
            <p className="text-sm font-semibold text-slate-900">Sign out</p>
            <p className="mt-1 text-sm text-slate-500">
              You will be signed out of all devices.
            </p>
          </div>
          <Button variant="outline" className="mt-3 gap-2 text-sm sm:mt-0 font-medium">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </Button>
        </div>

        {/* Delete account row */}
        <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-red-50/50">
          <div>
            <p className="text-sm font-semibold text-slate-900">Delete account</p>
            <p className="mt-1 text-sm text-slate-500">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <Button variant="destructive" className="mt-3 gap-2 text-sm sm:mt-0 bg-red-600 hover:bg-red-700">
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
