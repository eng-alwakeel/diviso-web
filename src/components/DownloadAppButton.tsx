import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, ButtonProps } from "@/components/ui/button";
import { Download } from "lucide-react";
import { appStoreUrl, trackAppStoreClick, trackPlayStoreClick, webPlayStoreUrl } from "@/lib/appStoreLinks";
import { detectPlatform } from "@/lib/platform";
import { useAnalyticsEvents } from "@/hooks/useAnalyticsEvents";

interface DownloadAppButtonProps extends Omit<ButtonProps, "onClick"> {
  source?: string;
  label?: string;
  showIcon?: boolean;
}

// Unified CTA: iPhone/iPad go straight to the App Store, Android to Google
// Play, computers land on /download (both badges + QR).
export const DownloadAppButton: React.FC<DownloadAppButtonProps> = ({
  source = "cta",
  label,
  showIcon = true,
  children,
  ...buttonProps
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation("landing");
  const { trackEvent } = useAnalyticsEvents();

  const handleClick = () => {
    const platform = detectPlatform();
    const store = platform === "desktop" ? "download_page" : platform;
    trackEvent("download_clicked", { store, source });
    if (platform === "ios") {
      trackAppStoreClick(`web_${source}`);
      window.open(appStoreUrl(`web_${source}`), "_blank", "noopener,noreferrer");
    } else if (platform === "android") {
      trackPlayStoreClick(`web_${source}`);
      window.open(webPlayStoreUrl(source), "_blank", "noopener,noreferrer");
    } else {
      navigate("/download");
    }
  };

  return (
    <Button onClick={handleClick} {...buttonProps}>
      {showIcon && <Download className="h-5 w-5" />}
      {children ?? label ?? t("features.cta.downloadApp")}
    </Button>
  );
};

export default DownloadAppButton;
