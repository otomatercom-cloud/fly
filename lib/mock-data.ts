import "server-only";
import type {
  Booking,
  BookingDetail,
  CancellationRequest,
  Country,
  DashboardData,
  Notification,
  Partner,
  Passport,
  TravelDocument,
  VisaDetail,
  VisaTypeOption,
} from "@/types/api";

// A single demo customer standing in for the real Odoo-backed customer
// until ODOO_BASE_URL is configured. Every shape here matches
// controllers/api.py's serializers exactly, so swapping to the live API
// later is a config change, not a rewrite.

const now = new Date();
const iso = (daysFromNow: number, hour = 10, minute = 0) => {
  const d = new Date(now);
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};
const isoDate = (daysFromNow: number) => iso(daysFromNow).slice(0, 10);

export const MOCK_PARTNER: Partner = {
  id: 101,
  name: "Rahul Kumar",
  email: "rahul.kumar@example.com",
  phone: "+91 98765 43210",
  nationality: "India",
  emergency_contact_name: "Anjali Kumar",
  emergency_contact_phone: "+91 90000 11111",
  street: "12 MG Road",
  city: "Kochi",
  country: "India",
};

const bookingUpcoming: BookingDetail = {
  id: 1001,
  name: "FLT/BOOK/000123",
  pnr: "ABC123",
  booking_date: iso(-2),
  status: "confirmed",
  payment_status: "paid",
  ticket_class: "economy",
  ticket_amount: 25000,
  currency: "INR",
  currency_symbol: "₹",
  passenger_name: "Rahul Kumar",
  segment_count: 1,
  first_segment: {
    id: 1,
    sequence: 10,
    airline: "Emirates",
    flight_number: "EK 531",
    departure_airport: { code: "COK", name: "Kochi International", city: "Kochi" },
    departure_datetime: iso(20, 22, 30),
    departure_terminal: "T3",
    arrival_airport: { code: "DXB", name: "Dubai International", city: "Dubai" },
    arrival_datetime: iso(21, 0, 40),
    arrival_terminal: "T1",
    seat_number: "14C",
    status: "confirmed",
  },
  passenger_passport_number: "P1234567",
  passenger_contact: "+91 98765 43210",
  ticket_number: "176-4498213456",
  baggage_allowance: "25kg checked + 7kg cabin",
  segments: [],
  cancellable: true,
  airline_cancellation_reason: null,
  airline_cancellation_action: null,
  cancellation_quote: { charge: 3000, refund: 22000, policy_name: "Default: 24-72 hours before departure" },
};
bookingUpcoming.segments = [bookingUpcoming.first_segment!];

const bookingMultiSegment: BookingDetail = {
  id: 1002,
  name: "FLT/BOOK/000098",
  pnr: "XYZ789",
  booking_date: iso(-30),
  status: "completed",
  payment_status: "paid",
  ticket_class: "business",
  ticket_amount: 145000,
  currency: "INR",
  currency_symbol: "₹",
  passenger_name: "Rahul Kumar",
  segment_count: 4,
  first_segment: null,
  passenger_passport_number: "P1234567",
  passenger_contact: "+91 98765 43210",
  ticket_number: "176-4491120987",
  baggage_allowance: "32kg checked + 10kg cabin",
  cancellable: false,
  airline_cancellation_reason: null,
  airline_cancellation_action: null,
  segments: [
    {
      id: 11, sequence: 10, airline: "Emirates", flight_number: "EK 531",
      departure_airport: { code: "COK", name: "Kochi International", city: "Kochi" },
      departure_datetime: iso(-45, 22, 30), departure_terminal: "T3",
      arrival_airport: { code: "DXB", name: "Dubai International", city: "Dubai" },
      arrival_datetime: iso(-44, 0, 40), arrival_terminal: "T1",
      seat_number: "3A", status: "completed",
    },
    {
      id: 12, sequence: 20, airline: "Emirates", flight_number: "EK 001",
      departure_airport: { code: "DXB", name: "Dubai International", city: "Dubai" },
      departure_datetime: iso(-43, 8, 30), departure_terminal: "T3",
      arrival_airport: { code: "LHR", name: "Heathrow", city: "London" },
      arrival_datetime: iso(-43, 12, 45), arrival_terminal: "T3",
      seat_number: "2C", status: "completed",
    },
    {
      id: 13, sequence: 30, airline: "Emirates", flight_number: "EK 002",
      departure_airport: { code: "LHR", name: "Heathrow", city: "London" },
      departure_datetime: iso(-35, 21, 15), departure_terminal: "T3",
      arrival_airport: { code: "DXB", name: "Dubai International", city: "Dubai" },
      arrival_datetime: iso(-35, 6, 55), arrival_terminal: "T1",
      seat_number: "2C", status: "completed",
    },
    {
      id: 14, sequence: 40, airline: "Emirates", flight_number: "EK 530",
      departure_airport: { code: "DXB", name: "Dubai International", city: "Dubai" },
      departure_datetime: iso(-34, 14, 5), departure_terminal: "T1",
      arrival_airport: { code: "COK", name: "Kochi International", city: "Kochi" },
      arrival_datetime: iso(-34, 19, 10), arrival_terminal: "T3",
      seat_number: "3A", status: "completed",
    },
  ],
};

