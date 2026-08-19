// Single source of truth for contact details. These appear in the nav, hero,
// quiz, contact form, booking card, footer, the /contact page, the floating
// call button, and the LocalBusiness structured data.

export const COMPANY_NAME = "TheArkTech";
export const WHATSAPP_NUMBER = "919489722142";
export const PHONE_E164 = "+919489722142";
export const PHONE_LABEL = "+91 94897 22142";
export const EMAIL = "contact@thearktech.in";

// Postal address. Verification checks (AWS Activate, Google Business Profile,
// payment gateways) look for a real, consistent address on the site.
// STREET_ADDRESS and POSTAL_CODE are optional: every consumer below renders
// correctly while they are empty, and filling them in here updates the
// /contact page, the footer, and the structured data at once.
export const STREET_ADDRESS = "";
export const CITY = "Coimbatore";
export const REGION = "Tamil Nadu";
export const POSTAL_CODE = "";
export const COUNTRY = "India";
export const COUNTRY_CODE = "IN";

/** Human-readable address, skipping any parts not filled in. */
export const ADDRESS_LINES: string[] = [
  STREET_ADDRESS,
  [CITY, REGION].filter(Boolean).join(", "),
  [POSTAL_CODE, COUNTRY].filter(Boolean).join(" "),
].filter(Boolean);

/** Short one-line form, used in the footer and meta descriptions. */
export const LOCATION = [CITY, REGION, COUNTRY].filter(Boolean).join(", ");

export const HOURS_LABEL = "Monday – Saturday, 10:00 AM – 7:00 PM IST";
export const HOURS_SCHEMA = "Mo-Sa 10:00-19:00";
export const RESPONSE_TIME = "We reply within a few hours on working days.";

/** Build a wa.me deep link with a pre-typed message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
