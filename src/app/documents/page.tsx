"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import {
  Calendar as CalendarIcon,
  Download,
  FileText,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Eye,
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
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Document = {
  id: number;
  name: string;
  date: string;
  type: string;
};

const initialDocuments: Document[] = [
  { id: 1, name: "Blood Test Report", date: "2024-07-15", type: "Lab Report" },
  { id: 2, name: "Dr. Singh's Prescription", date: "2024-07-12", type: "Prescription" },
  { id: 3, name: "X-Ray Scan - Left Arm", date: "2024-07-10", type: "Imaging" },
  { id: 4, name: "Discharge Summary", date: "2024-06-28", type: "Hospital Record" },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = React.useState<Document[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [selectedDoc, setSelectedDoc] = React.useState<Document | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = React.useState(false);

  const handleAddDocumentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDocument: Document = {
        id: documents.length + 1,
        name: file.name,
        date: new Date().toISOString().split('T')[0], // format as YYYY-MM-DD
        type: "General",
      };
      setDocuments(prev => [newDocument, ...prev]);
      setIsUploading(false);
    }, 2000);

    if (event.target) {
      event.target.value = "";
    }
  };

  const handlePreview = (doc: Document) => {
    setSelectedDoc(doc);
    setIsPreviewOpen(true);
  };

  const handleSummary = (doc: Document) => {
    setSelectedDoc(doc);
    setIsSummaryOpen(true);
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
        return docDate >= date.from && docDate <= addDays(date.to, 1);
      }
      return true;
    });

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="application/pdf,image/*,.doc,.docx"
      />
      <header className="sticky top-0 z-10 flex h-auto items-center gap-4 border-b bg-background p-4 sm:px-6">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-2xl font-bold">Medical Documents</h1>
          <p className="text-sm text-muted-foreground">
            Your secure digital file for all health records.
          </p>
        </div>
      </header>
      
      <div className="flex-1 p-4 sm:p-6">
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

        <main className="pb-24">
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
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePreview(doc)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Preview</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSummary(doc)}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Summary</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

      <Button
        onClick={handleAddDocumentClick}
        disabled={isUploading}
        size="icon"
        className="rounded-full w-16 h-16 shadow-lg fixed bottom-8 right-8 z-50"
        aria-label="Add document"
      >
        {isUploading ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : (
          <Plus className="h-8 w-8" />
        )}
      </Button>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>{selectedDoc?.name}</DialogTitle>
                <DialogDescription>
                    Document Preview
                </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
                <img src="https://placehold.co/600x800.png" data-ai-hint="document paper" alt="Document Preview" className="w-full rounded-md border" />
            </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Summary of {selectedDoc?.name}</DialogTitle>
                  <DialogDescription>
                      This is a simulated AI-generated summary of your document.
                  </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>
                      This blood test report indicates that most markers, including cholesterol and glucose, are within the normal range. There is a slight elevation in white blood cell count, which could suggest a minor infection.
                  </p>
                  <p className="font-semibold">
                      Recommendation:
                  </p>
                  <p>
                      Monitor for any developing symptoms. A follow-up test is recommended in 2-4 weeks to ensure levels return to normal.
                  </p>
              </div>
          </DialogContent>
      </Dialog>
    </div>
  );
}
