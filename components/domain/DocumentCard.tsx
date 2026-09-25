import { Card, StatusBadge } from "@/components/ui";
import { DateDisplay } from "@/components/ui/format";
import type { TravelDocument } from "@/types/api";
import { Download, FileText } from "lucide-react";

const TYPE_LABEL: Record<TravelDocument["document_type"], string> = {
  passport: "Passport",
  visa: "Visa",
  flight_ticket: "Flight Ticket",
  boarding_pass: "Boarding Pass",
  national_id: "National ID",
  insurance: "Insurance",
  other: "Other",
};

export function DocumentCard({ document }: { document: TravelDocument }) {
  return (
    <Card className="flex items-start gap-3" padded>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-light-blue text-primary">
        <FileText className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-text-primary truncate">{document.name}</p>
          <StatusBadge domain="document" status={document.status} />
        </div>
        <p className="text-xs text-text-secondary mt-0.5">{TYPE_LABEL[document.document_type]}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
          <span>
            Uploaded <DateDisplay iso={document.upload_date} />
          </span>
          {document.expiry_date && (
            <span>
              Expires <DateDisplay iso={document.expiry_date} />
            </span>
          )}
        </div>
      </div>
      <a
        href={document.download_url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Download ${document.name}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-light-blue"
      >
        <Download className="h-4 w-4 text-text-secondary" />
      </a>
    </Card>
  );
}
