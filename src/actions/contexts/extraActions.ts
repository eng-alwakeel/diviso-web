import {
  Filter,
  Download,
  Share2,
  Copy,
  ShoppingCart,
  LifeBuoy,
  BellRing,
  Settings as SettingsIcon,
  Edit3,
  Archive,
  ListPlus,
  Repeat,
  Plane,
} from "lucide-react";
import { registerActions } from "../registry";
import { requireAuth, requireGroupMember } from "../guards";

registerActions([
  // ── Expenses extras ───────────────────────────────
  {
    id: "filter_expenses",
    labelKey: "fab.filter_expenses",
    icon: Filter,
    intent: "emit",
    target: "filter_expenses",
    guards: [requireAuth],
    analytics: { event: "fab_filter_expenses" },
  },
  {
    id: "export_summary",
    labelKey: "fab.export_summary",
    icon: Download,
    intent: "emit",
    target: "export_summary",
    guards: [requireAuth],
    analytics: { event: "fab_export_summary" },
  },

  // ── Group settings extras ─────────────────────────
  {
    id: "edit_group",
    labelKey: "fab.edit_group",
    icon: Edit3,
    intent: "navigate",
    target: (ctx) => `/group/${ctx.params.id ?? ""}/settings`,
    guards: [requireAuth, requireGroupMember],
    analytics: { event: "fab_edit_group" },
  },
  {
    id: "archive_group",
    labelKey: "fab.archive_group",
    icon: Archive,
    intent: "emit",
    target: "archive_group",
    guards: [requireAuth, requireGroupMember],
    analytics: { event: "fab_archive_group" },
  },

  // ── Plans extras ──────────────────────────────────
  {
    id: "create_trip_plan",
    labelKey: "fab.create_trip_plan",
    icon: Plane,
    intent: "navigate",
    target: "/create-plan?type=trip",
    guards: [requireAuth],
    analytics: { event: "fab_create_trip_plan" },
  },
  {
    id: "convert_plan_to_group",
    labelKey: "fab.convert_plan_to_group",
    icon: Repeat,
    intent: "emit",
    target: "convert_plan_to_group",
    guards: [requireAuth],
    analytics: { event: "fab_convert_plan_to_group" },
  },
  {
    id: "add_plan_item",
    labelKey: "fab.add_plan_item",
    icon: ListPlus,
    intent: "emit",
    target: "add_plan_item",
    guards: [requireAuth],
    analytics: { event: "fab_add_plan_item" },
  },
  {
    id: "share_plan",
    labelKey: "fab.share_plan",
    icon: Share2,
    intent: "emit",
    target: "share_plan",
    guards: [requireAuth],
    analytics: { event: "fab_share_plan" },
  },

  // ── Referral ──────────────────────────────────────
  {
    id: "share_referral",
    labelKey: "fab.share_referral",
    icon: Share2,
    intent: "emit",
    target: "share_referral",
    guards: [requireAuth],
    analytics: { event: "fab_share_referral" },
  },
  {
    id: "copy_referral_code",
    labelKey: "fab.copy_referral_code",
    icon: Copy,
    intent: "emit",
    target: "copy_referral_code",
    guards: [requireAuth],
    analytics: { event: "fab_copy_referral_code" },
  },

  // ── Credits / billing ─────────────────────────────
  {
    id: "buy_credits",
    labelKey: "fab.buy_credits",
    icon: ShoppingCart,
    intent: "navigate",
    target: "/credit-store",
    guards: [requireAuth],
    analytics: { event: "fab_buy_credits" },
  },

  // ── Support ───────────────────────────────────────
  {
    id: "create_ticket",
    labelKey: "fab.create_ticket",
    icon: LifeBuoy,
    intent: "emit",
    target: "create_ticket",
    guards: [requireAuth],
    analytics: { event: "fab_create_ticket" },
  },

  // ── Notifications ─────────────────────────────────
  {
    id: "mark_notifications_read",
    labelKey: "fab.mark_notifications_read",
    icon: BellRing,
    intent: "emit",
    target: "mark_notifications_read",
    guards: [requireAuth],
    analytics: { event: "fab_mark_notifications_read" },
  },
  {
    id: "notification_settings",
    labelKey: "fab.notification_settings",
    icon: SettingsIcon,
    intent: "navigate",
    target: "/settings?tab=notifications",
    guards: [requireAuth],
    analytics: { event: "fab_notification_settings" },
  },
]);

export {};
