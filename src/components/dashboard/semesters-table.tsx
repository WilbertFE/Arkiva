import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { semesters } from "@/lib/data";
import type { Semester, SemesterStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<
  SemesterStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  Completed: {
    label: "Completed",
    variant: "default", // will style via cn
  },
  "In Progress": {
    label: "In Progress",
    variant: "secondary",
  },
  Upcoming: { 
    label: "Upcoming", 
    variant: "outline" 
  },
};

interface SemestersTableProps {
  data?: Semester[];
}

export function SemestersTable({ data = semesters }: SemestersTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-slate-900">
            Semester History
          </CardTitle>
          <CardDescription className="text-sm">
            Academic performance by semester
          </CardDescription>
        </div>
        <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
          {data.length} semesters
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {["Semester", "GPA", "Avg Score", "Status"].map((h) => (
                  <TableHead
                    key={h}
                    className="h-10 text-xs font-medium uppercase tracking-wider text-slate-500"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => {
                const status = statusConfig[row.status];
                return (
                  <TableRow
                    key={row.semester}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <TableCell className="py-4 text-sm font-medium text-slate-900">
                      {row.semester}
                    </TableCell>
                    <TableCell className="tabular py-4 text-sm font-semibold text-slate-900">
                      {row.gpa.toFixed(2)}
                    </TableCell>
                    <TableCell className="tabular py-4 text-sm text-slate-500">
                      {row.avgScore}%
                    </TableCell>
                    <TableCell className="py-4">
                      {row.status === "Completed" ? (
                        <Badge variant="default" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                          {status.label}
                        </Badge>
                      ) : row.status === "In Progress" ? (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          {status.label}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-500">
                          {status.label}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
