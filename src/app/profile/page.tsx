import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ProfileHeader } from "@/components/profile/profile-header";
import { PersonalInfoCard } from "@/components/profile/personal-info-card";
import { ProfileAcademicSummary } from "@/components/profile/profile-academic-summary";
import { AccountSettingsCard } from "@/components/profile/account-settings-card";
import { profileUser } from "@/lib/data";

export default function ProfilePage() {
  return (
    <DashboardLayout title="Your Profile">
      <div className="flex flex-col gap-8">
        {/* Page heading */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Your Profile
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information, academic record, and account
            settings.
          </p>
        </div>

        {/* Profile header card */}
        <ProfileHeader user={profileUser} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Personal info form */}
          <div className="flex flex-col gap-6">
            <PersonalInfoCard user={profileUser} />
          </div>

          <div className="flex flex-col gap-6">
            {/* Academic summary */}
            <ProfileAcademicSummary />

            {/* Account settings */}
            <AccountSettingsCard user={profileUser} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
