import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { GpaChart } from "@/components/dashboard/gpa-chart";
import { PerformanceSnapshot } from "@/components/dashboard/peformance-snapshot";
import { SemestersTable } from "@/components/dashboard/semesters-table";
import { currentUser } from "@/lib/data";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Overview">
      <div className="flex flex-col gap-8">
        {/* Welcome row */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Good morning, {currentUser.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {
              "Your GPA has improved every term — you're on track for Dean's List again."
            }
          </p>
        </div>

        {/* KPI cards */}
        <SummaryCards />

        {/* Main Content & Sidebar */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <GpaChart />
            <SemestersTable />
          </div>
          
          {/* Sidebar Column */}
          <div className="flex flex-col gap-6">
            <PerformanceSnapshot />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
