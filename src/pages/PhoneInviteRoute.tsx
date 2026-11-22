import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, ArrowRight } from 'lucide-react';
import { trackAnalyticsEvent } from '@/hooks/useAnalyticsEvents';
import { APP_STORE_ID } from '@/lib/appStoreLinks';
import { DeviceStoreButton, inviteStoreLinks } from '@/components/StoreBadges';

// Phone invites are accepted inside the mobile app now — the web page only
// points the invitee at their phone's store (App Store / Google Play), with
// a smart banner for installed iPhone users.
const PhoneInviteRoute = () => {
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    trackAnalyticsEvent('invite_opened', { token, source: 'phone_invite' });
    if (!token) return;
    const m = document.createElement('meta');
    m.name = 'apple-itunes-app';
    m.content = `app-id=${APP_STORE_ID}, app-argument=https://diviso.app/invite-phone/${token}`;
    document.head.appendChild(m);
    return () => m.remove();
  }, [token]);

  const storeLinks = inviteStoreLinks('invite_phone', 'phone_invite', (store) =>
    trackAnalyticsEvent('download_clicked', { store, source: 'phone_invite', token }),
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-sm text-center shadow-xl">
        <CardHeader className="space-y-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">عندك دعوة في ديفيزو 🎉</CardTitle>
          <CardDescription className="leading-relaxed">
            أحد أصدقائك دعاك للانضمام لمجموعته. حمّل تطبيق ديفيزو وسجّل برقم جوالك
            وستجد الدعوة بانتظارك.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <DeviceStoreButton links={storeLinks} className="w-full gap-2 font-bold">
            حمّل التطبيق
            <ArrowRight className="w-4 h-4" />
          </DeviceStoreButton>
          <p className="text-[11px] text-muted-foreground/80">
            Diviso · قسّم بذكاء
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneInviteRoute;
