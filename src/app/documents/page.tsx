
"use client"

import * as React from "react"
import Link from "next/link"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Download,
  FileText,
  Loader2,
  MoreVertical,
  Search,
  Upload,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const initialDocuments = [
  { id: 1, name: "Blood Test Report", date: "2024-07-15", type: "Lab Report" },
  { id: 2, name: "Dr. Singh's Prescription", date: "2024-07-12", type: "Prescription" },
  { id: 3, name: "X-Ray Scan - Left Arm", date: "2024-07-10", type: "Imaging" },
  { id: 4, name: "Discharge Summary", date: "2024-06-28", type: "Hospital Record" },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = React.useState(initialDocuments);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [isUploading, setIsUploading] = React.useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDocument = {
        id: documents.length + 1,
        name: "New Medical Record",
        date: new Date().toISOString().split('T')[0], // format as YYYY-MM-DD
        type: "General",
      };
      setDocuments(prev => [newDocument, ...prev]);
      setIsUploading(false);
    }, 2000);
  };

  const filteredDocuments = documents
    .filter((doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((doc) => {
      if (!date?.from) return true;
      const docDate = new Date(doc.date);
      if (date.from && !date.to) {
        return docDate >= date.from;
      }
      if (date.from && date.to) {
        // add a day to `to` to make it inclusive
        return docDate >= date.from && docDate <= addDays(date.to, 1);
      }
      return true;
    });

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold font-headline">Medical Documents</h1>
              <p className="text-muted-foreground mt-1">Your secure digital file for all health records.</p>
            </div>
            <Button onClick={handleUpload} disabled={isUploading} className="w-full sm:w-auto">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2" />
                  Add Document
                </>
              )}
            </Button>
          </div>
        </header>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents by name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Filter by date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <main>
          {filteredDocuments.length > 0 ? (
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">Uploaded on {doc.date} &bull; {doc.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical />
                        <span className="sr-only">More options</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">No Documents Found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or date filters, or upload a new document.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
