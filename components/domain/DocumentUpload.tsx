"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { DocumentType } from "@/types/api";
import { AlertCircle, Camera, CheckCircle2, RotateCcw, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: "passport", label: "Passport" },
  { value: "visa", label: "Visa" },
  { value: "flight_ticket", label: "Flight Ticket" },
  { value: "boarding_pass", label: "Boarding Pass" },
  { value: "national_id", label: "National ID" },
  { value: "insurance", label: "Insurance" },
  { value: "other", label: "Other" },
];

type UploadState = "idle" | "uploading" | "success" | "error";

function uploadWithProgress(formData: FormData, onProgress: (pct: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/documents/upload");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else {
        let message = "Upload failed. Please try again.";
        try {
          message = JSON.parse(xhr.responseText)?.error?.message || message;
        } catch {
          // ignore
        }
        reject(new Error(message));
      }
    };
    xhr.onerror = () => reject(new Error("Network error. Check your connection and try again."));
    xhr.send(formData);
  });
}

export function DocumentUpload() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocumentType>("other");
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function reset() {
    setFile(null);
    setState("idle");
    setProgress(0);
    setError(null);
    setOpen(false);
  }

  async function doUpload() {
    if (!file) return;
    setState("uploading");
    setProgress(0);
    setError(null);
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("name", file.name);
    formData.append("document_type", docType);
    try {
      await uploadWithProgress(formData, setProgress);
      setState("success");
      router.refresh();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    }
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} icon={<Upload className="h-4 w-4" />} fullWidth>
        Upload Document
      </Button>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Upload Document</h3>
        <button onClick={reset} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-light-blue">
          <X className="h-4 w-4 text-text-secondary" />
        </button>
      </div>

      {!file ? (
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-primary min-h-24">
            <Upload className="h-5 w-5 text-text-secondary" />
            <span className="text-xs text-text-secondary">Choose File</span>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,.pdf"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-primary min-h-24">
            <Camera className="h-5 w-5 text-text-secondary" />
            <span className="text-xs text-text-secondary">Take Photo</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-background border border-border p-3">
            <span className="text-sm text-text-primary truncate flex-1">{file.name}</span>
            {state === "idle" && (
              <button onClick={() => setFile(null)} aria-label="Remove file" className="text-text-secondary">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-text-primary">Document type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as DocumentType)}
              disabled={state === "uploading"}
              className="mt-1 w-full rounded-lg border border-border bg-white p-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {DOCUMENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {state === "uploading" && (
            <div>
              <div className="h-2 w-full rounded-full bg-light-blue overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-text-secondary">Uploading… {progress}%</p>
            </div>
          )}

          {state === "success" && (
            <div className="flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="h-4 w-4" /> Uploaded successfully
            </div>
          )}

          {state === "error" && (
            <div className={cn("flex items-center gap-2 text-sm text-danger")}>
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          <div className="flex gap-3">
            {state === "error" ? (
              <Button onClick={doUpload} icon={<RotateCcw className="h-4 w-4" />} fullWidth>
                Retry Upload
              </Button>
            ) : state === "success" ? (
              <Button onClick={reset} variant="secondary" fullWidth>
                Done
              </Button>
            ) : (
              <Button onClick={doUpload} loading={state === "uploading"} fullWidth>
                Upload
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
