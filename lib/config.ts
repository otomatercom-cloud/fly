// Single place deciding whether the app talks to a real Odoo instance or
// the typed mock layer. Set ODOO_BASE_URL (server-only env var) once a
// dev/staging Odoo 19 instance with flt_flight_visa_management installed
// is available — nothing else in the app needs to change.
export const ODOO_BASE_URL = process.env.ODOO_BASE_URL?.replace(/\/$/, "") || "";
export const IS_MOCK_MODE = !ODOO_BASE_URL;

export const SESSION_COOKIE_NAME = "flt_session";
