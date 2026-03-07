import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentGrades = [
  { id: 1, subject: "Mathematics", semester: "Fall 2024", assignment: "95", midterm: "88", final: "92", average: "91.5", status: "Excellent" },
  { id: 2, subject: "Physics", semester: "Fall 2024", assignment: "82", midterm: "78", final: "86", average: "82.0", status: "Good" },
  { id: 3, subject: "English Literature", semester: "Fall 2024", assignment: "90", midterm: "85", final: "88", average: "87.6", status: "Very Good" },
  { id: 4, subject: "Biology", semester: "Fall 2024", assignment: "75", midterm: "72", final: "80", average: "76.4", status: "Average" },
  { id: 5, subject: "Computer Science", semester: "Spring 2024", assignment: "100", midterm: "95", final: "98", average: "98.2", status: "Outstanding" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Outstanding":
    case "Excellent":
      return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">{status}</Badge>;
    case "Very Good":
    case "Good":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">{status}</Badge>;
    case "Average":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export function RecentGradesTable() {
  return (
    <Card className="shadow-sm mt-8">
      <CardHeader>
        <CardTitle>Recent Grades Details</CardTitle>
        <CardDescription>A detailed breakdown of your recent subject scores.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-900 border-r">Subject</TableHead>
                <TableHead className="font-semibold text-slate-900">Semester</TableHead>
                <TableHead className="font-semibold text-slate-900 text-right">Assignment</TableHead>
                <TableHead className="font-semibold text-slate-900 text-right">Midterm</TableHead>
                <TableHead className="font-semibold text-slate-900 text-right">Final</TableHead>
                <TableHead className="font-semibold text-slate-900 text-right">Average</TableHead>
                <TableHead className="font-semibold text-slate-900 border-l text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium border-r">{grade.subject}</TableCell>
                  <TableCell className="text-slate-500">{grade.semester}</TableCell>
                  <TableCell className="text-right">{grade.assignment}</TableCell>
                  <TableCell className="text-right">{grade.midterm}</TableCell>
                  <TableCell className="text-right">{grade.final}</TableCell>
                  <TableCell className="text-right font-medium">{grade.average}</TableCell>
                  <TableCell className="border-l text-center">
                    {getStatusBadge(grade.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
