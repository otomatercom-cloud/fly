import { EmptyState } from "@/components/ui";
import { DocumentCard } from "@/components/domain/DocumentCard";
import { DocumentUpload } from "@/components/domain/DocumentUpload";
import { getDocuments } from "@/lib/odoo-client";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Document Center" };

export default async function DocumentsPage() {
  const { items } = await getDocuments();

  return (
    <div className="space-y-5 max-w-2xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Document Center</h1>

      <DocumentUpload />

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <EmptyState icon={FileText} title="No documents yet" description="Upload your passport, visa, or other travel documents to keep them all in one place." />
      )}
    </div>
  );
}