const bookingAirlineCancelled: BookingDetail = {
  id: 1003,
  name: "FLT/BOOK/000077",
  pnr: "DEF456",
  booking_date: iso(-5),
  status: "airline_cancelled",
  payment_status: "paid",
  ticket_class: "economy",
  ticket_amount: 18000,
  currency: "INR",
  currency_symbol: "₹",
  passenger_name: "Rahul Kumar",
  segment_count: 1,
  first_segment: {
    id: 21, sequence: 10, airline: "Emirates", flight_number: "EK 531",
    departure_airport: { code: "COK", name: "Kochi International", city: "Kochi" },
    departure_datetime: iso(5, 22, 30), departure_terminal: "T3",
    arrival_airport: { code: "DXB", name: "Dubai International", city: "Dubai" },
    arrival_datetime: iso(6, 0, 40), arrival_terminal: "T1",
    seat_number: null, status: "cancelled",
  },
  passenger_passport_number: "P1234567",
  passenger_contact: "+91 98765 43210",
  ticket_number: "176-4498555222",
  baggage_allowance: "25kg checked + 7kg cabin",
  cancellable: false,
  airline_cancellation_reason: "Aircraft technical issue.",
  airline_cancellation_action: "rebooking_required",
  segments: [],
};
bookingAirlineCancelled.segments = [bookingAirlineCancelled.first_segment!];

export const MOCK_BOOKINGS: BookingDetail[] = [bookingUpcoming, bookingMultiSegment, bookingAirlineCancelled];

export const MOCK_VISAS: VisaDetail[] = [
  {
    id: 2001,
    name: "FLT/VISA/000045",
    country: "United Arab Emirates",
    country_code: "AE",
    visa_type: "employment",
    expiry_date: isoDate(268),
    status: "active",
    visa_number: "AE-98213456",
    issue_date: isoDate(-460),
    renewal_date: isoDate(178),
    entry_type: "multiple",
    number_of_entries: 0,
    passport_number: "P1234567",
    document_count: 1,
  },
  {
    id: 2002,
    name: "FLT/VISA/000012",
    country: "United Kingdom",
    country_code: "GB",
    visa_type: "tourist",
    expiry_date: isoDate(-90),
    status: "expired",
    visa_number: "GB-4471123",
    issue_date: isoDate(-460),
    renewal_date: null,
    entry_type: "single",
    number_of_entries: 1,
    passport_number: "P1234567",
    document_count: 1,
  },
];

export const MOCK_PASSPORTS: Passport[] = [
  {
    id: 3001,
    passport_number: "P1234567",
    full_name: "Rahul Kumar",
    date_of_birth: isoDate(-11000),
    nationality: "India",
    nationality_code: "IN",
    issue_date: isoDate(-2200),
    expiry_date: isoDate(1460),
    place_of_issue: "New Delhi",
    notes: null,
    status: "valid",
    document_count: 1,
  },
];

