"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { gpaChartData } from "@/lib/data";
import type { GpaDataPoint } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// ─── Tooltip ──────────────────────────────────────────────────────────────────

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <p className="tabular text-lg font-bold text-slate-900">
        GPA: {payload[0].value.toFixed(2)}
      </p>
    </div>
  );
}

// ─── Chart ────────────────────────────────────────────────────────────────────

interface GpaChartProps {
  data?: GpaDataPoint[];
}

export function GpaChart({ data = gpaChartData }: GpaChartProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-slate-900">
            GPA Progression
          </CardTitle>
          <CardDescription className="text-sm">
            Cumulative trend across all semesters
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full bg-blue-600"
            aria-hidden="true"
          />
          <span className="text-sm font-medium text-slate-600">
            GPA
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGpaBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="semester"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                domain={[3.2, 4.0]}
                ticks={[3.2, 3.4, 3.6, 3.8, 4.0]}
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="gpa"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGpaBlue)"
                activeDot={{ r: 6, fill: "#2563eb", stroke: "#ffffff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
