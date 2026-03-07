"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { semester: "Fall '22", expected: 3.1, actual: 3.2 },
  { semester: "Spring '23", expected: 3.3, actual: 3.4 },
  { semester: "Fall '23", expected: 3.6, actual: 3.9 },
  { semester: "Spring '24", expected: 3.8, actual: 3.7 },
  { semester: "Fall '24", expected: 3.7, actual: 3.8 },
];

export function PerformanceTrend() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Expected vs Actual GPA</CardTitle>
        <CardDescription>Compare your projected performance against your actual results.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="semester" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                dy={10}
              />
              <YAxis 
                domain={[2.0, 4.0]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Bar dataKey="expected" name="Expected" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="actual" name="Actual" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
