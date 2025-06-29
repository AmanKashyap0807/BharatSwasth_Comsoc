import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderHeart, ArrowRight } from "lucide-react"

export default function MedicDocuments() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <FolderHeart className="w-6 h-6 text-primary"/>
            Medical Documents
        </CardTitle>
        <CardDescription>View and manage your uploaded medical records.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Keep all your prescriptions, lab reports, and other health documents organized and accessible.
        </p>
        <Link href="/documents" passHref>
          <Button>
            View Documents <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
