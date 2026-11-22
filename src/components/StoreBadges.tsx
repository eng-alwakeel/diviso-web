import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  EXTERNAL_LINK_PROPS,
  appStoreUrl,
  playStoreUrl,
  trackAppStoreClick,
  trackPlayStoreClick,
  webPlayStoreUrl,
} from "@/lib/appStoreLinks";
import { detectPlatform, Platform } from "@/lib/platform";
import { trackAnalyticsEvent } from "@/hooks/useAnalyticsEvents";
import { Button } from "@/components/ui/button";

// Official store badges (MSG-145), unaltered artwork from Apple and Google:
//  public/badges/app-store-en.svg  (Apple marketing toolbox — Apple serves
//                                   the same English badge for ar-SA)
//  public/badges/google-play-{ar,en}.png (Google Play badge generator)
// The Play PNG carries Google's built-in padding, so it is drawn taller to
// match the App Store badge's visible height.

export interface StoreLinks {
  ios: string;
  android: string;
  onIos?: () => void;
  onAndroid?: () => void;
}

/** Site placement: App Store ct=web_<source>, Play utm_medium=<source>. */
export const webStoreLinks = (source: string): StoreLinks => ({
  ios: appStoreUrl(`web_${source}`),
  android: webPlayStoreUrl(source),
  onIos: () => {
    trackAppStoreClick(`web_${source}`);
    trackAnalyticsEvent("download_clicked", { store: "ios", source });
  },
  onAndroid: () => {
    trackPlayStoreClick(`web_${source}`);
    trackAnalyticsEvent("download_clicked", { store: "android", source });
  },
});

/** The visitor's device, settled after mount (prerender/SSR = desktop). */
export const usePlatform = (): Platform => {
  const [platform, setPlatform] = useState<Platform>("desktop");
  useEffect(() => setPlatform(detectPlatform()), []);
  return platform;
};

interface StoreBadgesProps {
  links: StoreLinks;
  /** Visible badge height in px (App Store artwork). */
  height?: number;
  className?: string;
  /** Show both badges whatever the device (e.g. the computer QR page). */
  showBoth?: boolean;
  align?: "center" | "start";
}

/**
 * iPhone/iPad → App Store badge only, Android → Google Play only, computer
 * → both. Never the other platform's badge on a phone.
 */
export const StoreBadges = ({
  links,
  height = 48,
  className = "",
  showBoth = false,
  align = "center",
}: StoreBadgesProps) => {
  const { i18n } = useTranslation();
  const platform = usePlatform();
  const ar = (i18n.language || "ar").startsWith("ar");
  const showIos = showBoth || platform !== "android";
  const showAndroid = showBoth || platform !== "ios";

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${align === "start" ? "justify-start" : "justify-center"} ${className}`}
    >
      {showIos && (
        <a href={links.ios} {...EXTERNAL_LINK_PROPS} onClick={links.onIos} data-store="ios">
          <img
            src="/badges/app-store-en.svg"
            alt={ar ? "حمّله من App Store" : "Download on the App Store"}
            style={{ height, width: "auto" }}
            loading="lazy"
          />
        </a>
      )}
      {showAndroid && (
        <a href={links.android} {...EXTERNAL_LINK_PROPS} onClick={links.onAndroid} data-store="android">
          <img
            src={ar ? "/badges/google-play-ar.png" : "/badges/google-play-en.png"}
            alt={ar ? "احصل عليه من Google Play" : "Get it on Google Play"}
            // 646×250 artwork with ~16% transparent padding top and bottom.
            style={{ height: Math.round(height * 1.45), width: "auto", margin: `-${Math.round(height * 0.225)}px 0` }}
            loading="lazy"
          />
        </a>
      )}
    </div>
  );
};

export default StoreBadges;

/**
 * Invite links (/i/, /invite-phone/, /t/): App Store ct=<ct>, Play
 * utm_source=invite, utm_medium=<medium>, utm_campaign=<ct>. The invite
 * token itself never goes into store analytics.
 */
export const inviteStoreLinks = (ct: string, medium: string, onClick?: (store: "ios" | "android") => void): StoreLinks => ({
  ios: appStoreUrl(ct),
  android: playStoreUrl({ source: "invite", medium, campaign: ct }),
  onIos: () => {
    trackAppStoreClick(ct);
    onClick?.("ios");
  },
  onAndroid: () => {
    trackPlayStoreClick(ct);
    onClick?.("android");
  },
});

interface DeviceStoreButtonProps {
  links: StoreLinks;
  children: ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg";
}

/**
 * One big button to the phone's own store (iPhone/iPad → App Store,
 * Android → Google Play); on a computer, both official badges instead.
 */
export const DeviceStoreButton = ({ links, children, className, size = "lg" }: DeviceStoreButtonProps) => {
  const platform = usePlatform();
  if (platform === "desktop") return <StoreBadges links={links} height={44} />;
  const ios = platform === "ios";
  return (
    <Button asChild size={size} className={className}>
      <a href={ios ? links.ios : links.android} {...EXTERNAL_LINK_PROPS} onClick={ios ? links.onIos : links.onAndroid}>
        {children}
      </a>
    </Button>
  );
};
