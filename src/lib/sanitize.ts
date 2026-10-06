import "server-only";
import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes rich-text HTML from the admin bio editor. The allowlist matches
 * exactly what the editor's toolbar can produce (bold, italic, lists) —
 * nothing else should ever reach the database.
 */
export function sanitizeRichText(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "strong", "em", "ul", "ol", "li", "br"],
    ALLOWED_ATTR: [],
  });
}
