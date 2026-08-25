import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, ButtonProps } from "@/components/ui/button";
import { Download } from "lucide-react";
import { APP_STORE_URL } from "@/lib/appStoreLinks";
import { detectPlatform } from "@/lib/platform";
import { useAnalyticsEvents } from "@/hooks/useAnalyticsEvents";

interface DownloadAppButtonProps extends Omit<ButtonProps, "onClick"> {
  source?: string;
  label?: string;
  showIcon?: boolean;
}

// Unified CTA: iOS devices go straight to the App Store, everyone else
// lands on /download (platform picker + QR).
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
    trackEvent("download_clicked", { store: platform === "ios" ? "ios" : "download_page", source });
    if (platform === "ios") {
      window.open(APP_STORE_URL, "_blank", "noopener,noreferrer");
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
