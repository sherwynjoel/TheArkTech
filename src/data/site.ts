// Single source of truth for contact details. These appear in the nav, hero,
// quiz, contact form, booking card, footer, and the floating call button —
// previously duplicated as literals in six files.

export const WHATSAPP_NUMBER = "919489722142";
export const PHONE_E164 = "+919489722142";
export const PHONE_LABEL = "+91 94897 22142";
export const EMAIL = "contact@thearktech.in";
export const LOCATION = "Coimbatore, Tamil Nadu, India";

/** Build a wa.me deep link with a pre-typed message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
