import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    q: "كيف يعمل تطبيق Diviso؟",
    qEn: "How does Diviso work?",
    a: "تسوّي مجموعة، وترمي رابطها في القروب، وكل واحد يضيف اللي دفعه. التطبيق يقول مين له ومين عليه.",
    aEn: "Create a group, share its link in your group chat, and everyone adds what they paid. The app shows who owes whom.",
  },
  {
    q: "كيف أبدأ بـ Diviso؟",
    qEn: "How do I get started?",
    a: "حمّل التطبيق من App Store وسجّل دخول، وتبدأ مجموعتك على طول. وفيه باقات اختيارية داخل التطبيق لمزايا إضافية، تشوف تفاصيلها من داخله.",
    aEn: "Download the app from the App Store, sign in, and start your group right away. Optional plans inside the app add extra features; see the details in the app.",
  },
  {
    q: "هل يدعم Diviso الريال السعودي؟",
    qEn: "Does Diviso support the Saudi Riyal?",
    a: "إيه، التطبيق بالريال السعودي، وعربي وإنجليزي بالكامل.",
    aEn: "Yes. The app works in Saudi Riyal, fully in Arabic and English.",
  },
  {
    q: "كيف أدعو أصدقائي للمجموعة؟",
    qEn: "How do I invite friends to a group?",
    a: "انسخ رابط الدعوة وارمه في قروب الواتساب، وكل واحد يدخل المجموعة من الرابط.",
    aEn: "Copy the invite link and share it in your WhatsApp group; everyone joins the group from the link.",
  },
  {
    q: "هل بياناتي آمنة في Diviso؟",
    qEn: "Is my data safe in Diviso?",
    a: "المجموعة يشوفها اللي داخلين فيها بس، وديفيزو ما يحوّل فلوس ولا يطلب بيانات بنك.",
    aEn: "Only the members of a group can see it, and Diviso never moves money or asks for bank details.",
  },
  {
    q: "يحوّل فلوس؟ يحتاج بطاقة أو بنك؟",
    qEn: "Does it transfer money? Do I need a card or bank?",
    a: "لا. ديفيزو دفتر الحساب المشترك بينكم. التحويل يكون بالطريقة اللي تناسبكم، وتسجّلونه في التطبيق.",
    aEn: "No. Diviso is your shared ledger. You pay each other however suits you, then log it in the app.",
  },
];

export const FAQSection = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {isRTL ? "أسئلة شائعة" : "Frequently Asked Questions"}
        </h2>
        <p className="text-muted-foreground text-center mb-10 text-lg">
          {isRTL
            ? "كل اللي تحتاج تعرفه عن Diviso"
            : "Everything you need to know about Diviso"}
        </p>

        <Accordion type="single" collapsible className="space-y-2">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-lg border px-4"
            >
              <AccordionTrigger className="text-base md:text-lg font-medium hover:no-underline">
                {isRTL ? item.q : item.qEn}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {isRTL ? item.a : item.aEn}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* FAQ Schema JSON-LD — English for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.qEn,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.aEn,
              },
            })),
          }),
        }}
      />
    </section>
  );
};
