"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { PerformanceSummary } from "@/components/analytics/PerformanceSummary";
import { PerformanceTrend } from "@/components/analytics/PerformanceTrend";
import { PredictionCards } from "@/components/analytics/PredictionCards";
import { StudyRecommendations } from "@/components/analytics/StudyRecommendations";

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics">
      <div className="flex flex-col gap-8 w-full">
        <AnalyticsHeader />
        
        {/* Top: Insight / Prediction Cards */}
        <PredictionCards />

        {/* Grid split: 2/3 + 1/3 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PerformanceTrend />
          </div>
          
          <div className="flex flex-col gap-6">
            <PerformanceSummary />
            <StudyRecommendations />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
