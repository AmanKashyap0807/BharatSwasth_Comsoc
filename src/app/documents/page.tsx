import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Upload, ArrowLeft, MoreVertical } from "lucide-react"

const documents = [
  { id: 1, name: "Blood Test Report", date: "2024-07-15", type: "Lab Report" },
  { id: 2, name: "Dr. Singh's Prescription", date: "2024-07-12", type: "Prescription" },
  { id: 3, name: "X-Ray Scan - Left Arm", date: "2024-07-10", type: "Imaging" },
  { id: 4, name: "Discharge Summary", date: "2024-06-28", type: "Hospital Record" },
];

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold font-headline">Medical Documents</h1>
            <p className="text-muted-foreground mt-1">Your secure digital file for all health records.</p>
          </div>
          <Button>
            <Upload className="mr-2" />
            Add Document
          </Button>
        </header>
        <main>
          {documents.length > 0 ? (
            <div className="space-y-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">Uploaded on {doc.date} &bull; {doc.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreVertical />
                        <span className="sr-only">More options</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardHeader>
                <CardTitle>No Documents Yet</CardTitle>
                <CardDescription>Start by uploading your first medical document.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>
                  <Upload className="mr-2" />
                  Upload First Document
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
