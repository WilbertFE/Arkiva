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
      <div className="flex flex-col w-full">
        <AnalyticsHeader />
        <PerformanceSummary />
        
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <PerformanceTrend />
          <StudyRecommendations />
        </div>
        
        <PredictionCards />
      </div>
    </DashboardLayout>
  );
}