export const MOCK_VISA_TYPES: VisaTypeOption[] = [
  { value: "tourist", label: "Tourist" },
  { value: "business", label: "Business" },
  { value: "student", label: "Student" },
  { value: "work", label: "Work" },
  { value: "transit", label: "Transit" },
  { value: "resident", label: "Resident" },
];

export const MOCK_COUNTRIES: Country[] = [
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "IN", name: "India" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SG", name: "Singapore" },
  { code: "US", name: "United States" },
];

export const MOCK_DOCUMENTS: TravelDocument[] = [
  { id: 4001, name: "Passport Copy", document_type: "passport", upload_date: iso(-200), expiry_date: isoDate(1460), status: "verified", download_url: "/api/flt/documents/4001/file" },
  { id: 4002, name: "UAE Employment Visa", document_type: "visa", upload_date: iso(-460), expiry_date: isoDate(268), status: "verified", download_url: "/api/flt/documents/4002/file" },
  { id: 4003, name: "Travel Insurance", document_type: "insurance", upload_date: iso(-10), expiry_date: isoDate(355), status: "pending", download_url: "/api/flt/documents/4003/file" },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 5001, category: "flight_cancellation", title: "Flight Cancelled", message: "Your EK531 flight scheduled for 30 Oct has been cancelled by the airline.", date: iso(-0.1), is_read: false, related_model: "flt.flight.booking", related_id: 1003 },
  { id: 5002, category: "visa_expiry", title: "Your visa expires in 268 day(s)", message: "Your UAE Employment Visa expires on the date shown. Please arrange renewal in good time.", date: iso(-1), is_read: false, related_model: "flt.visa", related_id: 2001 },
  { id: 5003, category: "refund_update", title: "Refund Processed", message: "Your refund of ₹22,000 has been processed.", date: iso(-2), is_read: true, related_model: "flt.cancellation.request", related_id: 6001 },
  { id: 5004, category: "document_required", title: "Document Required", message: "Please upload a valid travel insurance document for your upcoming trip.", date: iso(-6), is_read: true, related_model: null, related_id: null },
];

export const MOCK_CANCELLATION_REQUESTS: CancellationRequest[] = [
  {
    id: 6001,
    name: "FLT/CAN/000031",
    booking_name: "FLT/BOOK/000045",
    booking_id: 999,
    status: "processed",
    refund_status: "refunded",
    request_date: iso(-15),
    original_amount: 25000,
    cancellation_charge: 3000,
    refund_amount: 22000,
    final_refund_amount: 22000,
    currency_symbol: "₹",
    remarks: null,
  },
];

export function toBookingSummary(b: BookingDetail): Booking {
  const { id, name, pnr, booking_date, status, payment_status, ticket_class, ticket_amount, currency, currency_symbol, passenger_name, first_segment, segment_count } = b;
  return { id, name, pnr, booking_date, status, payment_status, ticket_class, ticket_amount, currency, currency_symbol, passenger_name, first_segment, segment_count };
}

export function getMockDashboard(): DashboardData {
  const upcoming = MOCK_BOOKINGS.filter((b) => !["cancelled", "airline_cancelled", "completed"].includes(b.status));
  const alerts = MOCK_BOOKINGS.filter((b) => b.status === "airline_cancelled");
  const activeVisas = MOCK_VISAS.filter((v) => v.status === "active");
  return {
    kpis: {
      upcoming_flights: upcoming.length,
      active_visas: activeVisas.length,
      pending_actions: MOCK_CANCELLATION_REQUESTS.filter((r) => ["submitted", "under_review"].includes(r.status)).length,
      unread_notifications: MOCK_NOTIFICATIONS.filter((n) => !n.is_read).length,
    },
    alerts: alerts.map(toBookingSummary),
    next_flight: upcoming[0] ?? null,
    visas: activeVisas,
    passports: MOCK_PASSPORTS,
    notifications: MOCK_NOTIFICATIONS.slice(0, 5),
  };
}
