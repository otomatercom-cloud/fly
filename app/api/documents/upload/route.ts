import { uploadDocument, ApiError } from "@/lib/odoo-client";
import { getSessionId } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

// Thin route handler so the browser can upload with XHR progress events —
// Server Actions have no upload-progress API, and the spec requires a
// visible progress indicator on document upload (mobile camera uploads
// especially can be slow on poor networks).
//
// This route is excluded from proxy.ts's path matcher (all /api/* is), so
// the session check happens here instead — never trust that middleware
// already gated this request.
export async function POST(request: NextRequest) {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return NextResponse.json(
      { error: { code: "session_expired", message: "Your session has expired. Please sign in again." } },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const doc = await uploadDocument(formData);
    return NextResponse.json(doc);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: { code: err.code, message: err.message } }, { status: err.status });
    }
    return NextResponse.json(
      { error: { code: "server_error", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
