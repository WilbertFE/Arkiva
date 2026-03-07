import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettings } from "@/components/settings/account-settings";
import { PasswordSettings } from "@/components/settings/password-settings";
import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { AccountManagement } from "@/components/settings/account-management";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Settings
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account, security, appearance, and notification
            preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <AccountSettings />
            <PasswordSettings />
            <AccountManagement />
          </div>
          
          <div className="flex flex-col gap-6">
            <AppearanceSettings />
            <NotificationSettings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
