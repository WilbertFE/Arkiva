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
      <div className="flex flex-col w-full">
        <MyGradesHeader />
        <MyGradesStats />
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <SubjectPerformance />
          <SemesterProgress />
        </div>
        
        <RecentGradesTable />
      </div>
    </DashboardLayout>
  );
}
