// Mirrors flt_flight_visa_management/controllers/api.py serializers 1:1.
// If a field is added/renamed on the Odoo side, update it here in the same
// change — this file IS the API contract on the frontend side.

export type BookingStatus =
  | "draft"
  | "reserved"
  | "confirmed"
  | "ticketed"
  | "checked_in"
  | "completed"
  | "cancellation_requested"
  | "cancelled"
  | "airline_cancelled"
  | "no_show";

export type VisaStatus =
  | "draft"
  | "submitted"
  | "processing"
  | "approved"
  | "rejected"
  | "active"
  | "expired"
  | "cancelled";

export type PassportStatus = "draft" | "valid" | "expiring_soon" | "expired";

export type DocumentStatus = "pending" | "verified" | "rejected" | "expired";

export type CancellationStatus = "draft" | "submitted" | "under_review" | "approved" | "rejected" | "processed" | "cancelled";

export type RefundStatus = "not_applicable" | "pending" | "approved" | "processing" | "refunded" | "failed";

export type NotificationCategory =
  | "flight_cancellation"
  | "flight_delay"
  | "flight_change"
  | "visa_expiry"
  | "passport_expiry"
  | "document_required"
  | "cancellation_request_update"
  | "refund_update"
  | "rebooking_required"
  | "general_alert";

export type DocumentType =
  | "passport"
  | "visa"
  | "flight_ticket"
  | "boarding_pass"
  | "national_id"
  | "insurance"
  | "other";

export interface Airport {
  code: string | null;
  name: string;
  city: string | null;
}

export interface Segment {
  id: number;
  sequence: number;
  airline: string;
  flight_number: string;
  departure_airport: Airport;
  departure_datetime: string | null;
  departure_terminal: string | null;
  arrival_airport: Airport;
  arrival_datetime: string | null;
  arrival_terminal: string | null;
  seat_number: string | null;
  status: string;
}

export interface Booking {
  id: number;
  name: string;
  pnr: string | null;
  booking_date: string | null;
  status: BookingStatus;
  payment_status: string;
  ticket_class: string;
  ticket_amount: number;
  currency: string;
  currency_symbol: string;
  passenger_name: string;
  first_segment: Segment | null;
  segment_count: number;
}

export interface BookingDetail extends Booking {
  passenger_passport_number: string | null;
  passenger_contact: string | null;
  ticket_number: string | null;
  baggage_allowance: string | null;
  segments: Segment[];
  cancellable: boolean;
  airline_cancellation_reason: string | null;
  airline_cancellation_action: string | null;
  cancellation_quote?: {
    charge: number;
    refund: number;
    policy_name: string | null;
  };
}

export interface Visa {
  id: number;
  name: string;
  country: string;
  country_code: string | null;
  visa_type: string;
  expiry_date: string | null;
  status: VisaStatus;
}

export interface VisaDetail extends Visa {
  visa_number: string | null;
  issue_date: string | null;
  renewal_date: string | null;
  entry_type: string;
  number_of_entries: number;
  passport_number: string | null;
}

export interface Passport {
  id: number;
  passport_number: string;
  full_name: string;
  nationality: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  status: PassportStatus;
}

export interface TravelDocument {
  id: number;
  name: string;
  document_type: DocumentType;
  upload_date: string | null;
  expiry_date: string | null;
  status: DocumentStatus;
  download_url: string;
}

export interface Notification {
  id: number;
  category: NotificationCategory;
  title: string;
  message: string;
  date: string | null;
  is_read: boolean;
  related_model: string | null;
  related_id: number | null;
}

export interface CancellationRequest {
  id: number;
  name: string;
  booking_name: string;
  booking_id: number;
  status: CancellationStatus;
  refund_status: RefundStatus;
  request_date: string | null;
  original_amount: number;
  cancellation_charge: number;
  refund_amount: number;
  final_refund_amount: number;
  currency_symbol: string;
  remarks: string | null;
}

export interface Partner {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  nationality: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  street: string | null;
  city: string | null;
  country: string | null;
}

export interface DashboardData {
  kpis: {
    upcoming_flights: number;
    active_visas: number;
    pending_actions: number;
    unread_notifications: number;
  };
  alerts: Booking[];
  next_flight: BookingDetail | null;
  visas: Visa[];
  passports: Passport[];
  notifications: Notification[];
}

export interface Paginated<T> {
  items: T[];
  page: number;
  page_size: number;
  total: number;
}

export interface ApiErrorBody {
  error: { code: string; message: string };
}
