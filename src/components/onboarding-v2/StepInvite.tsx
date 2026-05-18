import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BRAND_CONFIG } from '@/lib/brandConfig';
import { trackAnalyticsEvent } from '@/hooks/useAnalyticsEvents';
import { toast } from 'sonner';
import { buildInviteMessage } from '@/lib/inviteMessages';

interface StepInviteProps {
  groupId: string;
  onNext: () => void;
}

export const StepInvite: React.FC<StepInviteProps> = ({ groupId, onNext }) => {
  const [inviteLink, setInviteLink] = useState('');
  const [hasShared, setHasShared] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const generateLink = async () => {
      try {
        const { data, error } = await supabase
          .from('group_join_tokens')
          .insert({ group_id: groupId })
          .select('token')
          .single();

        if (!error && data?.token) {
          setInviteLink(`${BRAND_CONFIG.url}/i/${data.token}`);
          trackAnalyticsEvent('invite_link_generated', {
            group_id: groupId,
            source: 'onboarding_step_invite',
          });
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    generateLink();
  }, [groupId]);

  const buildMessage = () =>
    buildInviteMessage({
      template: 'group',
      link: inviteLink,
    });

  const handleShare = async () => {
    const fullMessage = buildMessage();
    try {
      if (navigator.share) {
        await navigator.share({ text: fullMessage });
      } else {
        await navigator.clipboard.writeText(fullMessage);
        toast.success('تم نسخ الرابط');
      }
      setHasShared(true);
      trackAnalyticsEvent('invite_shared', { method: 'native_share', group_id: groupId });
      trackAnalyticsEvent('invite_share_clicked', { method: 'native_share', group_id: groupId });
    } catch {
      // User cancelled share
    }
  };

  const handleCopy = async () => {
    const fullMessage = buildMessage();
    await navigator.clipboard.writeText(fullMessage);
    toast.success('تم نسخ الرابط');
    setHasShared(true);
    trackAnalyticsEvent('invite_shared', { method: 'copy', group_id: groupId });
    trackAnalyticsEvent('invite_share_clicked', { method: 'copy', group_id: groupId });
  };


  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-foreground leading-relaxed">
          عشان يعرفون كم عليهم…
          <br />
          لازم ينضمون 😅
        </h2>
        <p className="text-muted-foreground">شارك الرابط مع أصدقائك</p>
      </div>

      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full text-lg h-14"
          onClick={handleShare}
          disabled={loading || !inviteLink}
        >
          <Share2 className="w-5 h-5 ml-2" />
          📲 دعوة الأصدقاء
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full text-lg h-14"
          onClick={handleCopy}
          disabled={loading || !inviteLink}
        >
          <Copy className="w-5 h-5 ml-2" />
          نسخ الرابط
        </Button>
      </div>

      {hasShared && (
        <Button
          size="lg"
          variant="secondary"
          className="w-full text-lg h-14"
          onClick={onNext}
        >
          <Check className="w-5 h-5 ml-2" />
          التالي
        </Button>
      )}
    </div>
  );
};
