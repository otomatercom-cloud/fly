import "server-only";
import { IS_MOCK_MODE, ODOO_BASE_URL } from "./config";
import { getSessionId } from "./session";
import {
  getMockDashboard,
  MOCK_BOOKINGS,
  MOCK_CANCELLATION_REQUESTS,
  MOCK_DOCUMENTS,
  MOCK_NOTIFICATIONS,
  MOCK_PARTNER,
  MOCK_PASSPORTS,
  MOCK_VISAS,
  toBookingSummary,
} from "./mock-data";
import type {
  Booking,
  BookingDetail,
  CancellationRequest,
  DashboardData,
  Notification,
  Paginated,
  Partner,
  Passport,
  TravelDocument,
  Visa,
  VisaDetail,
} from "@/types/api";

export class ApiError extends Error {
  status: number;
  code: string;
  constructor(message: string, status: number, code: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/** Artificial latency in mock mode so loading/skeleton states are actually
 * exercised during development, instead of resolving instantly. */
async function mockDelay(ms = 350) {
  await new Promise((r) => setTimeout(r, ms));
}

async function odooFetch<T>(
  path: string,
  init: RequestInit & { sessionId?: string | null } = {}
): Promise<T> {
  const { sessionId, ...rest } = init;
  const res = await fetch(`${ODOO_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(sessionId ? { Cookie: `session_id=${sessionId}` } : {}),
      ...(rest.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    let code = "server_error";
    try {
      const body = await res.json();
      message = body?.error?.message || message;
      code = body?.error?.code || code;
    } catch {
      // non-JSON error body; keep defaults
    }
    throw new ApiError(message, res.status, code);
  }
  return res.json();
}

async function withSession<T>(fn: (sessionId: string) => Promise<T>): Promise<T> {
  const sessionId = await getSessionId();
  if (!sessionId) {
    throw new ApiError("Your session has expired. Please sign in again.", 401, "session_expired");
  }
  return fn(sessionId);
}

// ============================== AUTH ================================
export async function login(loginEmail: string, password: string): Promise<{ sessionId: string; partner: Partner }> {
  if (IS_MOCK_MODE) {
    await mockDelay(500);
    if (!loginEmail || !password) {
      throw new ApiError("Email and password are required.", 400, "invalid_input");
    }
    // Any non-empty credentials succeed in mock mode.
    return { sessionId: "mock-session-" + Date.now(), partner: MOCK_PARTNER };
  }
  const data = await odooFetch<{ session_id: string; partner: Partner }>("/api/flt/auth/login", {
    method: "POST",
    body: JSON.stringify({ login: loginEmail, password }),
  });
  return { sessionId: data.session_id, partner: data.partner };
}

export async function logout(): Promise<void> {
  if (IS_MOCK_MODE) return;
  await withSession((sessionId) => odooFetch("/api/flt/auth/logout", { method: "POST", sessionId }));
}

export async function getMe(): Promise<Partner> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    return MOCK_PARTNER;
  }
  return withSession((sessionId) => odooFetch<Partner>("/api/flt/auth/me", { sessionId }));
}

// ============================ DASHBOARD ==============================
export async function getDashboard(): Promise<DashboardData> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    return getMockDashboard();
  }
  return withSession((sessionId) => odooFetch<DashboardData>("/api/flt/dashboard", { sessionId }));
}

// ============================= FLIGHTS ===============================
export async function getFlights(filter: string = "all", page: number = 1): Promise<Paginated<Booking>> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    let items = MOCK_BOOKINGS;
    if (filter === "upcoming") items = items.filter((b) => !["cancelled", "airline_cancelled", "completed"].includes(b.status));
    if (filter === "completed") items = items.filter((b) => b.status === "completed");
    if (filter === "cancelled") items = items.filter((b) => ["cancelled", "airline_cancelled"].includes(b.status));
    return { items: items.map(toBookingSummary), page, page_size: 20, total: items.length };
  }
  return withSession((sessionId) =>
    odooFetch<Paginated<Booking>>(`/api/flt/flights?filter=${filter}&page=${page}`, { sessionId })
  );
}

export async function getFlightDetail(id: number): Promise<BookingDetail> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    const booking = MOCK_BOOKINGS.find((b) => b.id === id);
    if (!booking) throw new ApiError("Not found.", 404, "not_found");
    return booking;
  }
  return withSession((sessionId) => odooFetch<BookingDetail>(`/api/flt/flights/${id}`, { sessionId }));
}

export async function requestCancellation(
  bookingId: number,
  reason: string,
  confirm: boolean
): Promise<CancellationRequest> {
  if (IS_MOCK_MODE) {
    await mockDelay(600);
    if (!confirm) throw new ApiError("You must confirm you understand the cancellation policy.", 400, "confirm_required");
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId);
    return {
      id: 9999,
      name: "FLT/CAN/000099",
      booking_name: booking?.name ?? "FLT/BOOK/000000",
      booking_id: bookingId,
      status: "submitted",
      refund_status: "pending",
      request_date: new Date().toISOString(),
      original_amount: booking?.ticket_amount ?? 0,
      cancellation_charge: booking?.cancellation_quote?.charge ?? 0,
      refund_amount: booking?.cancellation_quote?.refund ?? 0,
      final_refund_amount: 0,
      currency_symbol: booking?.currency_symbol ?? "₹",
      remarks: null,
    };
  }
  return withSession((sessionId) =>
    odooFetch<CancellationRequest>(`/api/flt/flights/${bookingId}/cancel`, {
      method: "POST",
      sessionId,
      body: JSON.stringify({ reason, confirm }),
    })
  );
}

export async function getCancellationRequests(): Promise<{ items: CancellationRequest[] }> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    return { items: MOCK_CANCELLATION_REQUESTS };
  }
  return withSession((sessionId) =>
    odooFetch<{ items: CancellationRequest[] }>("/api/flt/cancellation-requests", { sessionId })
  );
}

export async function getCancellationRequest(id: number): Promise<CancellationRequest> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    const req = MOCK_CANCELLATION_REQUESTS.find((r) => r.id === id);
    if (!req) throw new ApiError("Not found.", 404, "not_found");
    return req;
  }
  return withSession((sessionId) => odooFetch<CancellationRequest>(`/api/flt/cancellation-requests/${id}`, { sessionId }));
}

// =============================== VISA ================================
export async function getVisas(): Promise<{ items: Visa[] }> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    return { items: MOCK_VISAS };
  }
  return withSession((sessionId) => odooFetch<{ items: Visa[] }>("/api/flt/visas", { sessionId }));
}

export async function getVisaDetail(id: number): Promise<VisaDetail> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    const visa = MOCK_VISAS.find((v) => v.id === id);
    if (!visa) throw new ApiError("Not found.", 404, "not_found");
    return visa;
  }
  return withSession((sessionId) => odooFetch<VisaDetail>(`/api/flt/visas/${id}`, { sessionId }));
}

// ============================= PASSPORT ==============================
export async function getPassports(): Promise<{ items: Passport[] }> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    return { items: MOCK_PASSPORTS };
  }
  return withSession((sessionId) => odooFetch<{ items: Passport[] }>("/api/flt/passports", { sessionId }));
}

// ============================ DOCUMENTS ===============================
export async function getDocuments(): Promise<{ items: TravelDocument[] }> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    return { items: MOCK_DOCUMENTS };
  }
  return withSession((sessionId) => odooFetch<{ items: TravelDocument[] }>("/api/flt/documents", { sessionId }));
}

export async function uploadDocument(formData: FormData): Promise<TravelDocument> {
  if (IS_MOCK_MODE) {
    await mockDelay(900);
    const file = formData.get("upload") as File | null;
    return {
      id: Math.floor(Math.random() * 100000),
      name: (formData.get("name") as string) || file?.name || "Document",
      document_type: (formData.get("document_type") as TravelDocument["document_type"]) || "other",
      upload_date: new Date().toISOString(),
      expiry_date: null,
      status: "pending",
      download_url: "#",
    };
  }
  return withSession((sessionId) =>
    fetch(`${ODOO_BASE_URL}/api/flt/documents/upload`, {
      method: "POST",
      headers: { Cookie: `session_id=${sessionId}` },
      body: formData,
    }).then(async (res) => {
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new ApiError(body?.error?.message || "Upload failed.", res.status, body?.error?.code || "upload_failed");
      }
      return res.json();
    })
  );
}

// =========================== NOTIFICATIONS ============================
export async function getNotifications(): Promise<{ items: Notification[] }> {
  if (IS_MOCK_MODE) {
    await mockDelay();
    return { items: MOCK_NOTIFICATIONS };
  }
  return withSession((sessionId) => odooFetch<{ items: Notification[] }>("/api/flt/notifications", { sessionId }));
}

export async function markNotificationRead(id: number): Promise<Notification> {
  if (IS_MOCK_MODE) {
    await mockDelay(200);
    const notif = MOCK_NOTIFICATIONS.find((n) => n.id === id);
    if (!notif) throw new ApiError("Not found.", 404, "not_found");
    notif.is_read = true;
    return notif;
  }
  return withSession((sessionId) =>
    odooFetch<Notification>(`/api/flt/notifications/${id}/read`, { method: "POST", sessionId })
  );
}

// ============================== PROFILE ===============================
export async function getProfile(): Promise<Partner> {
  return getMe();
}

export async function updateProfile(patch: Partial<Partner>): Promise<Partner> {
  if (IS_MOCK_MODE) {
    await mockDelay(400);
    Object.assign(MOCK_PARTNER, patch);
    return MOCK_PARTNER;
  }
  return withSession((sessionId) =>
    odooFetch<Partner>("/api/flt/profile", { method: "PATCH", sessionId, body: JSON.stringify(patch) })
  );
}
