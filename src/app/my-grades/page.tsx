"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { MyGradesHeader } from "@/components/my-grades/MyGradesHeader";
import { MyGradesStats } from "@/components/my-grades/MyGradesStats";
import { SubjectPerformance } from "@/components/my-grades/SubjectPerformance";
import { SemesterProgress } from "@/components/my-grades/SemesterProgress";
import { RecentGradesTable } from "@/components/my-grades/RecentGradesTable";

export default function MyGradesPage() {
  return (
    <DashboardLayout title="My Grades">
      <div className="flex flex-col gap-8 w-full">
        <MyGradesHeader />
        <MyGradesStats />
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <SubjectPerformance />
          </div>
          <div className="flex flex-col gap-6">
            <SemesterProgress />
          </div>
        </div>
        
        <RecentGradesTable />
      </div>
    </DashboardLayout>
  );
}
