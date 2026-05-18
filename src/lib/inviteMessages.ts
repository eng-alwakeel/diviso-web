/**
 * Centralized invite message templates (AR / EN).
 *
 * Use buildInviteMessage(...) to compose the share text consistently
 * across StepInvite, InviteManagementDialog, group invite tabs, etc.
 *
 * All copy follows the Diviso marketing tone:
 * - Starts with a verb in Arabic
 * - No "download the app" friction
 * - Adds the join link at the end
 */

export type InviteTemplateKey = "group" | "trip" | "meal" | "housing" | "generic";
export type InviteLocale = "ar" | "en";

export interface BuildInviteMessageOptions {
  template?: InviteTemplateKey;
  locale?: InviteLocale;
  groupName?: string;
  inviterName?: string;
  link: string;
}

type TemplateBuilder = (opts: {
  groupName?: string;
  inviterName?: string;
}) => string;

const AR_TEMPLATES: Record<InviteTemplateKey, TemplateBuilder> = {
  group: ({ groupName, inviterName }) =>
    `انضم${inviterName ? ` مع ${inviterName}` : ""} إلى مجموعة${groupName ? ` "${groupName}"` : ""} على Diviso 👇\nقسّموا المصاريف بدون لخبطة.`,
  trip: ({ groupName }) =>
    `جهّز نفسك للرحلة${groupName ? ` "${groupName}"` : ""} 🧳\nخلّينا نقسّم مصاريف السفر بعدل على Diviso 👇`,
  meal: ({ groupName }) =>
    `طلعة${groupName ? ` "${groupName}"` : ""} 🍽️\nانضم وشوف كم عليك بالضبط على Diviso 👇`,
  housing: ({ groupName }) =>
    `انضم لإدارة مصاريف السكن${groupName ? ` "${groupName}"` : ""} 🏠\nإيجار، فواتير، ومشتريات بدون لخبطة على Diviso 👇`,
  generic: ({ inviterName }) =>
    `${inviterName ? `${inviterName} دعاك` : "تم دعوتك"} للانضمام على Diviso 👇\nقسّموا المصاريف بدون تعقيد.`,
};

const EN_TEMPLATES: Record<InviteTemplateKey, TemplateBuilder> = {
  group: ({ groupName, inviterName }) =>
    `Join${inviterName ? ` ${inviterName}` : ""} on Diviso${groupName ? ` in "${groupName}"` : ""} 👇\nSplit expenses fairly, no awkwardness.`,
  trip: ({ groupName }) =>
    `Get ready for the trip${groupName ? ` "${groupName}"` : ""} 🧳\nLet's split travel costs fairly on Diviso 👇`,
  meal: ({ groupName }) =>
    `Outing${groupName ? ` "${groupName}"` : ""} 🍽️\nJoin and see your share on Diviso 👇`,
  housing: ({ groupName }) =>
    `Join the household expenses${groupName ? ` "${groupName}"` : ""} 🏠\nRent, bills, groceries — clean and fair on Diviso 👇`,
  generic: ({ inviterName }) =>
    `${inviterName ? `${inviterName} invited you` : "You're invited"} to Diviso 👇\nSplit expenses without the friction.`,
};

const detectLocale = (): InviteLocale => {
  if (typeof document !== "undefined") {
    const lang = document.documentElement.lang || document.documentElement.getAttribute("dir");
    if (lang === "en") return "en";
  }
  if (typeof navigator !== "undefined" && navigator.language?.startsWith("en")) {
    return "en";
  }
  return "ar";
};

/**
 * Map a group_type column value to a canonical template key.
 */
export function templateFromGroupType(
  groupType?: string | null
): InviteTemplateKey {
  switch ((groupType || "").toLowerCase()) {
    case "trip":
      return "trip";
    case "party":
    case "meal":
      return "meal";
    case "home":
    case "housing":
      return "housing";
    case "work":
    case "project":
    case "general":
      return "group";
    default:
      return "generic";
  }
}

/**
 * Build the share text for an invite. The link is always appended on a new line.
 */
export function buildInviteMessage(opts: BuildInviteMessageOptions): string {
  const locale = opts.locale ?? detectLocale();
  const template = opts.template ?? "group";
  const builders = locale === "en" ? EN_TEMPLATES : AR_TEMPLATES;
  const body = builders[template]({
    groupName: opts.groupName,
    inviterName: opts.inviterName,
  });
  return `${body}\n${opts.link}`;
}

/**
 * Default invite link source of truth. Diviso group invites always live at /i/:code.
 * Referral links (/j/:code) are out of scope and remain managed separately.
 */
export const INVITE_PATH_PREFIX = "/i/";
