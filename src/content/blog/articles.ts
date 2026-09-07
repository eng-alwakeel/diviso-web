export interface BlogArticle {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  keywords: string[];
  keywordsEn: string[];
  category: 'guides' | 'tips' | 'news' | 'comparisons';
  readTime: number;
  publishDate: string;
  ogImage?: string;
  content: string;
  contentEn: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "split-food-delivery-order-cost-friends",
    title: "كيف تقسم فاتورة طلب التوصيل (جاهز، هنقرستيشن) مع الأصدقاء بعدل؟",
    titleEn: "How to Split a Food Delivery Order Cost Fairly With Friends",
    description: "طريقة عادلة لتقسيم فاتورة طلب توصيل جماعي: كل شخص يدفع ثمن طلبه، بينما تُقسّم رسوم التوصيل والخدمة والبقشيش بالتساوي. مثال حساب عملي مع خصم الكوبون.",
    descriptionEn: "The fair way to split a group food delivery order: each person pays for their own items, while delivery fees, service fees, and tips are split equally. A worked example including promo code discounts.",
    keywords: ["تقسيم فاتورة طلب التوصيل", "تقسيم طلب جاهز بين الأصدقاء", "من يدفع رسوم التوصيل", "تقسيم فاتورة هنقرستيشن", "حساب فاتورة الطلب الجماعي", "تقسيم كوبون خصم الطلب"],
    keywordsEn: ["how to split a food delivery order with friends", "who pays delivery fee group order", "split jahez order cost calculator", "fair way to split food delivery bill", "splitting delivery tip among friends", "group food order cost splitter"],
    category: "tips",
    readTime: 6,
    publishDate: "2026-09-07",
    content: `
## الإجابة المختصرة

عند تقسيم فاتورة طلب توصيل جماعي (جاهز، هنقرستيشن، مرسول)، يدفع كل شخص ثمن طلبه الخاص بالضبط، بينما تُقسّم رسوم التوصيل ورسوم الخدمة والبقشيش بالتساوي بين الجميع بغض النظر عن حجم طلب كل واحد. أما خصم الكوبون، فالأعدل توزيعه بنفس نسبة قيمة طلب كل شخص من إجمالي الفاتورة قبل الخصم.

## ليش طلب التوصيل يحتاج طريقة تقسيم مختلفة عن المطعم؟

طلب التوصيل الجماعي يختلف عن الجلوس في المطعم لأنه يحتوي على بنود لا علاقة لها بحجم طلب كل شخص:

- **رسوم التوصيل ثابتة**: نفس المبلغ بغض النظر عمّن طلب أكثر أو أقل
- **رسوم الخدمة**: غالباً نسبة مئوية من إجمالي الفاتورة، لا من طلب فرد معين
- **البقشيش**: يُحسب عادة كنسبة من الفاتورة الكلية
- **كوبونات الخصم**: تُطبّق على الفاتورة الكاملة، فيحتاج توزيعها منطقاً عادلاً

## كيف تقسم الفاتورة خطوة بخطوة؟

### الخطوة 1: كل شخص يدفع ثمن طلبه بالضبط
اجمعوا أسعار الأصناف التي طلبها كل شخص من قائمة الطلب — هذا الجزء واضح ولا يحتاج تعقيداً.

### الخطوة 2: اجمعوا التكاليف الإضافية المشتركة
رسوم التوصيل + رسوم الخدمة + البقشيش = "التكلفة الإضافية الإجمالية".

### الخطوة 3: قسّموا التكلفة الإضافية بالتساوي
اقسموا مجموع الرسوم على عدد المشاركين في الطلب، بغض النظر عن قيمة طلب كل واحد.

### مثال عملي
3 أصدقاء طلبوا معاً: أحمد بقيمة 45 ريال، سالم بقيمة 35 ريال، خالد بقيمة 20 ريال.
**المجموع الفرعي** = 45 + 35 + 20 = 100 ريال

رسوم التوصيل 15 ريال + رسوم الخدمة 5 ريال + بقشيش 10 ريال = **30 ريال تكلفة إضافية**

نصيب كل واحد من التكلفة الإضافية = 30 ÷ 3 = 10 ريال

- أحمد يدفع: 45 + 10 = 55 ريال
- سالم يدفع: 35 + 10 = 45 ريال
- خالد يدفع: 20 + 10 = 30 ريال

**التحقق**: 55 + 45 + 30 = 130 ريال = 100 (الطلبات) + 30 (الرسوم)، مطابق تماماً للفاتورة الكلية.

## كيف تتعامل مع خصم الكوبون؟

الطريقة الأعدل هي توزيع الخصم بنفس نسبة قيمة طلب كل شخص من المجموع الفرعي، وليس بالتساوي، لأن الخصم عادة نسبة مئوية من قيمة الطلبات.

### مثال مع خصم 20%
بنفس المثال السابق (مجموع فرعي 100 ريال)، لو طُبّق كوبون خصم 20%:

- أحمد بعد الخصم: 45 × 0.8 = 36 ريال
- سالم بعد الخصم: 35 × 0.8 = 28 ريال
- خالد بعد الخصم: 20 × 0.8 = 16 ريال

**مجموع بعد الخصم** = 36 + 28 + 16 = 80 ريال (بدل 100)

ثم يُضاف نصيب كل واحد من التكلفة الإضافية (30 ÷ 3 = 10 ريال لكل واحد):
- أحمد: 36 + 10 = 46 ريال
- سالم: 28 + 10 = 38 ريال
- خالد: 16 + 10 = 26 ريال

**المجموع النهائي** = 46 + 38 + 26 = 110 ريال = 80 + 30، مطابق تماماً.

## ماذا لو طلب شخص صنفاً يُشارك فيه الجميع (مثل مقبلات مشتركة)؟

اجمعوا سعر الصنف المشترك مع التكلفة الإضافية (رسوم التوصيل والخدمة والبقشيش) وقسّموه بالتساوي على الجميع، بدل تحميله لشخص واحد فقط.

## خطوات عملية لتسهيل تقسيم الطلب

### الخطوة 1: اطلبوا بحساب واحد موحّد
أسهل من تجميع عدة طلبات منفصلة، ويضمن رسوم توصيل واحدة فقط بدل تكرارها.

### الخطوة 2: صوّروا الفاتورة النهائية فور وصولها
تحتوي على تفصيل الأصناف والرسوم، وتُستخدم كمرجع عند الحساب.

### الخطوة 3: سجّلوا المصروف فوراً في تطبيق تقسيم
استخدم تطبيق مثل Diviso لتسجيل كل صنف بمبلغه الفعلي، وتوزيع الرسوم المشتركة تلقائياً.

### الخطوة 4: لا تؤجلوا التسوية
اطلبات التوصيل تتكرر كثيراً بين نفس المجموعة، فالتسوية الفورية تمنع تراكم عدة طلبات في حساب واحد معقد.

## أخطاء شائعة عند تقسيم فاتورة التوصيل

- **تقسيم كل شيء بالتساوي بغض النظر عن قيمة الطلب**: يجعل من طلب أقل يدفع أكثر من نصيبه الفعلي
- **تحميل رسوم التوصيل على شخص واحد فقط**: غير عادل لأن الجميع استفاد من التوصيل
- **توزيع الخصم بالتساوي بدل النسبة**: يعطي من طلب أقل خصماً أكبر من استحقاقه الفعلي
- **نسيان تسجيل من دفع فاتورة التطبيق الأصلية**: يصعب تتبع من يدين لمن لاحقاً

## كيف يساعدك Diviso في تقسيم طلبات التوصيل؟

- ✅ تسجيل كل صنف بمبلغه الفعلي لكل شخص
- ✅ توزيع تلقائي للرسوم المشتركة (توصيل، خدمة، بقشيش) بالتساوي
- ✅ توزيع خصم الكوبون بنسبة عادلة حسب قيمة كل طلب
- ✅ تتبع فوري لمن دفع فاتورة التطبيق ومن عليه نصيبه
- ✅ سجل تراكمي لكل طلبات التوصيل الجماعية مع نفس المجموعة

## أسئلة شائعة

### هل يُقسّم رسم التوصيل بالتساوي أم حسب حجم الطلب؟
بالتساوي دائماً، لأن رسم التوصيل مبلغ ثابت لا علاقة له بحجم طلب كل شخص — كل من استفاد من التوصيل يتحمل نفس النصيب.

### كيف أوزع خصم الكوبون بين المشاركين؟
وزّعه بنفس نسبة قيمة طلب كل شخص من المجموع الفرعي قبل الخصم، وليس بالتساوي، لأن الخصم عادة نسبة مئوية من قيمة الطلبات الفعلية.

### ماذا لو طلب أحد الأصدقاء صنفاً يشاركه فيه الجميع؟
اجمعوا سعر الصنف المشترك مع باقي التكاليف الإضافية (رسوم التوصيل والخدمة) وقسّموه بالتساوي على كل من شارك في تناوله.

## الخلاصة

طلب التوصيل الجماعي ما يحتاج يكون معقداً. كل شخص يدفع طلبه، وتُقسّم الرسوم بالتساوي، ويُوزّع الخصم بنسبة عادلة. سجّلوا كل شيء فور وصول الفاتورة ولا تتركوا الحسابات تتراكم.

**جرب Diviso الآن وقسّم فاتورة طلب التوصيل القادم بعدل وسرعة.**
    `,
    contentEn: `
## Quick Answer

When splitting a group food delivery order (Jahez, HungerStation, Uber Eats), each person should pay exactly the cost of the items they ordered, while delivery fees, service fees, and tips get split equally among everyone regardless of order size. As for a promo code discount, the fairest approach is to distribute it in proportion to each person's share of the subtotal before the discount.

## Why a Delivery Order Needs a Different Splitting Method Than a Restaurant

A group food delivery order differs from dining in because it includes line items unrelated to the size of anyone's individual order:

- **Delivery fee is fixed**: the same amount regardless of who ordered more or less
- **Service fee**: usually a percentage of the total bill, not tied to any one person's order
- **Tip**: typically calculated as a percentage of the whole order
- **Promo code discounts**: applied to the full bill, so distributing them fairly needs a clear method

## How to Split the Bill Step by Step

### Step 1: Each Person Pays Exactly Their Own Order
Add up the prices of the items each person ordered from the menu — this part is straightforward and needs no complexity.

### Step 2: Add Up the Shared Extra Costs
Delivery fee + service fee + tip = "total shared extra cost."

### Step 3: Split the Extra Cost Equally
Divide the total fees by the number of people in the order, regardless of how much each person's items cost.

### A Worked Example
3 friends order together: Ahmed's items cost 45 SAR, Salem's cost 35 SAR, Khaled's cost 20 SAR.
**Subtotal** = 45 + 35 + 20 = 100 SAR

Delivery fee 15 SAR + service fee 5 SAR + tip 10 SAR = **30 SAR in extra costs**

Each person's share of the extra cost = 30 ÷ 3 = 10 SAR

- Ahmed pays: 45 + 10 = 55 SAR
- Salem pays: 35 + 10 = 45 SAR
- Khaled pays: 20 + 10 = 30 SAR

**Check**: 55 + 45 + 30 = 130 SAR = 100 (items) + 30 (fees), matching the total bill exactly.

## How to Handle a Promo Code Discount

The fairest method is to distribute the discount in proportion to each person's share of the subtotal, not equally, since discounts are usually a percentage of the order value.

### Example With a 20% Discount
Using the same example (100 SAR subtotal), if a 20% promo code is applied:

- Ahmed after discount: 45 × 0.8 = 36 SAR
- Salem after discount: 35 × 0.8 = 28 SAR
- Khaled after discount: 20 × 0.8 = 16 SAR

**Total after discount** = 36 + 28 + 16 = 80 SAR (instead of 100)

Then add each person's share of the extra cost (30 ÷ 3 = 10 SAR each):
- Ahmed: 36 + 10 = 46 SAR
- Salem: 28 + 10 = 38 SAR
- Khaled: 16 + 10 = 26 SAR

**Final total** = 46 + 38 + 26 = 110 SAR = 80 + 30, matching exactly.

## What If Someone Orders an Item Everyone Shares (Like a Shared Appetizer)?

Add the shared item's price to the extra costs (delivery, service fee, tip) and split it equally among everyone who's sharing it, instead of billing it to just one person.

## A Practical System for Splitting a Delivery Order

### Step 1: Order Through One Combined Cart
Easier than combining several separate orders, and it guarantees a single delivery fee instead of paying it multiple times.

### Step 2: Photograph the Final Receipt as Soon as It Arrives
It shows the item and fee breakdown, and serves as your reference for the calculation.

### Step 3: Log the Expense Immediately in a Splitting App
Use an app like Diviso to log each item at its actual price and automatically distribute the shared fees.

### Step 4: Don't Delay Settlement
Delivery orders repeat often within the same group, so settling immediately prevents multiple orders from piling up into one confusing tab.

## Common Mistakes When Splitting a Delivery Bill

- **Splitting everything equally regardless of order value**: makes whoever ordered less pay more than their fair share
- **Billing the delivery fee to just one person**: unfair since everyone benefited from the delivery
- **Distributing the discount equally instead of proportionally**: gives whoever ordered less a bigger discount than they're actually entitled to
- **Forgetting to log who paid the original app bill**: makes it hard to track who owes whom later

## How Diviso Helps Split Delivery Orders

- ✅ Logs each item at its actual price per person
- ✅ Automatically distributes shared fees (delivery, service, tip) equally
- ✅ Distributes a promo code discount proportionally based on each order's value
- ✅ Instantly tracks who paid the app bill and who still owes their share
- ✅ A running record of all group delivery orders with the same crew

## Frequently Asked Questions

### Is the delivery fee split equally or based on order size?
Always equally, since the delivery fee is a fixed amount unrelated to the size of anyone's individual order — everyone who benefited from the delivery bears the same share.

### How do I distribute a promo code discount among participants?
Distribute it in proportion to each person's share of the subtotal before the discount, not equally, since discounts are usually a percentage of the actual order value.

### What if a friend orders an item everyone shares?
Add the shared item's price to the rest of the extra costs (delivery and service fees) and split it equally among everyone who shared it.

## Conclusion

A group food delivery order doesn't have to be complicated. Everyone pays for their own items, the fees get split equally, and the discount gets distributed proportionally. Log everything as soon as the bill arrives and don't let the tabs pile up.

**Try Diviso now and split your next delivery order fairly and quickly.**
    `
  },
  {
    slug: "split-eid-al-adha-sacrifice-cost-family",
    title: "كيف تقسم تكلفة الأضحية بين الإخوة والعائلة في عيد الأضحى؟",
    titleEn: "How to Split the Cost of an Eid al-Adha Sacrifice (Udhiyah) Among Siblings or Family",
    description: "دليل عملي لتقسيم تكلفة الأضحية بين أفراد العائلة، مع شرح نظام الأسباع السبعة للبقر والإبل ومثال حساب لتنظيم جمع الفلوس قبل العيد.",
    descriptionEn: "A practical guide to splitting the cost of an Eid al-Adha sacrifice among family members, explaining the seven-share system for cows and camels with a worked example for organizing the collection before Eid.",
    keywords: ["تقسيم تكلفة الأضحية", "أسباع الأضحية", "تقسيم فلوس الأضحية بين الإخوة", "كم سعر سبع الأضحية", "جمع فلوس الأضحية العائلية", "تنظيم مصاريف عيد الأضحى"],
    keywordsEn: ["how to split cost of udhiyah among family", "seven shares cow sacrifice cost", "eid al-adha sacrifice cost calculator", "splitting qurbani cost with siblings", "cost per share cow sacrifice", "organize family udhiyah collection"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-09-06",
    content: `
## الإجابة المختصرة

يمكن تقسيم تكلفة أضحية البقر أو الإبل على 7 أشخاص كحد أقصى (نظام "الأسباع")، بحيث يمثل كل سُبع أضحية مستقلة لشخص أو أسرة. نصيب السُبع الواحد = تكلفة الأضحية الكاملة ÷ 7. أما الغنم والماعز، فتُحسب كل رأس أضحية واحدة فقط لشخص واحد ولا تُقسّم بين عدة أشخاص كأسباع.

## ليش تقسيم تكلفة الأضحية له نظام خاص؟

الأضحية عبادة سنوية متكررة، وتقسيم تكلفتها بين أفراد العائلة له خصوصيات لا تنطبق على المصاريف الجماعية العادية:

- **نظام الأسباع الشرعي**: البقر والإبل فقط يمكن تقسيمها لسبعة أسهم، كل سهم يُحسب أضحية كاملة لصاحبه
- **ارتفاع الأسعار قرب العيد**: أسعار الأضاحي ترتفع كلما اقترب موعد العيد، فالتخطيط المبكر يوفر فلوساً
- **تفاوت الرغبات**: البعض يفضل الغنم لسهولة التوزيع، والبعض يفضل المشاركة في بقرة لتقليل التكلفة الفردية
- **تكرار سنوي**: نفس المجموعة (الإخوة مثلاً) قد تكرر هذا الترتيب كل عام، فيستحق نظاماً ثابتاً

## كيف يعمل نظام الأسباع بالضبط؟

### القاعدة
البقرة أو الجمل يُحسب كسبع أضحيات مستقلة. يمكن لعائلة واحدة أن تشتري الأسباع السبعة كاملة لتغطية 7 أفراد، أو تشترك في بعض الأسباع فقط وتترك الباقي لعائلات أخرى.

### مثال عملي
لو سعر البقرة الكاملة 3500 ريال، وأراد 5 إخوة كل واحد يضحي عن نفسه وعائلته:

- تكلفة السُبع الواحد = 3500 ÷ 7 = 500 ريال
- نصيب كل أخ (سبع واحد لكل واحد) = 500 ريال
- المجموع لخمسة أسباع = 500 × 5 = 2500 ريال
- يبقى سبعان (1000 ريال) يمكن للعائلة شراؤهما إضافياً أو تركهما لأشخاص آخرين خارج العائلة

### ماذا عن الغنم والماعز؟
كل رأس غنم أو ماعز تُحسب أضحية واحدة كاملة لشخص واحد فقط، ولا يمكن تقسيمها على عدة أشخاص كأسهم. لو أراد 3 إخوة كل واحد أضحية غنم منفصلة، فالتكلفة الإجمالية = سعر الرأس الواحد × 3، ويدفع كل واحد سعر أضحيته بالكامل، لا ثلث التكلفة.

## كيف تنظم جمع فلوس الأضحية العائلية؟

### الخطوة 1: حددوا نوع الأضحية مبكراً
اتفقوا: بقرة بالأسباع، أم كل واحد غنمة منفصلة، أم مزيج بين الاثنين.

### الخطوة 2: احصروا عدد المشاركين والحصص
لو اخترتم البقرة، حددوا بالضبط من يأخذ كم سُبع، ووثّقوا ذلك حتى لا يحصل لبس عند التوزيع.

### الخطوة 3: اجمعوا الفلوس قبل موعد الذبح بوقت كافٍ
الحجز المبكر (قبل أسبوعين على الأقل من العيد) يضمن أسعاراً أفضل ويجنّب ضغط اللحظة الأخيرة.

### الخطوة 4: سجّلوا التحصيل في مجموعة واحدة
استخدم تطبيق مثل Diviso لإنشاء مجموعة "أضحية العائلة" وتتبع من دفع نصيبه ومن لم يدفع بعد.

### الخطوة 5: وثّقوا التكلفة الفعلية بعد الشراء
لو اختلف السعر النهائي عن التقدير الأولي (ارتفاع أو انخفاض)، عدّلوا نصيب كل شخص ووزّعوا الفرق بشفافية.

## نصائح لتوفير تكلفة الأضحية

- 🐄 **احجزوا مبكراً**: الأسعار ترتفع بشكل ملحوظ في آخر أسبوع قبل العيد
- 🤝 **شاركوا في بقرة بدل الغنم المنفصل**: التكلفة للفرد الواحد غالباً أقل في نظام الأسباع
- 📋 **اتفقوا على معايير الجودة مسبقاً**: تجنبوا خلاف "ليش اخترتوا هذا الحجم" بعد الشراء
- 💰 **افتحوا التحصيل بوقت كافٍ**: شهر كامل قبل العيد يعطي مرونة للجميع

## أخطاء شائعة عند تقسيم تكلفة الأضحية

- **الخلط بين نظام الأسباع والغنم**: الغنم لا يُقسّم كأسهم، كل رأس أضحية كاملة لشخص واحد
- **التأخر في الحجز**: يرفع التكلفة ويقلل الخيارات المتاحة
- **عدم توثيق من أخذ أي سُبع**: يسبب لبساً عند توزيع اللحم لاحقاً
- **نسيان تسوية فرق السعر النهائي**: التقدير المبدئي قد يختلف عن السعر الفعلي وقت الشراء

## كيف يساعدك Diviso في تنظيم أضحية العائلة؟

- ✅ إنشاء مجموعة سنوية ثابتة لأضحية العائلة يمكن إعادة استخدامها كل عام
- ✅ تسجيل نصيب كل شخص حسب نوع مشاركته (سبع كامل، نصف سبع، غنم منفصلة)
- ✅ تتبع من دفع نصيبه قبل موعد الحجز
- ✅ تعديل النصيب تلقائياً عند تغيّر السعر النهائي
- ✅ سجل واضح يوثّق من شارك وبأي حصة كل عام

## أسئلة شائعة

### كم سعر سبع الأضحية إذا كانت البقرة بـ3500 ريال؟
سعر السبع الواحد = 3500 ÷ 7 = 500 ريال. هذا يمثل أضحية كاملة ومستقلة لشخص واحد أو أسرة واحدة.

### هل يمكن تقسيم أضحية الغنم بين شخصين؟
لا، الغنم والماعز تُحسب أضحية واحدة كاملة لشخص واحد فقط، على عكس البقر والإبل التي يمكن تقسيمها إلى 7 أسهم مستقلة.

### متى الأفضل نبدأ جمع فلوس الأضحية من العائلة؟
يُفضّل البدء قبل شهر تقريباً من العيد، لأن الحجز المبكر يضمن أسعاراً أفضل ويعطي وقتاً كافياً لتحصيل نصيب كل فرد بدون ضغط اللحظة الأخيرة.

## الخلاصة

تقسيم تكلفة الأضحية بين العائلة أسهل بكثير مع فهم نظام الأسباع وتنظيم واضح للتحصيل. حددوا نوع الأضحية مبكراً، وثّقوا الحصص، ودعوا التطبيق يتابع من دفع كل عام.

**جرب Diviso الآن ونظّم جمع فلوس الأضحية مع عائلتك بسهولة.**
    `,
    contentEn: `
## Quick Answer

The cost of a cow or camel sacrifice can be split among up to 7 people (the "seven-share" system), where each share counts as one complete, independent sacrifice for a person or household. The cost per share = total sacrifice cost ÷ 7. Sheep and goats, on the other hand, each count as a single complete sacrifice for one person and cannot be divided into shares among multiple people.

## Why Splitting Udhiyah Costs Has Its Own System

The Eid al-Adha sacrifice is a recurring yearly act of worship, and splitting its cost among family members has quirks that don't apply to ordinary group expenses:

- **The religious seven-share system**: only cows and camels can be split into seven shares, each counting as one complete sacrifice for its owner
- **Prices rise closer to Eid**: sacrifice animal prices climb the closer it gets to Eid, so early planning saves money
- **Different preferences**: some prefer a separate sheep for easier distribution, others prefer sharing a cow to lower the individual cost
- **A yearly repeat**: the same group (siblings, for example) may repeat this arrangement every year, making a consistent system worthwhile

## How the Seven-Share System Works Exactly

### The Rule
A cow or camel counts as seven independent sacrifices. One family can buy all seven shares to cover 7 people, or take just some shares and leave the rest for other families.

### A Worked Example
If a full cow costs 3,500 SAR, and 5 siblings each want to perform their own sacrifice:

- Cost per share = 3,500 ÷ 7 = 500 SAR
- Each sibling's share (one share each) = 500 SAR
- Total for five shares = 500 × 5 = 2,500 SAR
- The remaining two shares (1,000 SAR) can be bought additionally by the family or left for other people outside the family

### What About Sheep and Goats?
Each sheep or goat counts as one complete sacrifice for a single person only, and cannot be divided into shares among multiple people. If 3 siblings each want a separate sheep sacrifice, the total cost = price per head × 3, and each person pays the full price of their own sacrifice, not a third of the total.

## How to Organize a Family Udhiyah Collection

### Step 1: Decide the Type of Sacrifice Early
Agree on: a cow split into shares, separate sheep for each person, or a mix of both.

### Step 2: List the Participants and Their Shares
If you choose the cow, determine exactly who takes how many shares, and document it clearly to avoid confusion at distribution time.

### Step 3: Collect the Money With Enough Lead Time Before Slaughter
Booking early (at least two weeks before Eid) secures better prices and avoids last-minute pressure.

### Step 4: Log the Collection in One Group
Use an app like Diviso to create a "Family Udhiyah" group and track who has paid their share and who hasn't yet.

### Step 5: Document the Actual Cost After Purchase
If the final price differs from the initial estimate (higher or lower), adjust each person's share and distribute the difference transparently.

## Tips to Save on Udhiyah Costs

- 🐄 **Book early**: prices rise noticeably in the final week before Eid
- 🤝 **Share a cow instead of buying separate sheep**: the per-person cost is usually lower with the seven-share system
- 📋 **Agree on quality standards in advance**: avoid a "why did you pick this size" argument after the purchase
- 💰 **Open the collection with enough lead time**: a full month before Eid gives everyone flexibility

## Common Mistakes When Splitting Udhiyah Costs

- **Confusing the share system with sheep**: sheep aren't divided into shares — each head is one complete sacrifice for one person
- **Booking too late**: raises the cost and reduces available options
- **Not documenting who took which share**: causes confusion later when distributing the meat
- **Forgetting to settle the final price difference**: the initial estimate may differ from the actual price at purchase time

## How Diviso Helps Organize a Family Udhiyah

- ✅ Creates a recurring yearly group for the family sacrifice that can be reused every year
- ✅ Logs each person's share based on their participation type (full share, half share, separate sheep)
- ✅ Tracks who has paid their share before the booking deadline
- ✅ Automatically adjusts shares when the final price changes
- ✅ A clear record documenting who participated and with what share each year

## Frequently Asked Questions

### How much does one share of a cow sacrifice cost if the cow is 3,500 SAR?
The cost per share = 3,500 ÷ 7 = 500 SAR. This represents one complete, independent sacrifice for one person or household.

### Can a sheep sacrifice be split between two people?
No, sheep and goats each count as one complete sacrifice for a single person only, unlike cows and camels, which can be divided into 7 independent shares.

### When is the best time to start collecting udhiyah money from the family?
It's best to start about a month before Eid, since booking early secures better prices and gives enough time to collect each person's share without last-minute pressure.

## Conclusion

Splitting the cost of the Eid al-Adha sacrifice among family becomes much easier once you understand the seven-share system and set up a clear collection process. Decide the type of sacrifice early, document the shares, and let the app track who has paid each year.

**Try Diviso now and organize your family's udhiyah collection with ease.**
    `
  },
  {
    slug: "split-electricity-water-bills-by-usage",
    title: "كيف تقسم فاتورة الكهرباء والماء بعدل بين شركاء السكن حسب الاستهلاك؟",
    titleEn: "How to Split Electricity and Water Bills Fairly Among Roommates by Actual Usage",
    description: "لماذا التقسيم المتساوي لفاتورة الكهرباء ظالم أحياناً؟ تعرف على طريقة تقسيم الفواتير حسب الاستهلاك الفعلي بدل عدد الأشخاص فقط، مع مثال حساب عملي.",
    descriptionEn: "Why an equal split of the electricity bill can be unfair — learn how to divide utility bills based on actual usage instead of just headcount, with a worked example.",
    keywords: ["تقسيم فاتورة الكهرباء بين السكان", "تقسيم فاتورة الماء بعدل", "تقسيم فواتير الاستهلاك", "كيف اقسم فاتورة الكهرباء", "خلاف فاتورة الكهرباء بين الشركاء", "تقسيم المرافق حسب الاستخدام"],
    keywordsEn: ["how to split electricity bill fairly roommates", "fair way to split utility bills", "split water bill by usage", "electricity bill dispute roommates", "utility cost splitting formula", "divide shared bills by actual usage"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-09-05",
    content: `
## الإجابة المختصرة

تقسيم فاتورة الكهرباء بالتساوي بين شركاء السكن قد يكون ظالماً إذا اختلف استهلاكهم الفعلي بشكل كبير (مثلاً شخص يعمل من المنزل بالتكييف طوال اليوم مقابل شخص يقضي معظم وقته خارج المنزل). الحل الأعدل هو تقسيم الفاتورة حسب **مؤشر استهلاك تقريبي** لكل شخص — عدد الساعات التي يقضيها في المنزل مع تشغيل الأجهزة — بدل القسمة المتساوية البحتة على عدد الأشخاص.

## ليش التقسيم المتساوي لا يكفي دائماً؟

بعض الفواتير (كالإنترنت) لا تتأثر بمن يستخدمها أكثر، لكن الكهرباء والماء مختلفان:

- **تكييف الهواء**: الشخص الذي يعمل من المنزل يشغّل المكيف ساعات أطول من زميله الذي يخرج طوال النهار
- **السفر المتكرر**: شريك يسافر نصف الشهر يستهلك أقل بكثير ممن يبقى في المسكن دائماً
- **أجهزة شخصية**: جهاز ألعاب يعمل 24 ساعة، أو غسالة تُستخدم يومياً من شخص واحد فقط
- **اختلاف عدد ساعات الاستحمام**: بعض الأشخاص يستهلكون ماء ساخن أكثر من غيرهم

## متى يكفي التقسيم المتساوي؟

- **جدول حياة متشابه**: إذا كان الجميع يعمل بنفس الساعات تقريباً ويقضي وقتاً متقارباً في المنزل
- **فواتير لا تتأثر بالاستخدام الفردي**: مثل الإنترنت أو رسوم الصيانة الثابتة
- **فرق ضئيل لا يستحق التعقيد**: أحياناً الفرق بالريالات صغير جداً بحيث لا يستحق حساباً دقيقاً

## كيف تحسب التقسيم حسب الاستهلاك الفعلي؟

### الطريقة الأدق: عداد فرعي أو قارئ استهلاك ذكي
لو أمكن تركيب مقياس استهلاك ذكي (Smart Plug) على غرفة كل شخص أو جهازه الرئيسي (مكيف الغرفة مثلاً)، يمكن قراءة الاستهلاك الفعلي بالكيلوواط/ساعة لكل شخص وتقسيم الفاتورة بنفس النسبة تماماً.

### الطريقة التقريبية: مؤشر ساعات الوجود مع التشغيل
إذا لم يتوفر عداد فرعي، استخدم تقديراً معقولاً: عدد الساعات اليومية التي يقضيها كل شخص في المنزل مع تشغيل الأجهزة الرئيسية (تكييف، أجهزة كهربائية).

### مثال عملي
فاتورة كهرباء شهرية 450 ريال بين 3 شركاء سكن:
- أحمد يعمل من المنزل، يشغّل المكيف تقريباً 10 ساعات يومياً
- سالم يخرج للعمل، يشغّله تقريباً 6 ساعات يومياً (المساء والليل)
- خالد يسافر كثيراً لعمله، متواجد نصف الشهر فقط، بمعدل 3 ساعات يومياً تقريباً على كامل الشهر

**حساب "ساعات الاستخدام الشهرية" لكل شخص** (× 30 يوم):
- أحمد: 10 × 30 = 300 ساعة
- سالم: 6 × 30 = 180 ساعة
- خالد: 3 × 30 = 90 ساعة

**مجموع الساعات** = 300 + 180 + 90 = 570 ساعة
**تكلفة الساعة الواحدة** = 450 ÷ 570 ≈ 0.79 ريال

- نصيب أحمد = 300 × 0.79 ≈ 237 ريال
- نصيب سالم = 180 × 0.79 ≈ 142 ريال
- نصيب خالد = 90 × 0.79 ≈ 71 ريال

قارن هذا بالتقسيم المتساوي (150 ريال لكل واحد)، الذي كان سيجعل خالد يدفع أكثر من ضعف استهلاكه الفعلي رغم غيابه المتكرر.

## ماذا عن فاتورة الماء؟

الماء أصعب في القياس الفردي من الكهرباء، لذا الطرق الشائعة:

- **التقسيم بالتساوي**: مقبول إذا كان الاستهلاك متقارباً بين الجميع
- **حسب عدد أيام الوجود الفعلي بالشهر**: نفس منطق الكهرباء، لكن بعدد الأيام بدل الساعات
- **استثناء استخدامات خاصة**: مثل شخص يغسل سيارته بانتظام بخرطوم المسكن — يمكن الاتفاق على مساهمة إضافية منه

## خطوات عملية لتطبيق هذا النظام

### الخطوة 1: اتفقوا على طريقة القياس قبل أول فاتورة
حددوا: هل ستستخدمون عداداً فرعياً، أم مؤشر الساعات التقريبي، أم تقسيماً متساوياً بسيطاً؟

### الخطوة 2: سجّلوا جدول الحضور التقريبي لكل شخص
لا يحتاج دقة زائدة — تقدير عام لساعات الوجود في المنزل كافٍ لمعظم الحالات.

### الخطوة 3: سجّلوا كل فاتورة بمبالغ مخصصة
استخدم تطبيق مثل Diviso لتسجيل فاتورة الكهرباء بنصيب مختلف لكل شخص بدل القسمة التلقائية المتساوية.

### الخطوة 4: راجعوا النسب كل بضعة أشهر
إذا تغيّر جدول أحد الشركاء (بدأ العمل من المنزل مثلاً)، عدّلوا النسب المتفق عليها.

## أخطاء شائعة عند تقسيم فواتير المرافق

- **التقسيم المتساوي رغم فروقات كبيرة بالاستهلاك**: يخلق استياءً متكرراً كل شهر
- **عدم توثيق طريقة الحساب**: يصعب تذكر الاتفاق الأصلي بعد أشهر
- **تجاهل التغيرات الموسمية**: استهلاك الصيف (تكييف) يختلف جذرياً عن الشتاء
- **الخلط بين فواتير مختلفة الطبيعة**: الإنترنت يُقسّم بالتساوي دائماً، بينما الكهرباء قد تحتاج تقسيماً مختلفاً

## كيف يساعدك Diviso في هذا الموقف؟

- ✅ تسجيل كل فاتورة (كهرباء، ماء، إنترنت) كبند منفصل بطريقة تقسيم مختلفة لكل واحدة
- ✅ حفظ نسب التقسيم المتفق عليها لإعادة استخدامها كل شهر تلقائياً
- ✅ تعديل سريع للنسب عند تغيّر ظروف أحد الشركاء
- ✅ سجل شهري واضح يوضح كيف حُسب نصيب كل شخص
- ✅ تنبيهات تلقائية عند وصول موعد فاتورة جديدة

## أسئلة شائعة

### هل يجب تقسيم فاتورة الكهرباء بالتساوي بين شركاء السكن؟
ليس بالضرورة. إذا اختلف استهلاك الأجهزة (خصوصاً التكييف) بشكل كبير بسبب اختلاف ساعات الوجود في المنزل، فالأعدل تقسيم الفاتورة حسب مؤشر استهلاك تقريبي لكل شخص بدل التقسيم المتساوي.

### كيف أحسب نصيبي من فاتورة الكهرباء بدون عداد فرعي؟
استخدم تقديراً معقولاً لعدد الساعات اليومية التي تقضيها في المنزل مع تشغيل الأجهزة الرئيسية، ثم اقسم الفاتورة الإجمالية على مجموع ساعات كل الشركاء مجتمعة، واضرب الناتج في ساعاتك الفعلية.

### هل تُقسّم فاتورة الإنترنت بنفس طريقة الكهرباء؟
لا، الإنترنت عادة يُقسّم بالتساوي بين الجميع لأن الاستخدام الفردي لا يزيد التكلفة الإجمالية بشكل ملموس، بعكس الكهرباء والماء اللذين يرتبطان مباشرة بالاستهلاك الفعلي.

## الخلاصة

فواتير المرافق المشتركة لا يجب أن تكون مصدر خلاف شهري متكرر. اتفقوا على طريقة قياس معقولة للاستهلاك، وثّقوها، ودعوا التطبيق يتابع الحسابات بدل الجدال كل شهر.

**جرب Diviso الآن وقسّم فواتير الكهرباء والماء بعدل حسب الاستهلاك الفعلي.**
    `,
    contentEn: `
## Quick Answer

Splitting the electricity bill equally among roommates can be unfair when actual usage differs significantly — for example, someone who works from home with the AC running all day versus someone who's out of the house most of the time. The fairer solution is to split the bill based on an **approximate usage indicator** for each person — the hours they spend at home with appliances running — instead of a plain equal split by headcount.

## Why an Equal Split Doesn't Always Work

Some bills (like internet) aren't affected by who uses them more, but electricity and water are different:

- **Air conditioning**: someone working from home runs the AC far longer than a roommate who's out all day
- **Frequent travel**: a roommate who travels half the month uses far less than one who's always home
- **Personal devices**: a gaming PC running 24 hours, or a washing machine used daily by just one person
- **Different shower habits**: some people use noticeably more hot water than others

## When Is an Equal Split Actually Fine?

- **Similar life schedules**: if everyone works roughly the same hours and spends similar time at home
- **Bills unaffected by individual usage**: like internet or fixed maintenance fees
- **A negligible difference**: sometimes the difference in riyals is too small to justify a complex calculation

## How to Calculate a Split Based on Actual Usage

### The Most Accurate Method: A Sub-Meter or Smart Plug
If you can install a smart plug or sub-meter on each person's room or main appliance (like a room AC unit), you can read the actual kWh consumption per person and split the bill in exactly that proportion.

### The Approximate Method: A "Hours Present With Usage" Indicator
Without a sub-meter, use a reasonable estimate: the daily hours each person spends at home with major appliances running (AC, electronics).

### A Worked Example
A monthly electricity bill of 450 SAR split among 3 roommates:
- Ahmed works from home, running the AC about 10 hours a day
- Salem goes out to work, running it about 6 hours a day (evenings and night)
- Khaled travels frequently for work, home only half the month, averaging about 3 hours a day across the full month

**Calculating "monthly usage hours" for each person** (× 30 days):
- Ahmed: 10 × 30 = 300 hours
- Salem: 6 × 30 = 180 hours
- Khaled: 3 × 30 = 90 hours

**Total hours** = 300 + 180 + 90 = 570 hours
**Cost per hour** = 450 ÷ 570 ≈ 0.79 SAR

- Ahmed's share = 300 × 0.79 ≈ 237 SAR
- Salem's share = 180 × 0.79 ≈ 142 SAR
- Khaled's share = 90 × 0.79 ≈ 71 SAR

Compare this to an equal split (150 SAR each), which would have made Khaled pay more than double his actual usage despite his frequent absences.

## What About the Water Bill?

Water is harder to measure individually than electricity, so the common approaches are:

- **Equal split**: acceptable if usage is roughly similar across everyone
- **By actual days present in the month**: the same logic as electricity, but using days instead of hours
- **Excluding special usage**: like someone regularly washing their car with the house hose — the group can agree on an extra contribution from them

## A Practical System for Applying This

### Step 1: Agree on the Measurement Method Before the First Bill
Decide: will you use a sub-meter, an approximate hours indicator, or a simple equal split?

### Step 2: Log Each Person's Approximate Presence Schedule
No need for excessive precision — a general estimate of hours at home is enough for most cases.

### Step 3: Log Each Bill With Custom Amounts
Use an app like Diviso to log the electricity bill with a different share for each person instead of an automatic equal split.

### Step 4: Review the Ratios Every Few Months
If someone's schedule changes (say, they start working from home), adjust the agreed-upon ratios.

## Common Mistakes When Splitting Utility Bills

- **An equal split despite large usage differences**: creates recurring monthly resentment
- **Not documenting the calculation method**: makes it hard to remember the original agreement months later
- **Ignoring seasonal changes**: summer usage (AC) differs drastically from winter
- **Mixing up different bill types**: internet should always split equally, while electricity may need a different split

## How Diviso Helps in This Situation

- ✅ Logs each bill (electricity, water, internet) as a separate line item with its own splitting method
- ✅ Saves the agreed-upon split ratios to reuse automatically every month
- ✅ Quickly adjusts ratios when a roommate's circumstances change
- ✅ A clear monthly record showing how each person's share was calculated
- ✅ Automatic reminders when a new bill is due

## Frequently Asked Questions

### Should the electricity bill always be split equally among roommates?
Not necessarily. If appliance usage (especially AC) differs significantly due to different hours spent at home, it's fairer to split the bill based on an approximate usage indicator for each person instead of a plain equal split.

### How do I calculate my share of the electricity bill without a sub-meter?
Use a reasonable estimate of the daily hours you spend at home with major appliances running, then divide the total bill by the combined hours of all roommates, and multiply the result by your own actual hours.

### Is the internet bill split the same way as electricity?
No, internet is usually split equally among everyone because individual usage doesn't meaningfully increase the total cost, unlike electricity and water, which are directly tied to actual consumption.

## Conclusion

Shared utility bills shouldn't be a recurring monthly source of conflict. Agree on a reasonable usage measurement method, document it, and let the app track the numbers instead of arguing every month.

**Try Diviso now and split your electricity and water bills fairly based on actual usage.**
    `
  },
  {
    slug: "split-airbnb-cost-by-room-type",
    title: "كيف تقسم تكلفة شقة إير بي إن بي (Airbnb) بعدل حسب نوع الغرفة؟",
    titleEn: "How to Split an Airbnb or Vacation Rental Cost Fairly by Room Type",
    description: "طريقة عادلة لتقسيم تكلفة شقة أو فيلا مستأجرة بين مجموعة عندما تختلف جودة الغرف، مع مثال حساب باستخدام أوزان نسبية لكل غرفة بدل التقسيم المتساوي البحت.",
    descriptionEn: "A fair way to split a rented Airbnb or vacation home among a group when the rooms differ in quality, using a weighted formula instead of a plain equal split.",
    keywords: ["تقسيم تكلفة إير بي إن بي", "تقسيم إيجار شقة مشتركة للرحلة", "من يدفع أكثر للغرفة الرئيسية", "تقسيم تكلفة الفيلا بين الأصدقاء", "حساب نصيب الغرفة في الرحلة", "تقسيم سكن الرحلة الجماعية"],
    keywordsEn: ["how to split airbnb cost by room", "fair way to split vacation rental cost", "who pays more for the master bedroom split", "split villa rental cost with friends", "weighted room cost splitting", "group trip accommodation cost calculator"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-09-04",
    content: `
## الإجابة المختصرة

عندما تختلف جودة الغرف في شقة أو فيلا مستأجرة (غرفة رئيسية بحمام خاص مقابل غرفة أطفال بأسرّة بطابقين)، فالتقسيم المتساوي البحت غير عادل. الطريقة الأعدل هي **التقسيم الموزون**: تُعطى كل غرفة "وزناً نسبياً" حسب جودتها، ثم تُقسّم التكلفة الإجمالية على مجموع الأوزان، بحيث يدفع نزلاء الغرفة الأفضل نصيباً أعلى قليلاً من نزلاء الغرف الأبسط.

## ليش التقسيم المتساوي لا يكفي هنا؟

لو 6 أشخاص استأجروا فيلا فيها 3 غرف مختلفة الجودة (غرفة رئيسية بحمام خاص، غرفة عادية، غرفة بأسرّة بطابقين)، والتقسيم المتساوي يعني أن من ينام في الغرفة الرئيسية يدفع نفس مبلغ من ينام في الغرفة الأبسط رغم الفرق الواضح في الراحة والخصوصية. هذا يخلق شعوراً بعدم العدالة، خصوصاً إذا تكررت هذه الرحلات مع نفس المجموعة.

## كيف تحسب التقسيم الموزون بدقة؟

### الخطوة 1: حدد وزناً نسبياً لكل غرفة
أعط كل غرفة رقماً يعكس جودتها النسبية (1.0 = المستوى القياسي، أعلى = أفضل، أقل = أبسط). حدد هذه الأوزان بالاتفاق الجماعي قبل الحجز.

### الخطوة 2: اجمع "وزن كل شخص" بناءً على غرفته
كل نزيل في غرفة معينة يأخذ نفس وزن الغرفة، بغض النظر عن عدد من يشاركونه الغرفة.

### الخطوة 3: اقسم التكلفة الإجمالية على مجموع الأوزان
هذا يعطيك "قيمة الوحدة الواحدة من الوزن"، ثم تضربها في وزن كل شخص للحصول على نصيبه.

### مثال عملي
فيلا بتكلفة إجمالية 2400 ريال لثلاث ليالٍ، بها 6 نزلاء موزعين على 3 غرف:
- الغرفة الرئيسية (حمام خاص، 2 أشخاص): وزن 1.3 لكل شخص
- الغرفة العادية (2 أشخاص): وزن 1.0 لكل شخص
- غرفة الأسرّة بطابقين (2 أشخاص): وزن 0.7 لكل شخص

**مجموع الأوزان** = (2 × 1.3) + (2 × 1.0) + (2 × 0.7) = 2.6 + 2 + 1.4 = 6

**قيمة وحدة الوزن** = 2400 ÷ 6 = 400 ريال

- نصيب كل شخص في الغرفة الرئيسية = 400 × 1.3 = 520 ريال
- نصيب كل شخص في الغرفة العادية = 400 × 1.0 = 400 ريال
- نصيب كل شخص في غرفة الأسرّة = 400 × 0.7 = 280 ريال

**التحقق**: (520 × 2) + (400 × 2) + (280 × 2) = 1040 + 800 + 560 = 2400 ريال، مطابق تماماً للتكلفة الإجمالية.

قارن هذا بالتقسيم المتساوي (400 ريال لكل شخص بغض النظر عن الغرفة)، الذي كان سيجعل نزلاء الغرفة الرئيسية يدفعون أقل من قيمتها الفعلية على حساب نزلاء الغرفة الأبسط.

## كيف تحدد الأوزان بشكل عادل؟

- **اسألوا: كم كانت لتكلف هذه الغرفة لو حُجزت منفردة؟** استخدموا فرق الأسعار كدليل تقريبي للوزن
- **راعوا الخصوصية**: حمام خاص أو شرفة يستحق وزناً أعلى من الميزات المشتركة
- **لا تبالغوا في الدقة**: أوزان بسيطة مثل 0.7 / 1.0 / 1.3 كافية، لا داعي لحسابات معقدة

## ماذا عن المصاريف المشتركة غير المرتبطة بالغرف؟

الطعام، النقل، والأنشطة الجماعية تُقسّم بالتساوي على الجميع بغض النظر عن الغرفة، لأن الجميع يستفيد منها بالتساوي. فقط تكلفة الإقامة نفسها هي التي تخضع للتقسيم الموزون.

## خطوات عملية لتطبيق هذه الطريقة

### الخطوة 1: اتفقوا على الأوزان قبل الحجز
ناقشوا توزيع الغرف والأوزان المناسبة قبل تأكيد الحجز، لتجنب أي خلاف لاحق.

### الخطوة 2: سجّلوا نصيب كل شخص كمبلغ مخصص
استخدم تطبيق مثل Diviso لتسجيل مصروف الإقامة بمبالغ فردية مختلفة لكل نزيل بدل القسمة التلقائية المتساوية.

### الخطوة 3: افصلوا مصاريف الإقامة عن باقي مصاريف الرحلة
سجّلوا الطعام والأنشطة كمصاريف منفصلة تُقسّم بالتساوي، حتى لا تختلط بحساب الغرف.

### الخطوة 4: راجعوا الحساب النهائي قبل السفر
تأكدوا أن الجميع موافق على الأوزان والنصيب النهائي قبل تحويل الدفعة الأولى.

## أخطاء شائعة عند تقسيم تكلفة السكن الجماعي

- **التقسيم المتساوي البحت رغم اختلاف الغرف**: يظلم نزلاء الغرف الأبسط أو يفضّل نزلاء الغرف الأفضل بشكل غير عادل
- **عدم الاتفاق على الأوزان مسبقاً**: يخلق نقاشاً محرجاً بعد الوصول للسكن
- **خلط تكلفة الغرف بمصاريف الطعام والأنشطة**: يصعّب التسوية النهائية
- **تجاهل حجم الغرفة عند تساوي عدد النزلاء**: غرفة كبيرة لشخصين تستحق وزناً أعلى من غرفة صغيرة لنفس العدد

## كيف يساعدك Diviso في هذا الموقف؟

- ✅ تسجيل مصروف الإقامة بمبالغ مخصصة لكل شخص حسب غرفته
- ✅ فصل تكلفة الغرف عن باقي مصاريف الرحلة المشتركة
- ✅ حساب تلقائي دقيق يضمن مطابقة المجموع للتكلفة الإجمالية
- ✅ سجل واضح يوضح الوزن والنصيب المتفق عليه لكل شخص
- ✅ سهولة تعديل الأوزان إذا تغيّر توزيع الغرف قبل الرحلة

## أسئلة شائعة

### هل يجب أن يدفع الجميع نفس المبلغ في شقة Airbnb المشتركة؟
لا، إذا اختلفت جودة الغرف (حمام خاص، حجم، خصوصية)، فالأعدل تطبيق تقسيم موزون يجعل نزلاء الغرف الأفضل يدفعون نصيباً أعلى قليلاً من نزلاء الغرف الأبسط.

### كيف أحدد وزن كل غرفة في الحساب؟
استخدم فرق الأسعار التقريبي لو حُجزت كل غرفة منفردة كدليل، أو اتفقوا جماعياً على أرقام بسيطة (مثل 0.7 للغرفة الأبسط و1.3 للغرفة الأفضل) قبل الحجز.

### هل يشمل التقسيم الموزون مصاريف الطعام والأنشطة أيضاً؟
لا، التقسيم الموزون يُطبّق فقط على تكلفة الإقامة نفسها. المصاريف المشتركة الأخرى كالطعام والنقل تُقسّم بالتساوي على الجميع لأن الكل يستفيد منها بنفس القدر.

## الخلاصة

تقسيم تكلفة السكن الجماعي بعدل يحتاج مراعاة اختلاف جودة الغرف، لا فقط عدد النزلاء. استخدموا نظام الأوزان البسيط، اتفقوا عليه مسبقاً، ودعوا التطبيق يحسب النصيب الدقيق لكل شخص.

**جرب Diviso الآن وقسّم تكلفة سكن رحلتكم القادمة بعدل تام.**
    `,
    contentEn: `
## Quick Answer

When a rented Airbnb or vacation home has rooms of different quality (a master suite with a private bathroom versus a bunk room for kids), a plain equal split isn't fair. The better approach is a **weighted split**: assign each room a relative weight based on its quality, then divide the total cost by the sum of those weights, so guests in the nicer room pay a slightly higher share than guests in the simpler rooms.

## Why an Equal Split Doesn't Work Here

If 6 people rent a villa with 3 rooms of different quality (a master suite with a private bathroom, a standard room, and a bunk room), an equal split means whoever sleeps in the master suite pays the same amount as whoever sleeps in the simpler room, despite the obvious difference in comfort and privacy. This creates a sense of unfairness, especially if the same group takes trips like this repeatedly.

## How to Calculate a Weighted Split Precisely

### Step 1: Assign a Relative Weight to Each Room
Give each room a number reflecting its relative quality (1.0 = standard level, higher = better, lower = simpler). Agree on these weights as a group before booking.

### Step 2: Determine Each Person's Weight Based on Their Room
Every guest in a given room takes that room's weight, regardless of how many people share the room.

### Step 3: Divide the Total Cost by the Sum of All Weights
This gives you the "value per weight unit," which you then multiply by each person's weight to get their share.

### A Worked Example
A villa with a total cost of 2,400 SAR for three nights, with 6 guests split across 3 rooms:
- Master suite (private bathroom, 2 people): weight 1.3 per person
- Standard room (2 people): weight 1.0 per person
- Bunk room (2 people): weight 0.7 per person

**Sum of weights** = (2 × 1.3) + (2 × 1.0) + (2 × 0.7) = 2.6 + 2 + 1.4 = 6

**Value per weight unit** = 2,400 ÷ 6 = 400 SAR

- Each master suite guest's share = 400 × 1.3 = 520 SAR
- Each standard room guest's share = 400 × 1.0 = 400 SAR
- Each bunk room guest's share = 400 × 0.7 = 280 SAR

**Check**: (520 × 2) + (400 × 2) + (280 × 2) = 1,040 + 800 + 560 = 2,400 SAR, matching the total cost exactly.

Compare this to an equal split (400 SAR per person regardless of room), which would have let the master suite guests underpay for its actual value at the expense of the guests in the simpler room.

## How to Set the Weights Fairly

- **Ask: what would this room have cost booked separately?** Use the price difference as a rough guide for the weight
- **Factor in privacy**: a private bathroom or balcony deserves a higher weight than shared amenities
- **Don't overthink the precision**: simple weights like 0.7 / 1.0 / 1.3 are enough — no need for complex math

## What About Shared Costs Unrelated to Rooms?

Food, transportation, and group activities should be split equally among everyone regardless of room, since everyone benefits from them equally. Only the accommodation cost itself gets the weighted split treatment.

## A Practical System for Applying This Method

### Step 1: Agree on the Weights Before Booking
Discuss the room assignments and appropriate weights before confirming the booking, to avoid any dispute later.

### Step 2: Log Each Person's Share as a Custom Amount
Use an app like Diviso to log the accommodation expense with different individual amounts per guest instead of an automatic equal split.

### Step 3: Separate Accommodation Costs From the Rest of the Trip's Expenses
Log food and activities as separate expenses split equally, so they don't get mixed up with the room calculation.

### Step 4: Review the Final Numbers Before Traveling
Make sure everyone agrees on the weights and final shares before the first payment is transferred.

## Common Mistakes When Splitting Shared Accommodation Costs

- **A plain equal split despite different rooms**: unfairly penalizes guests in simpler rooms or unfairly favors guests in nicer ones
- **Not agreeing on weights in advance**: creates an awkward conversation after arriving at the property
- **Mixing room costs with food and activity expenses**: makes the final settlement harder to untangle
- **Ignoring room size when occupancy is equal**: a large room for two deserves a higher weight than a small room for the same number of people

## How Diviso Helps in This Situation

- ✅ Logs the accommodation expense with custom amounts per person based on their room
- ✅ Keeps room costs separate from the rest of the trip's shared expenses
- ✅ Automatic, accurate calculation that ensures the total matches the actual cost
- ✅ A clear record of the agreed weight and share for each person
- ✅ Easy to adjust weights if the room assignment changes before the trip

## Frequently Asked Questions

### Should everyone pay the same amount in a shared Airbnb?
Not necessarily. If the rooms differ in quality (private bathroom, size, privacy), the fairer approach is a weighted split that has guests in the nicer rooms pay a slightly higher share than those in simpler rooms.

### How do I determine the weight for each room?
Use the approximate price difference if each room were booked separately as a guide, or agree as a group on simple numbers (like 0.7 for the simplest room and 1.3 for the best one) before booking.

### Does the weighted split also apply to food and activity costs?
No, the weighted split applies only to the accommodation cost itself. Other shared expenses like food and transportation should be split equally among everyone, since everyone benefits from them the same amount.

## Conclusion

Splitting shared accommodation costs fairly means accounting for the difference in room quality, not just the number of guests. Use a simple weighting system, agree on it in advance, and let the app calculate each person's exact share.

**Try Diviso now and split your next trip's accommodation costs with complete fairness.**
    `
  },
  {
    slug: "split-bachelor-bachelorette-party-costs",
    title: "كيف تقسم مصاريف رحلة توديع العزوبية بين المدعوين؟",
    titleEn: "How to Split Bachelor or Bachelorette Party Costs (Including the Guest of Honor's Share)",
    description: "دليل عملي لتقسيم مصاريف رحلة أو حفلة توديع العزوبية بين المدعوين بعدل، مع توضيح هل يدفع صاحب المناسبة نصيبه أم لا وكيف تُدار الدفعات المقدمة.",
    descriptionEn: "A practical guide to splitting bachelor or bachelorette party costs fairly among attendees, including whether the guest of honor pays their share and how to manage upfront deposits.",
    keywords: ["تقسيم مصاريف توديع العزوبية", "رحلة توديع العزوبية", "هل تدفع العروس نصيبها", "مصاريف حفلة العزابة", "تنظيم رحلة وداع العزوبية", "تقسيم فلوس رحلة الصديقات"],
    keywordsEn: ["how to split bachelorette party costs", "does the bride pay for her own bachelorette", "bachelor party expense splitting", "bachelorette trip cost calculator", "who pays for the bachelor party", "splitting costs for a bridal party trip"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-09-03",
    content: `
## الإجابة المختصرة

العرف السائد في رحلات توديع العزوبية هو أن **صاحب المناسبة (العروس أو العريس) لا يدفع نصيبه من تكلفة الإقامة والأنشطة**، بل يتقاسم باقي المدعوين التكلفة الكاملة فيما بينهم. أي أن نصيب الفرد = التكلفة الإجمالية ÷ (عدد الحاضرين ناقص واحد). المنظم عادة يجمع دفعة مقدمة من الجميع قبل الحجز لتغطية العربون، ويُسوّى الحساب النهائي بعد الرحلة.

## ليش تقسيم مصاريف توديع العزوبية مختلف عن أي رحلة عادية؟

هذا النوع من المناسبات له ديناميكية خاصة لا تنطبق على رحلات الأصدقاء العادية:

- **صاحب المناسبة لا يدفع (عادة)**: التقليد المتعارف عليه أن يتحمل باقي المدعوين تكلفته كهدية غير مباشرة
- **منظم واحد يتحمل العبء الإداري**: عادة صديقة مقربة أو أخت تتولى الحجوزات والدفع المقدم
- **مصاريف إضافية خاصة**: ملابس متطابقة، ديكورات، هدايا ترحيبية، كيك — تُضاف فوق تكلفة الإقامة والأنشطة
- **حساسية الميزانية**: بعض المدعوات قد تكون ميزانيتهن محدودة، فيحتاج المنظم مراعاة ذلك عند اختيار مستوى الفعاليات

## كيف تحسب نصيب كل مدعو بدقة؟

### القاعدة الأساسية
**نصيب الفرد = التكلفة الإجمالية للرحلة ÷ (عدد الحاضرين − 1)**

الناقص واحد هنا يمثل صاحب المناسبة الذي لا يُحسب ضمن من يدفع.

### مثال عملي
رحلة توديع عزوبية لعروس مع 6 صديقات (7 حاضرات بالمجموع، منهن العروس)، والتكلفة الإجمالية للإقامة والأنشطة 3500 ريال:

- عدد من يدفع فعلياً = 7 − 1 = 6 أشخاص
- نصيب كل واحدة = 3500 ÷ 6 ≈ 583 ريال

لو قُسّمت التكلفة على الجميع بمن فيهن العروس (تقسيم خاطئ شائع)، كان نصيب كل واحدة سينخفض إلى 500 ريال، لكن هذا يخالف عرف المناسبة الذي يقوم على "الإهداء الجماعي" لصاحبة المناسبة.

### ماذا عن المصاريف الإضافية (ملابس، ديكور، هدايا)؟
تُضاف هذه المصاريف إلى التكلفة الإجمالية قبل القسمة، ما لم يتفق المدعوون على استثنائها (مثلاً: كل واحدة تشتري ملابسها الخاصة على حسابها الشخصي بدل تحميلها للمجموعة).

## كيف تُدار الدفعات المقدمة (العربون)؟

- **حدد مبلغاً ثابتاً مقدماً**: يطلب المنظم من الجميع تحويل مبلغ محدد قبل الحجز (مثلاً 200 ريال) لتأمين العربون
- **وثّق من دفع العربون**: حتى لا يضطر المنظم لتغطية نصيب أحد لم يحوّل بعد
- **اربط العربون بالتسوية النهائية**: يُخصم من نصيب كل شخص عند التسوية بعد الرحلة، لا يُضاف كمبلغ منفصل

## متى يُستثنى صاحب المناسبة من "عدم الدفع"؟

- **ميزانية المجموعة محدودة**: أحياناً يتفق الجميع على تقسيم متساوٍ يشمل صاحب المناسبة إذا كانت الميزانية ضيقة
- **صاحب المناسبة يصرّ على المشاركة**: بعض العرسان يفضلون دفع نصيبهم تجنباً للشعور بالمديونية للمجموعة
- **الأنشطة الفردية الإضافية**: لو أضاف صاحب المناسبة نشاطاً شخصياً خارج البرنامج المتفق عليه، يدفعه بنفسه

## خطوات عملية لتنظيم رحلة توديع العزوبية

### الخطوة 1: حدد الميزانية والحاضرين مبكراً
اجمع قائمة نهائية بالمدعوين قبل الحجز، لأن أي إضافة أو انسحاب لاحق يغيّر نصيب الجميع.

### الخطوة 2: أنشئ مجموعة تحصيل واحدة
استخدم تطبيق مثل Diviso لإنشاء مجموعة خاصة بالرحلة، مستثنياً صاحب المناسبة من قائمة من يدفع.

### الخطوة 3: اجمع الدفعة المقدمة قبل الحجز بمهلة كافية
حدد موعداً نهائياً واضحاً للتحويل حتى لا يتأخر الحجز بسبب انتظار أحد المدعوين.

### الخطوة 4: سجّلوا كل مصروف إضافي أثناء الرحلة
الطعام، المواصلات، الأنشطة العفوية — كلها تُضاف للحساب الجماعي وتُسوّى في النهاية.

### الخطوة 5: سوّوا الحساب النهائي بعد الرحلة
راجعوا الفرق بين ما دُفع مقدماً والتكلفة الفعلية، ووزّعوا الفائض أو العجز على الجميع.

## أخطاء شائعة تفسد تنظيم الرحلة

- **عدم الاتفاق مسبقاً على قاعدة "من يدفع"**: يخلق حرجاً عند وصول الفاتورة
- **تحميل المنظم كل العبء المالي منفرداً**: يجب توزيع الدفعات المقدمة على الجميع من البداية
- **نسيان تحديث القائمة عند الانسحاب**: يغيّر نصيب الباقين ويحتاج إعادة حساب فورية
- **خلط مصاريف الملابس الشخصية بمصاريف المجموعة**: يفضّل الفصل الواضح بينهما

## كيف يساعدك Diviso في تنظيم رحلة توديع العزوبية؟

- ✅ استثناء صاحب المناسبة تلقائياً من قسمة التكلفة
- ✅ تتبع الدفعة المقدمة (العربون) بشكل منفصل عن التسوية النهائية
- ✅ تسجيل كل مصروف إضافي فوراً أثناء الرحلة
- ✅ تعديل نصيب الجميع تلقائياً عند تغيّر عدد الحاضرين
- ✅ سجل واضح يوضح من دفع ومن عليه نصيبه بعد الرحلة

## أسئلة شائعة

### هل تدفع العروس نصيبها في رحلة توديع العزوبية؟
عادة لا، فالعرف السائد أن باقي المدعوات يتقاسمن تكلفة إقامتها وأنشطتها كهدية جماعية، إلا إذا اتفقت المجموعة على خلاف ذلك بسبب ضيق الميزانية.

### كيف أحسب نصيب كل شخص إذا كانت العروس لا تدفع؟
اقسم التكلفة الإجمالية للرحلة على عدد الحاضرين ناقص واحد (باستثناء صاحبة المناسبة)، للحصول على نصيب كل مدعوة تدفع فعلياً.

### ماذا لو انسحب أحد المدعوين بعد دفع العربون؟
اتفقوا مسبقاً على سياسة الاسترجاع، وأعيدوا حساب نصيب الباقين بناءً على العدد الجديد، مع مراعاة أن بعض تكاليف الحجز (كالعربون) قد لا تكون قابلة للاسترداد من الجهة المستضيفة.

## الخلاصة

رحلة توديع العزوبية مناسبة سعيدة، ولا يجب أن تتحول لصداع مالي. اتفقوا على قاعدة "من يدفع" من البداية، وزّعوا الدفعة المقدمة بعدل، ودعوا التطبيق يتابع الحسابات بدل التخمين اليدوي.

**جرب Diviso الآن ونظّم مصاريف رحلة توديع العزوبية بعدل تام.**
    `,
    contentEn: `
## Quick Answer

The common convention for bachelor and bachelorette parties is that **the guest of honor (the bride or groom-to-be) does not pay their own share** of accommodation and activities — the rest of the group splits the full cost among themselves. That means each attendee's share = total cost ÷ (number of attendees minus one). The organizer usually collects an upfront deposit from everyone before booking, and the final bill is settled after the trip.

## Why Splitting Bachelor/Bachelorette Costs Is Different From a Regular Trip

This type of event has a dynamic that doesn't apply to a regular friend trip:

- **The guest of honor typically doesn't pay**: it's a customary group gift covered by everyone else
- **One organizer carries the administrative load**: usually a close friend or sibling handles bookings and fronts the deposit
- **Special extra costs**: matching outfits, decorations, welcome bags, a cake — all added on top of accommodation and activities
- **Budget sensitivity**: some attendees may have a tighter budget, so the organizer needs to factor that in when choosing the activity level

## How to Calculate Each Attendee's Exact Share

### The Basic Formula
**Each person's share = total trip cost ÷ (number of attendees − 1)**

The "minus one" represents the guest of honor, who isn't counted among those paying.

### A Worked Example
A bachelorette trip for a bride with 6 friends (7 people total, including the bride), with a total accommodation and activities cost of 3,500 SAR:

- Number of people actually paying = 7 − 1 = 6
- Each person's share = 3,500 ÷ 6 ≈ 583 SAR

If the cost were split among everyone including the bride (a common mistake), each person's share would drop to 500 SAR — but that contradicts the tradition of the group collectively gifting the trip to the guest of honor.

### What About Extra Costs (Outfits, Decor, Gifts)?
These get added to the total cost before dividing, unless the group agrees to exclude them (for example: everyone buys their own outfit personally instead of billing it to the group).

## How to Manage the Upfront Deposit

- **Set a fixed upfront amount**: the organizer asks everyone to transfer a set amount (e.g., 200 SAR) before booking to secure the deposit
- **Track who paid the deposit**: so the organizer doesn't have to cover someone's share who hasn't transferred yet
- **Tie the deposit to the final settlement**: it gets deducted from each person's total share at settlement, not added as a separate amount

## When Is the Guest of Honor Exempted From "Doesn't Pay"?

- **The group's budget is tight**: sometimes everyone agrees on an equal split that includes the guest of honor if the budget is limited
- **The guest of honor insists on paying**: some brides or grooms prefer to pay their share to avoid feeling indebted to the group
- **Extra personal activities**: if the guest of honor adds a personal activity outside the agreed program, they cover that themselves

## A Practical System for Organizing the Trip

### Step 1: Set the Budget and Finalize Attendees Early
Get a final guest list before booking, since any later addition or dropout changes everyone's share.

### Step 2: Create One Collection Group
Use an app like Diviso to create a group dedicated to the trip, excluding the guest of honor from the list of people who pay.

### Step 3: Collect the Deposit With Enough Lead Time
Set a clear deadline for transfers so the booking isn't delayed waiting on one attendee.

### Step 4: Log Every Extra Expense During the Trip
Food, transportation, spontaneous activities — all get added to the shared bill and settled at the end.

### Step 5: Settle the Final Bill After the Trip
Review the difference between what was collected upfront and the actual cost, and distribute any surplus or shortfall among everyone.

## Common Mistakes That Ruin the Organization

- **Not agreeing on the "who pays" rule upfront**: creates awkwardness once the bill arrives
- **Putting the entire financial burden on the organizer alone**: deposits should be spread across everyone from the start
- **Forgetting to update the list when someone drops out**: changes the remaining attendees' shares and needs an immediate recalculation
- **Mixing personal outfit costs with group expenses**: it's better to keep them clearly separate

## How Diviso Helps Organize a Bachelor or Bachelorette Trip

- ✅ Automatically excludes the guest of honor from the cost split
- ✅ Tracks the upfront deposit separately from the final settlement
- ✅ Logs every extra expense instantly during the trip
- ✅ Automatically adjusts everyone's share when the number of attendees changes
- ✅ A clear record of who has paid and who still owes after the trip

## Frequently Asked Questions

### Does the bride pay her own share on a bachelorette trip?
Usually not — the common convention is that the rest of the attendees split her accommodation and activity costs as a collective gift, unless the group agrees otherwise due to a tight budget.

### How do I calculate each person's share if the bride doesn't pay?
Divide the total trip cost by the number of attendees minus one (excluding the guest of honor) to get the share for each attendee who actually pays.

### What if someone drops out after paying the deposit?
Agree in advance on a refund policy, and recalculate the remaining attendees' shares based on the new headcount, keeping in mind that some booking costs (like the deposit) may not be refundable from the venue or host.

## Conclusion

A bachelor or bachelorette trip is a happy occasion, and it shouldn't turn into a financial headache. Agree on the "who pays" rule upfront, distribute the deposit fairly, and let the app track the numbers instead of guessing manually.

**Try Diviso now and organize your bachelor or bachelorette party costs with complete fairness.**
    `
  },
  {
    slug: "prorated-rent-roommate-moves-out-mid-month",
    title: "كيف تقسم الإيجار بعدل إذا انتقل أحد الشركاء في منتصف الشهر؟",
    titleEn: "How to Split Rent Fairly When a Roommate Moves Out Mid-Month",
    description: "طريقة حساب نصيب الإيجار بالتناسب عند مغادرة أحد شركاء السكن في منتصف الشهر، مع مثال حساب دقيق لتوزيع الفرق على باقي الشركاء.",
    descriptionEn: "How to calculate a prorated rent share when a roommate moves out mid-month, with a worked example showing exactly how to redistribute the difference among the remaining roommates.",
    keywords: ["تقسيم الإيجار عند الانتقال", "حساب الإيجار بالتناسب", "انتقال شريك السكن منتصف الشهر", "كيف احسب نصيب الإيجار", "تقسيم فاتورة الإيجار بين الشركاء", "خروج شريك سكن قبل نهاية العقد"],
    keywordsEn: ["prorated rent calculator roommates", "how to split rent when someone moves out mid-month", "roommate leaving early rent share", "prorate rent formula", "fair rent split when roommate leaves", "calculate partial month rent"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-09-02",
    content: `
## الإجابة المختصرة

عند مغادرة أحد شركاء السكن في منتصف الشهر، يُحسب نصيبه بالتناسب مع عدد الأيام الفعلية التي سكنها فقط، وليس شهراً كاملاً. القاعدة: **نصيب اليوم الواحد = (الإيجار الشهري ÷ عدد أشخاص المسكن) ÷ عدد أيام الشهر**، ثم يُضرب في عدد الأيام التي بقي فيها فعلياً. الفرق المتبقي من نصيبه يُوزَّع على الشركاء الباقين لبقية الشهر.

## ليش تحتاج حساب الإيجار بالتناسب أصلاً؟

عقد الإيجار عادة شهري بمبلغ ثابت، لكن سكن الأشخاص بداخله ليس دائماً متزامناً مع بداية ونهاية الشهر:

- **مغادرة مفاجئة**: شريك ينتقل لعمل جديد في مدينة أخرى في منتصف الشهر
- **انضمام لاحق**: شريك جديد ينضم للسكن بعد بداية الشهر بأيام
- **فترة إشعار قصيرة**: العقد يتطلب إشعاراً بشهر، لكن الشريك يترك المفروشات ويغادر فعلياً قبل ذلك
- **غموض من يتحمل الفرق**: هل يدفع المغادر الشهر كاملاً أم فقط الأيام التي سكنها؟

## كيف تحسب النصيب بالتناسب بدقة؟

### القاعدة
1. احسب نصيب الشخص الشهري العادي (الإيجار الإجمالي ÷ عدد السكان)
2. اقسم هذا النصيب على عدد أيام الشهر للحصول على "تكلفة اليوم الواحد"
3. اضرب تكلفة اليوم الواحد في عدد الأيام التي سكنها الشخص فعلياً هذا الشهر

### مثال عملي
سكن مشترك بإيجار شهري 3000 ريال بين 3 شركاء (أحمد، سالم، فهد)، ونصيب كل واحد عادة 1000 ريال. غادر فهد في اليوم 15 من شهر مكوّن من 30 يوماً.

- تكلفة اليوم الواحد لنصيب فهد = 1000 ÷ 30 ≈ 33.3 ريال
- نصيب فهد الفعلي هذا الشهر = 33.3 × 15 ≈ 500 ريال

**الفرق المتبقي** = 1000 − 500 = 500 ريال، يجب توزيعه على أحمد وسالم لتغطية بقية الشهر (15 يوماً بدون فهد):
- 500 ÷ 2 = 250 ريال إضافية لكل واحد منهما

**النتيجة النهائية لهذا الشهر**: فهد يدفع 500 ريال، وأحمد وسالم يدفعان 1250 ريال لكل واحد (1000 + 250). المجموع = 500 + 1250 + 1250 = 3000 ريال، مطابق تماماً للإيجار الإجمالي.

## ماذا لو انضم شريك جديد بدل المغادر في نفس الشهر؟

نفس المنطق يُطبّق بالعكس: الشريك الجديد يدفع فقط عن الأيام التي سكن فيها فعلياً بنفس طريقة الحساب، ويُخصم نصيبه من العبء الإضافي الذي كان يتحمله الباقون.

### مثال
لو انضم شريك بديل بدءاً من اليوم 16 حتى نهاية الشهر (15 يوماً)، فنصيبه = 33.3 × 15 ≈ 500 ريال، وتنخفض المساهمة الإضافية لأحمد وسالم من 250 ريال لكل واحد إلى 125 ريال فقط لكل واحد (لأن الفراغ صار 15 يوماً بس بدل 15 يوماً كاملة بدون أي بديل).

## ماذا عن فواتير الكهرباء والماء والإنترنت؟

لا تُقسّم هذه الفواتير بنفس منطق الإيجار دائماً، لأنها تعتمد على الاستهلاك الفعلي لا على عدد الأيام فقط:

- **الإنترنت والاشتراكات الثابتة**: تُقسّم بالتناسب مثل الإيجار تماماً
- **الكهرباء والماء**: إذا أمكن قراءة العداد عند المغادرة، احسب الاستهلاك الفعلي بدل التقسيم بالأيام فقط

## ماذا عن التأمين (الوديعة) عند المغادرة؟

التأمين المدفوع مقدماً يُرد للمغادر بعد التأكد من عدم وجود أضرار، وليس له علاقة بحساب الإيجار الشهري. سجّلوه كبند منفصل حتى لا يختلط بحساب النصيب الشهري.

## خطوات عملية لتجنب الخلاف

### الخطوة 1: أعلنوا موعد المغادرة أو الانضمام بوضوح
حددوا التاريخ بالضبط (وليس "منتصف الشهر تقريباً") لتجنب الخلاف على عدد الأيام.

### الخطوة 2: سجّلوا الحساب فوراً
استخدم تطبيق مثل Diviso لتسجيل النصيب المعدّل لكل شخص بمبلغ مخصص بدل الاعتماد على الحساب الذهني.

### الخطوة 3: وثّقوا الاتفاق كتابياً
رسالة واتساب بسيطة تحدد "فهد يدفع 500 ريال عن أيام 1-15" تكفي لتوثيق الاتفاق ومنع الجدال لاحقاً.

### الخطوة 4: راجعوا فاتورة الإيجار التالية معاً
تأكدوا إن التقسيم الجديد (بدون المغادر أو مع البديل) واضح للجميع قبل بداية الشهر التالي.

## أخطاء شائعة عند حساب الإيجار بالتناسب

- **تقسيم الشهر إلى نصفين تلقائياً**: قد لا يكون يوم المغادرة بالضبط في منتصف الشهر
- **نسيان تعديل نصيب الباقين**: المغادر يدفع أقل، لكن أحداً يجب أن يغطي الفرق
- **الخلط بين التأمين والإيجار الشهري**: يجب معالجتهما كبندين منفصلين تماماً
- **عدم توثيق الاتفاق**: يصعب إثبات الاتفاق لاحقاً عند وجود خلاف

## كيف يساعدك Diviso في هذا الموقف؟

- ✅ تسجيل مصروف الإيجار بمبالغ مخصصة لكل شريك حسب عدد أيامه الفعلية
- ✅ تعديل تلقائي لنصيب الباقين عند إضافة أو حذف عضو من المجموعة
- ✅ سجل واضح لتاريخ الانضمام والمغادرة لكل شخص
- ✅ فصل بند التأمين عن حساب الإيجار الشهري
- ✅ تقارير شهرية توضح كيف تغيّر التقسيم من شهر لآخر

## أسئلة شائعة

### كيف أحسب نصيب شريك غادر السكن في منتصف الشهر؟
اقسم نصيبه الشهري العادي على عدد أيام الشهر للحصول على تكلفة اليوم الواحد، ثم اضربها في عدد الأيام التي سكنها فعلياً قبل المغادرة.

### من يدفع الفرق المتبقي من نصيب المغادر؟
الشركاء الباقون يقسمون الفرق فيما بينهم بالتساوي (أو حسب نفس نسبة تقسيمهم الأصلية) لتغطية بقية أيام الشهر بعد مغادرة الشريك.

### هل يُحسب التأمين ضمن حساب الإيجار بالتناسب؟
لا، التأمين بند منفصل تماماً يُرد للمغادر بعد التأكد من سلامة الوحدة السكنية، ولا علاقة له بحساب نصيب الإيجار الشهري بالأيام.

## الخلاصة

انتقال أحد شركاء السكن في منتصف الشهر لا يجب أن يخلق خلافاً مالياً. احسبوا النصيب بالتناسب مع عدد الأيام الفعلية، وثّقوا الاتفاق كتابياً، ودعوا التطبيق يعدّل الحسابات تلقائياً بدل الحساب اليدوي.

**جرب Diviso الآن واحسب نصيب الإيجار بالتناسب بدقة تامة.**
    `,
    contentEn: `
## Quick Answer

When a roommate moves out mid-month, their rent share should be calculated proportionally to the actual number of days they lived there, not a full month. The formula: **daily rate = (monthly rent ÷ number of roommates) ÷ number of days in the month**, then multiply that by the number of days they actually stayed. The remaining difference from their share gets redistributed among the remaining roommates for the rest of the month.

## Why You Need Prorated Rent Calculations at All

A lease is usually a fixed monthly amount, but people's actual residency inside it doesn't always line up with the start and end of the month:

- **A sudden departure**: a roommate takes a new job in another city mid-month
- **A later move-in**: a new roommate joins the household a few days after the month started
- **A short notice period**: the lease requires a month's notice, but the roommate moves their furniture out and actually leaves before then
- **Ambiguity over who covers the gap**: does the departing roommate pay for the full month, or only the days they lived there?

## How to Calculate a Prorated Share Precisely

### The Formula
1. Calculate the person's normal monthly share (total rent ÷ number of residents)
2. Divide that share by the number of days in the month to get the "daily rate"
3. Multiply the daily rate by the number of days the person actually lived there that month

### A Worked Example
A shared apartment with 3,000 SAR monthly rent split among 3 roommates (Ahmed, Salem, Fahad), each normally paying 1,000 SAR. Fahad moves out on day 15 of a 30-day month.

- Daily rate for Fahad's share = 1,000 ÷ 30 ≈ 33.3 SAR
- Fahad's actual share this month = 33.3 × 15 ≈ 500 SAR

**The remaining difference** = 1,000 − 500 = 500 SAR, which needs to be split between Ahmed and Salem to cover the rest of the month (15 days without Fahad):
- 500 ÷ 2 = an extra 250 SAR each

**The final result for this month**: Fahad pays 500 SAR, and Ahmed and Salem each pay 1,250 SAR (1,000 + 250). Total = 500 + 1,250 + 1,250 = 3,000 SAR, matching the total rent exactly.

## What If a New Roommate Replaces the One Who Left the Same Month?

The same logic applies in reverse: the new roommate pays only for the days they actually lived there, using the same calculation, and their share offsets some of the extra burden the remaining roommates would otherwise carry.

### Example
If a replacement roommate joins starting day 16 through the end of the month (15 days), their share = 33.3 × 15 ≈ 500 SAR, and Ahmed and Salem's extra contribution drops from 250 SAR each to just 125 SAR each (since the gap is now covered for those 15 days instead of being entirely uncovered).

## What About Electricity, Water, and Internet Bills?

These bills don't always follow the same day-based logic as rent, since they depend on actual usage, not just days present:

- **Internet and fixed subscriptions**: prorate them exactly like rent
- **Electricity and water**: if a meter reading is possible at move-out, calculate actual usage instead of a pure day-based split

## What About the Security Deposit at Move-Out?

The deposit paid upfront is refunded to the departing roommate after confirming no damage, and it's unrelated to the monthly rent calculation. Log it as a completely separate line item so it doesn't get mixed up with the monthly share calculation.

## A Practical System to Avoid Disputes

### Step 1: Announce the Move-Out or Move-In Date Clearly
Pin down the exact date (not "roughly mid-month") to avoid disagreement over the number of days.

### Step 2: Log the Calculation Immediately
Use an app like Diviso to log each person's adjusted share as a custom amount instead of relying on mental math.

### Step 3: Document the Agreement in Writing
A simple message stating "Fahad pays 500 SAR for days 1-15" is enough to document the agreement and prevent later disputes.

### Step 4: Review the Next Rent Bill Together
Confirm the new split (without the departed roommate, or with the replacement) is clear to everyone before the next month starts.

## Common Mistakes When Calculating Prorated Rent

- **Automatically splitting the month into two halves**: the move-out date may not actually fall exactly mid-month
- **Forgetting to adjust the remaining roommates' shares**: the departing person pays less, but someone has to cover the difference
- **Mixing up the deposit with the monthly rent**: they need to be handled as two completely separate line items
- **Not documenting the agreement**: makes it hard to prove later if a dispute arises

## How Diviso Helps in This Situation

- ✅ Logs the rent expense with custom amounts per roommate based on their actual number of days
- ✅ Automatically adjusts the remaining roommates' shares when a member is added or removed from the group
- ✅ A clear record of each person's move-in and move-out date
- ✅ Keeps the deposit as a separate line item from the monthly rent calculation
- ✅ Monthly reports showing how the split changed from one month to the next

## Frequently Asked Questions

### How do I calculate the share for a roommate who moved out mid-month?
Divide their normal monthly share by the number of days in the month to get a daily rate, then multiply that by the number of days they actually lived there before moving out.

### Who pays the remaining difference from the departing roommate's share?
The remaining roommates split the difference among themselves (equally, or in the same ratio as their original split) to cover the rest of the month after the roommate leaves.

### Is the security deposit included in the prorated rent calculation?
No, the deposit is a completely separate line item refunded to the departing roommate after confirming the unit's condition, and it has nothing to do with the day-based monthly rent calculation.

## Conclusion

A roommate moving out mid-month shouldn't create a financial dispute. Calculate the share proportionally to the actual number of days, document the agreement in writing, and let the app adjust the numbers automatically instead of doing the math by hand.

**Try Diviso now and calculate prorated rent shares with complete accuracy.**
    `
  },
  {
    slug: "split-uber-careem-fare-multiple-stops",
    title: "كيف تقسم تكلفة الأوبر أو كريم بعدل لما يكون فيه أكثر من نقطة نزول؟",
    titleEn: "How to Split an Uber or Careem Fare Fairly When Everyone's Dropped Off at Different Stops",
    description: "الطريقة العادلة لتقسيم تكلفة رحلة الأوبر أو كريم بين الأصدقاء عند تعدد نقاط النزول، مع مثال حساب حسب المسافة الفعلية بدل التقسيم المتساوي.",
    descriptionEn: "The fair way to split an Uber or Careem fare among friends when everyone gets dropped off at a different stop, with a worked example splitting cost by actual distance instead of splitting equally.",
    keywords: ["تقسيم تكلفة الأوبر", "تقسيم فلوس كريم", "تقسيم أجرة التاكسي بين الأصدقاء", "كيف اقسم الأوبر", "تقسيم أجرة الرحلة المشتركة", "من يدفع أكثر في الأوبر"],
    keywordsEn: ["how to split uber fare with friends", "split careem cost multiple stops", "fair way to split taxi fare", "split ride cost calculator", "who pays more in a shared uber", "divide ride-hailing fare by distance"],
    category: "tips",
    readTime: 6,
    publishDate: "2026-09-01",
    content: `
## الإجابة المختصرة

تقسيم أجرة الأوبر أو كريم بالتساوي غير عادل إذا كان الركاب ينزلون في نقاط مختلفة، لأن من يركب المسافة الأطول يستفيد أكثر من الرحلة. الطريقة الأعدل هي تقسيم الأجرة حسب نسبة المسافة الفعلية التي قطعها كل راكب، لا حسب عدد الركاب فقط. من ينزل أولاً (مسافة أقصر) يدفع أقل، ومن يبقى للنهاية (مسافة أطول) يدفع أكثر.

## ليش التقسيم المتساوي غير عادل هنا؟

لو 3 أصدقاء ركبوا أوبر واحد، ونزل أحدهم بعد ربع الطريق بينما استمر الباقون للنهاية، فالتقسيم المتساوي يعني أن من نزل مبكراً دفع نفس مبلغ من ركب الرحلة كاملة رغم أنه استفاد من جزء بسيط منها فقط. هذا يخلق شعوراً بالظلم، خصوصاً في الرحلات المتكررة مع نفس المجموعة.

## كيف تحسب النصيب العادل حسب المسافة؟

### القاعدة
1. احسب المسافة الإجمالية للرحلة الكاملة
2. احسب المسافة الفعلية التي ركبها كل شخص (من نقطة الصعود حتى نقطة نزوله)
3. اجمع "مسافات الأشخاص" كلها معاً
4. تكلفة الكيلومتر الواحد = الأجرة الإجمالية ÷ مجموع مسافات الأشخاص
5. نصيب كل شخص = مسافته الفعلية × تكلفة الكيلومتر الواحد

### مثال عملي
رحلة أوبر بأجرة إجمالية 60 ريال، بمسافة كلية 20 كم، وفيها 3 ركاب:
- خالد نزل بعد 6 كم (أول نقطة نزول)
- سارة نزلت بعد 12 كم
- أحمد بقي للنهاية 20 كم كاملة

**مجموع مسافات الأشخاص** = 6 + 12 + 20 = 38 كم-شخص
**تكلفة الكيلومتر الواحد** = 60 ÷ 38 ≈ 1.58 ريال

- نصيب خالد = 6 × 1.58 ≈ 9.5 ريال
- نصيب سارة = 12 × 1.58 ≈ 18.9 ريال
- نصيب أحمد = 20 × 1.58 ≈ 31.6 ريال

قارن هذا بالتقسيم المتساوي (20 ريال لكل واحد) الذي كان سيجعل خالد يدفع أكثر من ضعف نصيبه العادل رغم نزوله المبكر.

## متى يكون التقسيم المتساوي مقبولاً؟

- **الجميع ينزل في نفس النقطة تقريباً**: الفرق في المسافة ضئيل ولا يستحق حساباً معقداً
- **رحلة قصيرة جداً**: الفرق بالريالات بسيط جداً بحيث لا يستحق النقاش
- **اتفاق مسبق بين المجموعة**: أحياناً يفضل الأصدقاء البساطة على الدقة المطلقة

## طريقة بديلة أبسط: التقسيم حسب ترتيب النزول

إذا كان حساب المسافة الدقيقة صعباً (ما فيه تفاصيل GPS واضحة)، استخدم تقريباً بسيطاً: من ينزل أولاً يدفع أقل نسبة من الأجرة، ومن يبقى للنهاية يدفع أكبر نسبة، بناءً على تقدير تقريبي للمسافة النسبية بدل الحساب الدقيق بالكيلومتر.

## خطوات عملية لتقسيم أجرة الرحلة المشتركة

### الخطوة 1: اتفقوا على طريقة التقسيم قبل الرحلة
حددوا مسبقاً: تقسيم متساوٍ أم حسب المسافة، خصوصاً إذا كانت نقاط النزول معروفة مسبقاً.

### الخطوة 2: احتفظوا بلقطة شاشة لتفاصيل الرحلة
تطبيقات الأوبر وكريم تعرض المسافة والأجرة الإجمالية في نهاية الرحلة — احتفظوا بها للرجوع إليها عند الحساب.

### الخطوة 3: سجّلوا المصروف فوراً
استخدم تطبيق مثل Diviso لتسجيل أجرة الرحلة وتقسيمها بمبالغ مخصصة لكل شخص بدلاً من القسمة المتساوية التلقائية.

### الخطوة 4: حوّلوا الفلوس بنفس الوقت
لا تتركوا الرحلات تتراكم كديون متفرقة — سوّوا الحساب بعد كل رحلة أو في نهاية الليلة.

## أخطاء شائعة عند تقسيم أجرة الأوبر

- **التقسيم المتساوي دائماً بغض النظر عن نقاط النزول**: يظلم من ينزل مبكراً في الرحلات الطويلة
- **نسيان تسجيل الرحلة كمصروف**: يضيع وسط رحلات الليلة المتعددة
- **عدم الاتفاق مسبقاً**: نقاش محرج بعد وصول الفاتورة في نهاية الرحلة
- **تجاهل رسوم الذروة (Surge)**: يجب تقسيمها بنفس منطق تقسيم الأجرة الأساسية

## كيف يساعدك Diviso في تقسيم رحلات الأوبر؟

- ✅ تسجيل أجرة الرحلة كمصروف فوري بمبالغ مخصصة لكل راكب
- ✅ دعم التقسيم غير المتساوي حسب المسافة أو نقطة النزول
- ✅ تجميع كل رحلات الليلة في مجموعة واحدة وتسويتها دفعة واحدة
- ✅ سجل واضح يوضح من دفع الرحلة الفعلية ومن عليه نصيبه

## أسئلة شائعة

### هل يجب أن يدفع الجميع نفس المبلغ في رحلة الأوبر المشتركة؟
لا بالضرورة. إذا كان الركاب ينزلون في نقاط مختلفة، فالأعدل تقسيم الأجرة حسب نسبة المسافة الفعلية التي قطعها كل شخص بدلاً من التقسيم المتساوي.

### كيف أحسب نصيبي إذا نزلت قبل نهاية الرحلة؟
اقسم الأجرة الإجمالية على مجموع مسافات كل الركاب مجتمعة (بالكيلومتر)، ثم اضرب الناتج في المسافة الفعلية التي ركبتها أنت فقط، من نقطة الصعود إلى نقطة نزولك.

### ماذا لو كانت هناك رسوم ذروة (Surge) على الرحلة؟
اجمع رسوم الذروة مع الأجرة الأساسية لتكوين الأجرة الإجمالية، ثم طبّق نفس طريقة التقسيم حسب المسافة على المجموع الكلي.

## الخلاصة

تقسيم أجرة الأوبر أو كريم بعدل يحتاج التفكير في نقاط النزول، لا فقط عدد الركاب. استخدموا طريقة المسافة الفعلية للحالات ذات الفروقات الكبيرة، وسجّلوا كل رحلة فوراً لتجنّب تراكم الحسابات.

**جرب Diviso الآن وقسّم أجرة رحلاتكم المشتركة بعدل تام.**
    `,
    contentEn: `
## Quick Answer

Splitting an Uber or Careem fare equally is unfair when passengers get dropped off at different stops, because whoever rides the longer distance benefits more from the trip. The fairer method is to split the fare based on the actual distance each rider traveled, not just the headcount. Whoever gets dropped off first (a shorter distance) pays less, and whoever stays until the end (the full distance) pays more.

## Why an Equal Split Doesn't Work Here

If 3 friends share one Uber and one of them gets dropped off after a quarter of the route while the others ride to the very end, an equal split means the person who got off early paid the same amount as someone who rode the entire trip, despite benefiting from only a small portion of it. This creates a sense of unfairness, especially on recurring rides with the same group.

## How to Calculate a Fair Distance-Based Share

### The Formula
1. Calculate the total distance of the full trip
2. Calculate the actual distance each person rode (from pickup to their own drop-off point)
3. Add up all these "person-distances" together
4. Cost per km = total fare ÷ sum of person-distances
5. Each person's share = their actual distance × cost per km

### A Worked Example
An Uber trip with a total fare of 60 SAR, covering 20 km total, with 3 passengers:
- Khaled gets dropped off after 6 km (first stop)
- Sara gets dropped off after 12 km
- Ahmed rides the full 20 km

**Total person-distance** = 6 + 12 + 20 = 38 person-km
**Cost per km** = 60 ÷ 38 ≈ 1.58 SAR

- Khaled's share = 6 × 1.58 ≈ 9.5 SAR
- Sara's share = 12 × 1.58 ≈ 18.9 SAR
- Ahmed's share = 20 × 1.58 ≈ 31.6 SAR

Compare this to an equal split (20 SAR each), which would have made Khaled pay more than double his fair share despite getting off early.

## When Is an Equal Split Actually Fine?

- **Everyone drops off at roughly the same point**: the distance difference is negligible and doesn't justify a complex calculation
- **A very short trip**: the difference in riyals is too small to be worth discussing
- **A prior agreement within the group**: sometimes friends prefer simplicity over perfect precision

## A Simpler Alternative: Split by Drop-Off Order

If calculating the exact distance is difficult (no clear GPS breakdown available), use a simple approximation: whoever gets dropped off first pays a smaller share of the fare, and whoever stays until the end pays a larger share, based on a rough estimate of relative distance instead of an exact kilometer calculation.

## A Practical System for Splitting Shared Ride Fares

### Step 1: Agree on the Splitting Method Before the Ride
Decide in advance: equal split or distance-based split, especially if the drop-off points are already known.

### Step 2: Keep a Screenshot of the Trip Details
Uber and Careem show the distance and total fare at the end of the trip — save it for reference when calculating the split.

### Step 3: Log the Expense Immediately
Use an app like Diviso to log the ride fare and split it with custom amounts per person instead of an automatic equal split.

### Step 4: Settle Up Around the Same Time
Don't let multiple rides pile up as scattered debts — settle the bill after each ride or at the end of the night.

## Common Mistakes When Splitting Uber Fares

- **Always splitting equally regardless of drop-off points**: unfairly penalizes whoever gets off early on longer trips
- **Forgetting to log the ride as an expense**: it gets lost among multiple rides in one night
- **Not agreeing in advance**: leads to an awkward conversation once the fare shows up
- **Ignoring surge pricing**: surge fees should be split using the same logic as the base fare

## How Diviso Helps Split Uber and Careem Rides

- ✅ Logs the ride fare instantly with custom amounts per rider
- ✅ Supports uneven splits based on distance or drop-off point
- ✅ Groups all of a night's rides together and settles them in one go
- ✅ A clear record of who paid for the actual ride and who still owes their share

## Frequently Asked Questions

### Should everyone pay the same amount on a shared Uber ride?
Not necessarily. If passengers are dropped off at different stops, the fairer approach is to split the fare based on the proportion of the actual distance each person rode, instead of an equal split.

### How do I calculate my share if I got off before the end of the trip?
Divide the total fare by the combined distance of all riders (in kilometers), then multiply the result by the actual distance you personally rode, from pickup to your drop-off point.

### What if there was surge pricing on the ride?
Add the surge fee to the base fare to get the total fare, then apply the same distance-based splitting method to that combined total.

## Conclusion

Splitting an Uber or Careem fare fairly means thinking about drop-off points, not just the number of riders. Use the distance-based method for cases with big differences, and log every ride immediately to avoid piling up scattered debts.

**Try Diviso now and split your shared ride fares with complete fairness.**
    `
  },
  {
    slug: "minimum-transactions-to-settle-group-debts",
    title: "كم تحويلة تحتاج لتسوية ديون المجموعة؟ طريقة تبسيط الديون",
    titleEn: "How Many Transactions Do You Need to Settle a Group's Debts? The Debt Simplification Method",
    description: "لماذا لا يجب أن يحوّل كل شخص لكل شخص عند تسوية مصاريف الرحلة؟ تعرف على طريقة تبسيط الديون التي تقلل عدد التحويلات المطلوبة لتسوية حسابات المجموعة إلى أقل عدد ممكن.",
    descriptionEn: "Why shouldn't everyone in a group pay everyone else individually? Learn the debt simplification method that reduces the number of transfers needed to settle a group's shared expenses to the minimum possible.",
    keywords: ["تسوية ديون المجموعة", "تبسيط الديون", "أقل عدد تحويلات لتسوية الحساب", "تسوية حسابات الرحلة", "خوارزمية تسوية المصاريف", "من يدفع لمن في المجموعة"],
    keywordsEn: ["minimum transactions to settle group debts", "debt simplification algorithm", "how to settle group expenses with fewer payments", "settle up algorithm explained", "minimal cash flow method", "who pays whom in a group expense"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-08-31",
    content: `
## الإجابة المختصرة

عند تسوية مصاريف مجموعة، لا يحتاج كل شخص أن يحوّل لكل شخص آخر. الطريقة الصحيحة هي حساب "الرصيد الصافي" لكل فرد (كم دفع مقابل كم يفترض أن يدفع)، ثم مطابقة من عليه فلوس مع من له فلوس مباشرة، بحيث يصل عدد التحويلات المطلوبة إلى أقل رقم ممكن — غالباً عدد الأشخاص الذين عليهم رصيد ناقص من واحد. هذا يسمى "تبسيط الديون" (Debt Simplification)، وهو ما يقوم به تطبيق تقسيم المصاريف الجيد تلقائياً بدلاً منك.

## ما معنى "تبسيط الديون"؟

تبسيط الديون هو حساب رياضي يحوّل شبكة معقدة من "مين يدين لمين" داخل مجموعة، إلى أقل عدد ممكن من التحويلات المالية اللازمة لتصفير كل الأرصدة. بدل تتبع كل معاملة على حدة (فلان دفع كذا لفلان، وفلان دفع كذا لفلان ثاني)، يُحسب **الرصيد الصافي** لكل شخص فقط: الفرق بين ما دفعه فعلياً وما يفترض أنه يتحمله من إجمالي المصاريف.

## ليش التسوية العشوائية تضيّع فلوس ووقت؟

لو مجموعة من 5 أشخاص سجّلت مصاريف متبادلة طوال رحلة، فبدون تبسيط قد تحتاجون نظرياً حتى 10 تحويلات مختلفة (كل شخص مع كل شخص). لكن أغلب هذه التحويلات غير ضرورية إطلاقاً، لأنها تُلغي بعضها البعض حسابياً.

### مثال بسيط يوضح المشكلة
لو أحمد يدين لسارة 100 ريال، وسارة تدين لخالد 100 ريال، وخالد يدين لأحمد 100 ريال — هذه حلقة مقفلة. لو حوّل كل واحد فعلاً، تحركت 300 ريال في 3 تحويلات، لكن النتيجة النهائية أن **لا أحد يدين لأحد**! رصيد كل شخص صافي = صفر، فلا حاجة لأي تحويلة أصلاً.

## كيف تحسب أقل عدد تحويلات بدقة؟

### الخطوة 1: احسب الرصيد الصافي لكل شخص
الرصيد الصافي = (إجمالي ما دفعه الشخص) − (إجمالي نصيبه من كل المصاريف).

- رصيد موجب = له فلوس عند المجموعة (دفع أكثر من نصيبه)
- رصيد سالب = عليه فلوس للمجموعة (دفع أقل من نصيبه)

### الخطوة 2: طابق أصحاب الأرصدة السالبة مع أصحاب الأرصدة الموجبة
حوّل من صاحب أكبر رصيد سالب إلى صاحب أكبر رصيد موجب، بمبلغ يساوي الأصغر بينهما، وكرر العملية حتى تتصفر كل الأرصدة.

### مثال عملي كامل
مجموعة من 5 أشخاص بعد رحلة، أرصدتهم الصافية:
- أحمد: +120 ريال (له عند المجموعة)
- سارة: +80 ريال (لها عند المجموعة)
- خالد: −50 ريال (عليه للمجموعة)
- نورة: −70 ريال (عليها للمجموعة)
- فهد: −80 ريال (عليه للمجموعة)

بدل أن يحوّل كل واحد من الثلاثة لكل واحد من الاثنين (ما قد يصل لـ6 تحويلات)، تكفي 3 تحويلات فقط:
- نورة تحوّل 70 ريال لأحمد → يتصفر رصيد نورة، ويتبقى لأحمد 50 ريال
- خالد يحوّل 50 ريال لأحمد → يتصفر رصيد أحمد وخالد معاً
- فهد يحوّل 80 ريال لسارة → يتصفر الجميع

**النتيجة: 3 تحويلات بدل 6، بنفس المبالغ الصحيحة تماماً.**

## القاعدة العامة لعدد التحويلات الأدنى

في أغلب الحالات، أقل عدد تحويلات ممكن = (عدد الأشخاص الذين لهم رصيد غير صفري) − 1. كلما زاد عدد أعضاء المجموعة وتشابكت المدفوعات، زاد الفرق بين "التسوية العشوائية" و"التسوية المبسطة".

## متى تحتاج تبسيط الديون فعلياً؟

- **رحلات جماعية طويلة**: كل شخص دفع لأشياء مختلفة (فندق، طعام، مواصلات)
- **سكن مشترك**: فواتير متفرقة يدفعها أشخاص مختلفون كل شهر
- **مصاريف متكررة**: اشتراكات أو حجوزات أسبوعية بمدفوعات متغيرة
- **أي مجموعة تتجاوز 3 أشخاص**: كلما زاد العدد، زادت فائدة التبسيط

## أخطاء شائعة عند التسوية اليدوية

- **تتبع كل معاملة على حدة بدل الرصيد الصافي**: يضيع الوقت في تحويلات غير ضرورية
- **الاعتماد على الذاكرة**: يصعب حساب الرصيد الصافي يدوياً لمجموعة كبيرة
- **تجاهل الحلقات المقفلة**: تحويلات فعلية لديون تُلغي بعضها رياضياً
- **عدم توثيق من دفع فعلاً**: يصعب التحقق لاحقاً من اكتمال التسوية

## كيف يحسب Diviso أقل عدد تحويلات تلقائياً؟

- ✅ يحسب الرصيد الصافي لكل عضو في المجموعة تلقائياً
- ✅ يطابق الأرصدة الموجبة والسالبة لأقل عدد تحويلات ممكن
- ✅ يعرض لكل شخص بالضبط لمن يحوّل وكم المبلغ
- ✅ يحدّث التسوية فوراً عند إضافة أي مصروف جديد
- ✅ يوثّق كل تحويلة مؤكدة من الطرفين لتجنب الجدال

## أسئلة شائعة

### هل يجب أن يحوّل كل شخص لكل شخص عليه دين له؟
لا، هذا غير ضروري ومضيعة للوقت والتحويلات. الطريقة الصحيحة هي حساب الرصيد الصافي لكل شخص أولاً، ثم مطابقة أصحاب الأرصدة السالبة مع أصحاب الأرصدة الموجبة مباشرة.

### ما أقل عدد تحويلات ممكن لتسوية مجموعة من 5 أشخاص؟
في أغلب الحالات، أقل عدد تحويلات = عدد الأشخاص الذين لهم رصيد غير صفري ناقص واحد. لمجموعة من 5 أشخاص كلهم لهم أرصدة غير صفرية، الحد الأقصى النظري هو 4 تحويلات، وقد يكون أقل حسب توزيع المبالغ.

### كيف أعرف الرصيد الصافي لشخص في المجموعة؟
اطرح إجمالي نصيبه من كل مصاريف المجموعة من إجمالي ما دفعه فعلياً. إذا كان الناتج موجباً فله فلوس عند المجموعة، وإذا كان سالباً فهو مدين للمجموعة بهذا المبلغ.

## الخلاصة

تسوية مصاريف المجموعة لا يجب أن تعني عشرات التحويلات المتبادلة. احسبوا الرصيد الصافي لكل شخص، طابقوا الديون والمستحقات، واتركوا التطبيق يقلل عدد التحويلات إلى أدنى حد ممكن.

**جرب Diviso الآن وسوِّ حسابات مجموعتك بأقل عدد تحويلات ممكن.**
    `,
    contentEn: `
## Quick Answer

When settling a group's shared expenses, nobody needs to transfer money to everyone they technically owe. The correct method is to calculate each person's **net balance** (how much they paid versus how much they should have paid), then match people who owe money directly with people who are owed money, so the total number of transfers needed is as small as possible — usually the number of people with a non-zero balance, minus one. This is called **debt simplification**, and it's exactly what a good expense-splitting app calculates automatically instead of you doing it by hand.

## What Does "Debt Simplification" Mean?

Debt simplification is a calculation that turns a tangled web of "who owes whom" inside a group into the smallest possible number of money transfers needed to zero out every balance. Instead of tracking every individual transaction separately (person A paid person B this much, person C paid person D that much), you calculate each person's **net balance** only: the difference between what they actually paid and what they should have contributed based on the total expenses.

## Why Settling Debts Randomly Wastes Money and Time

If a group of 5 people logged expenses back and forth throughout a trip, settling without simplification could theoretically require up to 10 separate transfers (everyone paying everyone). But most of those transfers are completely unnecessary because they mathematically cancel each other out.

### A Simple Example That Shows the Problem
Say Ahmed owes Sara 100 SAR, Sara owes Khaled 100 SAR, and Khaled owes Ahmed 100 SAR — that's a closed loop. If everyone actually transferred the money, 300 SAR would move across 3 transactions, but the final result is that **nobody owes anybody anything**! Each person's net balance is zero, so no transfer was needed in the first place.

## How to Calculate the Minimum Number of Transactions

### Step 1: Calculate Each Person's Net Balance
Net balance = (total amount the person paid) − (total amount they should have contributed based on their share of all expenses).

- A positive balance means the group owes them money (they paid more than their share)
- A negative balance means they owe the group money (they paid less than their share)

### Step 2: Match Negative Balances With Positive Balances
Have the person with the largest negative balance pay the person with the largest positive balance, in an amount equal to whichever is smaller, and repeat until every balance reaches zero.

### A Full Worked Example
A group of 5 people after a trip, with these net balances:
- Ahmed: +120 SAR (the group owes him)
- Sara: +80 SAR (the group owes her)
- Khaled: −50 SAR (he owes the group)
- Noura: −70 SAR (she owes the group)
- Fahad: −80 SAR (he owes the group)

Instead of each of the three debtors paying each of the two creditors (which could reach 6 transfers), just 3 transfers are enough:
- Noura transfers 70 SAR to Ahmed → Noura's balance hits zero, Ahmed has 50 SAR left owed to him
- Khaled transfers 50 SAR to Ahmed → both Ahmed and Khaled's balances hit zero
- Fahad transfers 80 SAR to Sara → everyone is settled

**Result: 3 transfers instead of 6, with exactly the right amounts.**

## The General Rule for the Minimum Number of Transactions

In most cases, the minimum possible number of transactions equals (the number of people with a non-zero balance) minus 1. The larger the group and the more tangled the payments, the bigger the gap between "settling randomly" and "settling with simplification."

## When You Actually Need Debt Simplification

- **Long group trips**: everyone paid for different things (hotel, food, transport)
- **Shared housing**: scattered bills paid by different roommates each month
- **Recurring expenses**: subscriptions or weekly bookings with varying payments
- **Any group larger than 3 people**: the bigger the group, the more simplification helps

## Common Mistakes When Settling Manually

- **Tracking every individual transaction instead of the net balance**: wastes time on unnecessary transfers
- **Relying on memory**: calculating net balances by hand becomes hard for a large group
- **Ignoring closed loops**: making real transfers for debts that mathematically cancel out
- **Not documenting who actually paid**: makes it hard to verify the settlement is complete later

## How Diviso Calculates the Minimum Number of Transactions Automatically

- ✅ Automatically calculates every group member's net balance
- ✅ Matches positive and negative balances to reach the minimum number of transfers
- ✅ Shows each person exactly who to pay and how much
- ✅ Updates the settlement instantly whenever a new expense is added
- ✅ Records each transfer as confirmed by both sides to avoid disputes

## Frequently Asked Questions

### Does everyone need to pay everyone they technically owe money to?
No, that's unnecessary and wastes time and transfers. The correct approach is to calculate each person's net balance first, then match those with negative balances directly against those with positive balances.

### What's the minimum number of transactions to settle a group of 5 people?
In most cases, the minimum equals the number of people with a non-zero balance minus one. For a group of 5 people who all have non-zero balances, the theoretical maximum is 4 transfers, and it can be fewer depending on how the amounts line up.

### How do I find a person's net balance in a group?
Subtract their total share of all group expenses from the total amount they actually paid. A positive result means the group owes them money; a negative result means they owe the group that amount.

## Conclusion

Settling a group's expenses shouldn't mean dozens of back-and-forth transfers. Calculate each person's net balance, match debts against credits, and let the app reduce the number of transfers to the absolute minimum.

**Try Diviso now and settle your group's expenses with the fewest transfers possible.**
    `
  },
  {
    slug: "collect-money-for-group-gift",
    title: "كيف تجمع فلوس هدية جماعية من الزملاء أو الأصدقاء بسهولة؟",
    titleEn: "How to Collect Money for a Group Gift From Friends or Coworkers",
    description: "دليل عملي لتنظيم جمع الفلوس لهدية جماعية (زواج، مولود، وداع زميل) بدون ملاحقة أحد، مع طريقة تحديد نصيب الفرد ومتابعة من دفع ومن لم يدفع بعد.",
    descriptionEn: "A practical guide to collecting money for a group gift — a wedding, a newborn, a coworker's farewell — without chasing anyone down, including how to set each person's share and track who's paid.",
    keywords: ["تجميع فلوس هدية", "جمع فلوس من الزملاء", "هدية جماعية للزميل", "تنظيم جمع تبرعات هدية", "كم نصيبي في الهدية", "جمع فلوس هدية زواج"],
    keywordsEn: ["how to collect money for a group gift", "gift pool calculator", "collect money from coworkers for a gift", "group gift contribution app", "pooling money for a wedding gift", "organize a group gift collection"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-08-30",
    content: `
## الإجابة المختصرة

أفضل طريقة لجمع فلوس هدية جماعية هي تحديد ميزانية الهدية الإجمالية أولاً، ثم قسمتها على عدد المشاركين المتوقع للوصول لنصيب الفرد المقترح، وتحصيلها عبر رابط أو مجموعة واحدة قبل موعد الشراء بيومين على الأقل. هذا يمنع الشخص المسؤول عن الهدية من دفع الفرق من جيبه أو ملاحقة الزملاء يومياً للسؤال "حولت لي؟".

## ليش جمع فلوس الهدية الجماعية محرج ومعقد؟

جمع فلوس هدية يختلف عن تقسيم مصروف عادي لأنه **تحصيل مسبق قبل الشراء، وليس تسوية بعد الدفع**:

- **الحرج من التذكير**: ما أحد يحب يرسل "بالمرة ما نسيت تحويل نصيبك؟" أكثر من مرة
- **غموض المبلغ المطلوب**: كثير من الزملاء ما يعرفون كم يفترض يدفعون بالضبط
- **تفاوت المشاركة**: البعض يبي يشارك بأكثر، والبعض ميزانيته محدودة
- **ضغط الوقت**: الهدية لها موعد محدد (حفل، وداع)، فما فيه وقت للتأجيل

## كيف تحدد نصيب كل شخص بدقة؟

القاعدة البسيطة: **ميزانية الهدية الإجمالية ÷ عدد المشاركين المتوقع = نصيب الفرد المقترح**.

### مثال عملي
لو فريق العمل قرر إهداء زميل مسافر هدية وداع بميزانية 800 ريال، والفريق 8 أشخاص، فنصيب كل واحد المقترح = 800 ÷ 8 = 100 ريال.

لو انضم شخصان إضافيان لاحقاً (زملاء من قسم ثاني)، يعاد الحساب: 800 ÷ 10 = 80 ريال للفرد، وتُرد الفروقات لمن دفع 100 ريال بالفعل.

### ماذا لو أراد البعض المساهمة بمبلغ أكبر؟
اجعلوا "نصيب الفرد المقترح" رقماً إرشادياً لا إلزامياً، وأتيحوا لمن يرغب المساهمة بأكثر أن يفعل ذلك بحرية دون إحراج من دفع الحد الأدنى فقط.

## خطوات عملية لتنظيم جمع فلوس الهدية

### الخطوة 1: حددوا الميزانية والمناسبة بوضوح
اتفقوا من البداية: ما المناسبة (زواج، مولود، وداع)، وكم الميزانية التقريبية للهدية.

### الخطوة 2: أنشئوا مجموعة تحصيل واحدة
بدل رسائل واتساب متفرقة يصعب تتبعها، استخدم تطبيق مثل Diviso لإنشاء مجموعة خاصة بالهدية يشوفها الجميع.

### الخطوة 3: حددوا موعداً نهائياً للتحصيل
اطلبوا التحويل قبل موعد الشراء بيومين على الأقل، حتى يتسع الوقت لمتابعة المتأخرين بدون ضغط اللحظة الأخيرة.

### الخطوة 4: تابعوا من دفع ومن لم يدفع بشفافية
بدل الرسائل الفردية المحرجة، خلّوا التطبيق يعرض للجميع (أو للمسؤول فقط) حالة كل شخص، فتصير المتابعة تلقائية لا شخصية.

### الخطوة 5: اشتروا الهدية وسجّلوا الفرق
بعد الشراء، سجّلوا السعر الفعلي. لو زاد أو نقص عن المتوقع، وزّعوا الفرق أو ردّوه بشفافية.

## كيف تتعامل مع من لا يستجيب؟

- **ذكّروا بلطف عبر المجموعة العامة** بدل الرسالة الشخصية المباشرة أول مرة
- **حددوا مهلة واضحة**: "التحصيل يقفل يوم الخميس"
- **لا تنتظروا الجميع**: لو اقترب الموعد ونقص التمويل، اشتروا هدية بالميزانية المتوفرة فعلياً
- **لا تفترضوا سوء النية**: كثير من التأخير سببه النسيان لا التهرب

## أخطاء شائعة تفسد جمع فلوس الهدية

- **عدم تحديد نصيب واضح من البداية**: يخلي كل شخص يحوّل مبلغاً عشوائياً
- **الاعتماد على شخص واحد يتذكر كل التحويلات يدوياً**: عرضة للخطأ والنسيان
- **تأجيل التحصيل لآخر لحظة**: يضطر المسؤول لدفع الفرق من جيبه
- **عدم تسجيل من دفع بالضبط**: يصعب تتبع المتأخرين لاحقاً لو الهدية تكررت

## كيف يساعدك Diviso في تنظيم جمع فلوس الهدية؟

- ✅ إنشاء مجموعة مؤقتة مخصصة لكل مناسبة هدية
- ✅ عرض نصيب الفرد المقترح تلقائياً بناءً على الميزانية وعدد المشاركين
- ✅ تتبع من دفع ومن لم يدفع بعد دون رسائل شخصية محرجة
- ✅ تعديل النصيب تلقائياً إذا انضم أو انسحب أحد المشاركين
- ✅ إغلاق المجموعة بعد الشراء وتوثيق التكلفة النهائية

## أسئلة شائعة

### كيف أحدد كم يجب أن يدفع كل شخص في الهدية الجماعية؟
اقسم الميزانية الإجمالية للهدية على عدد المشاركين المتوقع للحصول على نصيب إرشادي لكل فرد، مع السماح لمن يرغب بالمساهمة بأكثر أن يفعل ذلك اختيارياً.

### ماذا أفعل إذا لم يدفع بعض الزملاء في الوقت المحدد؟
ذكّرهم بلطف عبر رسالة جماعية بدل رسائل شخصية، وحددوا مهلة نهائية واضحة. إذا اقترب موعد الشراء، اشتروا الهدية بالميزانية المتوفرة فعلياً بدل الانتظار إلى ما لا نهاية.

### هل يجب أن يدفع الجميع نفس المبلغ بالضبط؟
لا، النصيب المقترح إرشادي فقط. من يرغب بالمساهمة بأكثر يمكنه ذلك، والمهم أن يعرف الجميع المبلغ الأدنى المتوقع منهم بوضوح.

## الخلاصة

جمع فلوس الهدية الجماعية لا يجب أن يكون مصدر إحراج أو عبء على شخص واحد. حددوا الميزانية، أنشئوا مجموعة تحصيل واضحة، وخلّوا التطبيق يتابع من دفع بدل ما تصير أنت "شرطي التحصيل".

**جرب Diviso الآن ونظّم جمع فلوس الهدية القادمة بدون ملاحقة أحد.**
    `,
    contentEn: `
## Quick Answer

The best way to collect money for a group gift is to set the total gift budget first, then divide it by the expected number of contributors to get a suggested per-person amount, and collect it through one shared link or group at least two days before you need to buy the gift. This stops the person organizing the gift from covering the shortfall out of pocket or chasing coworkers every day asking "did you send it yet?"

## Why Collecting Money for a Group Gift Is Awkward and Messy

Collecting for a group gift is different from splitting a regular expense because it's **money collected upfront before a purchase, not a settlement after the fact**:

- **The awkwardness of reminding people**: nobody enjoys sending "just a reminder, did you transfer your share?" more than once
- **Unclear expected amount**: many coworkers genuinely don't know how much they're supposed to contribute
- **Uneven willingness to contribute**: some people want to give more, others are on a tighter budget
- **A hard deadline**: the gift has a fixed occasion (a party, a farewell), so there's no room to delay

## How to Set Each Person's Fair Share

The simple formula: **total gift budget ÷ expected number of contributors = suggested per-person share**.

### Worked Example
If a team decides to give a departing coworker a farewell gift budgeted at 800 SAR, split among 8 people, the suggested share per person is 800 ÷ 8 = 100 SAR.

If two more people from another department join later, recalculate: 800 ÷ 10 = 80 SAR per person, and refund the difference to anyone who already sent 100 SAR.

### What If Some People Want to Contribute More?
Treat the "suggested per-person share" as a guideline, not a mandatory fixed amount, and let anyone who wants to contribute more do so freely without singling out those who only pay the minimum.

## A Practical System for Collecting Gift Money

### Step 1: Define the Budget and Occasion Clearly
Agree upfront: what's the occasion (wedding, newborn, farewell), and what's the rough gift budget.

### Step 2: Create One Collection Group
Instead of scattered WhatsApp messages that are hard to track, use an app like Diviso to create a dedicated group for the gift that everyone can see.

### Step 3: Set a Collection Deadline
Ask for transfers at least two days before the purchase date, so there's time to follow up on stragglers without last-minute pressure.

### Step 4: Track Who's Paid Transparently
Instead of awkward individual messages, let the app show everyone (or just the organizer) each person's status, so follow-up becomes automatic instead of personal.

### Step 5: Buy the Gift and Log the Actual Cost
After purchasing, record the real price. If it came in higher or lower than expected, distribute or refund the difference transparently.

## How to Handle Non-Responders

- **Send a gentle reminder in the shared group first**, not a direct personal message
- **Set a clear deadline**: "Collection closes Thursday"
- **Don't wait for everyone**: if the deadline is near and funding is short, buy the gift with whatever's actually been collected
- **Don't assume bad intent**: most delays are forgetfulness, not avoidance

## Common Mistakes That Ruin a Group Gift Collection

- **Not setting a clear share upfront**: everyone ends up transferring a random amount
- **Relying on one person to remember every transfer manually**: prone to errors and forgotten payments
- **Waiting until the last minute to collect**: forces the organizer to cover the shortfall themselves
- **Not tracking exactly who paid**: makes it hard to follow up if the gift collection repeats later

## How Diviso Helps Organize a Group Gift Collection

- ✅ Creates a temporary group dedicated to each gift occasion
- ✅ Automatically shows the suggested per-person share based on the budget and number of contributors
- ✅ Tracks who has and hasn't paid without awkward personal messages
- ✅ Automatically recalculates the share if someone joins or drops out
- ✅ Closes the group after the purchase and logs the final cost

## Frequently Asked Questions

### How do I figure out how much each person should pay for a group gift?
Divide the total gift budget by the expected number of contributors to get a suggested per-person share, while letting anyone who wants to contribute more do so voluntarily.

### What if some coworkers don't pay by the deadline?
Send a gentle reminder through the shared group instead of individual messages, and set a clear final deadline. If the purchase date is close, buy the gift with whatever has actually been collected instead of waiting indefinitely.

### Does everyone need to pay the exact same amount?
No, the suggested share is just a guideline. Anyone who wants to contribute more can, as long as everyone clearly knows the minimum amount expected of them.

## Conclusion

Collecting money for a group gift shouldn't be a source of awkwardness or a burden on one person. Set the budget, create a clear collection group, and let the app track who's paid instead of you becoming the "collection police."

**Try Diviso now and organize your next group gift collection without chasing anyone down.**
    `
  },
  {
    slug: "split-carpool-gas-costs",
    title: "كيف تقسم تكلفة البنزين مع زملاء التوصيل اليومي؟",
    titleEn: "How to Split Gas Money for a Daily Carpool — A Fair Cost-Per-Trip Method",
    description: "طريقة عملية لحساب وتقسيم تكلفة البنزين بين زملاء التوصيل اليومي للعمل أو الجامعة، مع مثال حساب دقيق ونظام تناوب السواقة بدون فلوس.",
    descriptionEn: "A practical formula for calculating and splitting daily carpool gas costs with coworkers or classmates, with a worked example and a no-cash driving-rotation alternative.",
    keywords: ["تقسيم تكلفة البنزين", "تقسيم فلوس التوصيل", "توصيل مع الزملاء", "حساب تكلفة البنزين للسيارة", "تقسيم مصاريف السيارة المشتركة", "تكلفة التوصيل اليومي للعمل"],
    keywordsEn: ["how to split gas money for carpool", "carpool cost calculator", "split fuel cost with coworkers", "daily commute expense splitter", "fair way to split gas money", "carpool gas cost per person"],
    category: "tips",
    readTime: 6,
    publishDate: "2026-08-29",
    content: `
## الإجابة المختصرة

أفضل طريقة لتقسيم تكلفة البنزين في التوصيل اليومي هي حساب تكلفة الرحلة الفعلية (كمية البنزين المستهلكة × سعر اللتر)، ثم قسمتها على عدد الركاب في السيارة بمن فيهم السائق، وتحصيلها أسبوعياً بدل يومياً. البديل الأسهل بدون أي تحويل فلوس هو نظام "تناوب السواقة" — كل واحد يسوق أسبوعاً بسيارته، فتتعادل التكلفة تلقائياً مع الوقت.

## ليش تقسيم تكلفة البنزين مختلف عن مصاريف الرحلة العادية؟

التوصيل اليومي مصروف متكرر يومياً وليس مرة واحدة، وهذا يخلق تحديات خاصة:

- **يتكرر 5 أيام أسبوعياً**: حتى الفرق البسيط باليوم يتراكم بسرعة على شهر كامل
- **السائق يتحمل تكلفة إضافية**: البنزين، الصيانة، الإطارات — مو بس وقت السواقة
- **غياب متقطع**: أحدهم يأخذ إجازة أو يوصّل نفسه أحياناً
- **تجنّب الإحراج اليومي**: ما أحد يبغى يذكّر زميله بالفلوس كل صباح

## كيف تحسب تكلفة الرحلة بدقة؟

القاعدة: **تكلفة الرحلة = المسافة (كم) ÷ 100 × معدل استهلاك السيارة (لتر/100كم) × سعر اللتر**.

### مثال عملي
لو الرحلة ذهاباً وإياباً للعمل 30 كم، والسيارة تستهلك تقريباً 7 لترات لكل 100 كم، وسعر اللتر 2.33 ريال:

- كمية البنزين المستهلكة = 30 ÷ 100 × 7 = 2.1 لتر
- تكلفة الرحلة اليومية = 2.1 × 2.33 ≈ 4.9 ريال
- التكلفة الأسبوعية (5 أيام عمل) ≈ 24.5 ريال

لو السيارة فيها 4 أشخاص (السائق + 3 ركاب)، فنصيب كل واحد أسبوعياً = 24.5 ÷ 4 ≈ 6.1 ريال، أي حوالي 24-25 ريال شهرياً للشخص.

### هل يدفع السائق نصيبه أيضاً؟
الأعدل أن يُحسب نصيب السائق ضمن القسمة مثل الباقين تماماً، لأن تكلفة البنزين تُصرف بغض النظر عن مين يسوق. بعض المجموعات تضيف نسبة بسيطة إضافية (10-15%) تُدفع للسائق فقط كتعويض عن الصيانة والإطارات.

## طريقتان لتنظيم توصيل الزملاء

### الطريقة 1: تحصيل أسبوعي أو شهري ثابت
شخص واحد يسوق دائماً، والباقون يحوّلون له مبلغاً ثابتاً كل أسبوع أو شهر بدل حساب كل يوم على حدة.

**مناسبة لـ**: مجموعة عندها سيارة واحدة موثوقة وسائق ثابت.

### الطريقة 2: تناوب السواقة بدون فلوس
كل شخص يسوق بسيارته أسبوعاً كاملاً بالتناوب. النتيجة: كل واحد يدفع بنزين سيارته بنفس عدد الأسابيع تقريباً، فتتعادل التكلفة بدون أي تحويلات مالية.

**مناسبة لـ**: مجموعة كل أفرادها عندهم سيارات ويفضلون تجنب حسابات الفلوس اليومية.

## خطوات عملية لتقسيم تكلفة التوصيل

### الخطوة 1: احسبوا التكلفة الأسبوعية الفعلية
استخدموا معدل استهلاك السيارة الحقيقي (تقدر تشوفه من عداد السيارة أو تطبيق الوقود) بدل التخمين.

### الخطوة 2: سجّلوا التوصيل كمصروف متكرر
استخدم تطبيق مثل Diviso لتسجيل مصروف البنزين الأسبوعي كمصروف متكرر بين أعضاء مجموعة التوصيل، بدل ما تعتمدون على الذاكرة.

### الخطوة 3: اتفقوا على التعامل مع الغياب
حددوا مسبقاً: هل الغائب يدفع نصيبه كامل، أم يُخصم يوم الغياب من حسابه؟

### الخطوة 4: راجعوا الاتفاق كل شهر
أسعار الوقود ومعدلات الاستهلاك قد تتغير، فراجعوا الحساب دورياً للتأكد إن التقسيم لسا عادل.

## أخطاء شائعة تفسد توصيل الزملاء

- **الاعتماد على تقدير تقريبي**: "خلنا نقول 20 ريال بس" بدون حساب فعلي يخلي أحداً يدفع أكثر من نصيبه
- **عدم تسجيل من دفع**: بعد شهر محد يتذكر مين حوّل ومين لأ
- **تجاهل تكلفة الصيانة**: البنزين مو التكلفة الوحيدة، والسائق يتحمل استهلاك إضافي في السيارة
- **عدم وجود سياسة غياب واضحة**: نقاش متكرر كل ما غاب أحد

## كيف يساعدك Diviso في تنظيم توصيل الزملاء؟

- ✅ تسجيل تكلفة البنزين كمصروف أسبوعي متكرر
- ✅ تقسيم دقيق على عدد ركاب كل رحلة بمن فيهم السائق
- ✅ تذكير تلقائي بموعد التحصيل الأسبوعي أو الشهري
- ✅ سجل واضح يوضح من دفع نصيبه ومن لم يدفع بعد
- ✅ مجموعة منفصلة لكل خط توصيل (عمل، جامعة)

## أسئلة شائعة

### كم تكلفة البنزين لتوصيل يومي مسافته 30 كم؟
باستهلاك 7 لترات لكل 100 كم وسعر لتر 2.33 ريال، تكلفة الرحلة اليومية تقريباً 4.9 ريال، أي حوالي 24.5 ريال أسبوعياً لكل سيارة.

### هل يدفع السائق نفس مبلغ الراكب في التوصيل اليومي؟
غالباً نعم بنفس النسبة، لأن تكلفة البنزين واحدة بغض النظر عن مين يسوق. بعض المجموعات تضيف نسبة صغيرة إضافية للسائق تعويضاً عن صيانة السيارة.

### ما البديل إذا ما حبينا نتعامل بالفلوس كل أسبوع؟
نظام تناوب السواقة — كل شخص يسوق بسيارته أسبوعاً بالتناوب — يلغي الحاجة لأي تحويلات مالية لأن التكلفة تتعادل تلقائياً مع الوقت.

## الخلاصة

توصيل الزملاء اليومي يوفر فلوس ووقت، لكنه يحتاج نظام واضح لحساب البنزين حتى لا يتحول لمصدر إحراج يومي. احسبوا التكلفة الفعلية، سجّلوها كمصروف متكرر، أو اعتمدوا نظام التناوب لتجنّبوا الحسابات نهائياً.

**جرب Diviso الآن ونظّم تكلفة التوصيل اليومي مع زملائك بدون صداع.**
    `,
    contentEn: `
## Quick Answer

The fairest way to split daily carpool gas money is to calculate the actual trip cost (fuel consumed × price per liter) and divide it by the number of people in the car, including the driver, then collect it weekly instead of daily. The simplest cash-free alternative is a driving rotation — each person drives their own car for a week at a time, which balances out the cost automatically over time.

## Why Carpool Gas Splitting Is Different From a Trip Expense

A daily commute is a recurring cost that repeats every single day, not a one-time trip, and that creates its own challenges:

- **It repeats 5 days a week**: even a small daily difference adds up quickly over a month
- **The driver bears extra costs**: fuel, maintenance, and tire wear, not just their driving time
- **Attendance is irregular**: someone takes a day off, drives themselves occasionally, or works from home
- **Nobody wants the daily awkwardness**: reminding a coworker about money every morning gets old fast

## How to Calculate the Trip Cost Accurately

The formula: **trip cost = distance (km) ÷ 100 × car's fuel consumption rate (liters/100km) × price per liter**.

### Worked Example
Say the round-trip commute is 30 km, the car consumes about 7 liters per 100 km, and fuel costs 2.33 SAR per liter:

- Fuel used = 30 ÷ 100 × 7 = 2.1 liters
- Daily trip cost = 2.1 × 2.33 ≈ 4.9 SAR
- Weekly cost (5 working days) ≈ 24.5 SAR

With 4 people in the car (driver + 3 passengers), each person's weekly share is 24.5 ÷ 4 ≈ 6.1 SAR, or roughly 24-25 SAR per month per person.

### Does the Driver Pay a Share Too?
The fairest approach is to include the driver's share in the split just like everyone else, since the fuel cost is spent regardless of who's driving. Some groups add a small extra percentage (10-15%) paid only to the driver as compensation for maintenance and tire wear.

## Two Ways to Organize Coworker Carpooling

### Method 1: Fixed Weekly or Monthly Collection
One person always drives, and everyone else transfers a fixed amount weekly or monthly instead of calculating each day separately.

**Best for**: a group with one reliable car and a consistent driver.

### Method 2: Cash-Free Driving Rotation
Each person drives their own car for a full week, taking turns. The result: everyone ends up paying for their own car's fuel roughly the same number of weeks, so the cost balances out with no money changing hands.

**Best for**: a group where everyone owns a car and prefers to avoid daily money math entirely.

## A Practical System for Splitting Commute Costs

### Step 1: Calculate the Real Weekly Cost
Use the car's actual fuel consumption rate (check the car's display or a fuel-tracking app) instead of guessing.

### Step 2: Log the Commute as a Recurring Expense
Use an app like Diviso to log the weekly gas cost as a recurring expense among the carpool group instead of relying on memory.

### Step 3: Agree on How to Handle Absences
Decide in advance: does an absent person still pay their full share, or is that day deducted from their total?

### Step 4: Review the Agreement Monthly
Fuel prices and consumption rates can change, so revisit the calculation periodically to make sure the split is still fair.

## Common Mistakes That Ruin Coworker Carpooling

- **Relying on a rough guess**: "let's just say 20 SAR" without a real calculation means someone ends up overpaying
- **Not tracking who paid**: after a month, nobody remembers who transferred money and who didn't
- **Ignoring maintenance costs**: fuel isn't the only cost — the driver's car takes on extra wear
- **No clear absence policy**: a repeated argument every time someone misses a day

## How Diviso Helps Organize Coworker Carpooling

- ✅ Logs the gas cost as a recurring weekly expense
- ✅ Splits it precisely by the number of riders in each trip, including the driver
- ✅ Automatic reminders when the weekly or monthly collection is due
- ✅ A clear record of who has and hasn't paid their share
- ✅ A separate group for each commute route (work, university)

## Frequently Asked Questions

### How much does gas cost for a daily 30 km commute?
At a consumption rate of 7 liters per 100 km and 2.33 SAR per liter, the daily trip costs roughly 4.9 SAR, or about 24.5 SAR per week for the car.

### Does the driver pay the same amount as a passenger?
Usually yes, at the same rate, since the fuel cost is the same regardless of who's driving. Some groups add a small extra percentage for the driver to cover maintenance.

### What's the alternative if we don't want to deal with money every week?
A driving rotation — each person drives their own car for a week at a time — eliminates the need for any money transfers because the cost balances out automatically over time.

## Conclusion

A daily coworker carpool saves money and time, but it needs a clear system for calculating gas costs so it doesn't turn into a daily source of awkwardness. Calculate the real cost, log it as a recurring expense, or switch to a driving rotation to avoid the math altogether.

**Try Diviso now and organize your daily carpool costs with zero hassle.**
    `
  },
  {
    slug: "split-chalet-istirahah-rental-costs",
    title: "كيف تقسم تكلفة استئجار الشاليه أو الاستراحة مع الشباب؟",
    titleEn: "How to Split the Cost of Renting a Chalet or Istirahah With Your Group",
    description: "دليل عملي لتقسيم تكلفة استئجار الشاليه أو الاستراحة بين الشباب، وكيف تتعامل مع التأمين القابل للاسترداد ونصيب من يحضر ليلة واحدة فقط.",
    descriptionEn: "A practical guide to splitting the cost of renting a chalet or istirahah among a group, including how to handle the refundable deposit and members who only stay one night.",
    keywords: ["تقسيم تكلفة الشاليه", "حجز استراحة مع الشباب", "كم نصيبي في الشاليه", "تقسيم فلوس الاستراحة", "مصاريف تأجير شاليه", "حجز شاليه جماعي"],
    keywordsEn: ["how to split chalet rental cost", "split istirahah rental with friends", "group chalet booking expense calculator", "vacation rental deposit split", "weekend getaway cost splitter", "split cabin rental cost with friends"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-08-28",
    content: `
## الإجابة المختصرة

أفضل طريقة لتقسيم تكلفة استئجار الشاليه أو الاستراحة هي جمع تكلفة الإيجار الكامل + التأمين القابل للاسترداد، ثم قسمتها على عدد الحاضرين الفعليين، مع تعديل نصيب من يحضر ليلة واحدة فقط بدل الليالي كاملة. التأمين يُعاد توزيعه على الجميع بعد استرجاعه من المالك، ولا يُحسب كمصروف نهائي إلا إذا اقتُطع منه بسبب أضرار.

## ليش تقسيم تكلفة الشاليه مختلف عن الكشتة أو الفندق؟

استئجار الشاليه أو الاستراحة له خصوصية عن باقي أنواع الرحلات الجماعية:

- **دفعة مقدمة كبيرة**: عادة يُطلب دفع كامل المبلغ أو نسبة كبيرة منه مقدماً لحجز التاريخ
- **تأمين قابل للاسترداد**: مبلغ إضافي (عادة 200-500 ريال) يُرد بعد التأكد من سلامة الشاليه
- **اختلاف مدة الحضور**: البعض يحضر الليلتين، والبعض يجي ليلة وحدة بس
- **مصاريف إضافية مشتركة**: فحم، طعام، ألعاب مائية إذا فيه مسبح — تُضاف فوق إيجار الشاليه نفسه

## كيف تحسب نصيب كل شخص بدقة؟

### مثال 1: الجميع يحضر نفس المدة
لو الشاليه بـ900 ريال لليلة الواحدة، والحجز ليلتين = 1800 ريال، بالإضافة إلى تأمين 300 ريال قابل للاسترداد، فالمجموع المطلوب مقدماً = 2100 ريال. لو المجموعة 6 أشخاص وكلهم باقون الليلتين، فنصيب كل واحد = 2100 ÷ 6 = 350 ريال.

بعد انتهاء الإقامة وإرجاع التأمين كاملاً من المالك، يُعاد توزيع الـ300 ريال على الجميع = 50 ريال لكل شخص، فتصبح التكلفة الفعلية النهائية لكل واحد = 300 ريال فقط (نصيبه من الإيجار بدون التأمين).

### مثال 2: حضور متفاوت
لو 4 أشخاص حضروا الليلتين و2 حضروا ليلة وحدة فقط من أصل نفس الشاليه بـ1800 ريال إيجار:
احسب "ليالي الشخص" الإجمالية: (4 × 2) + (2 × 1) = 10 ليالي-شخص.
تكلفة الليلة-شخص = 1800 ÷ 10 = 180 ريال.
من حضر الليلتين يدفع 360 ريال، ومن حضر ليلة وحدة يدفع 180 ريال فقط.

## كيف تدير التأمين القابل للاسترداد بذكاء؟

- **اجمعه مع الإيجار من البداية** ولا تتركه لآخر لحظة
- **سجّله كبند منفصل** في تطبيق تتبع المصاريف حتى تعرف بالضبط كم يجب أن يُرد
- **وزّعه فوراً بعد استرداده** من المالك خلال أيام من انتهاء الإقامة
- **إذا اقتُطع جزء منه** بسبب ضرر، وضّح من المسؤول قبل قسمة الخصم على الجميع

## خطوات عملية لتنظيم حجز الشاليه

### قبل الحجز
1. حددوا الميزانية التقريبية للفرد
2. اجمعوا المبلغ من كل شخص مسبقاً قبل الدفع للمالك
3. حددوا من سيحضر كم ليلة بالضبط

### أثناء الإقامة
1. سجّلوا أي مصروف إضافي فوراً (فحم، طعام، تنظيف)
2. صوروا حالة الشاليه عند الوصول لحماية التأمين

### بعد المغادرة
1. تابعوا استرداد التأمين من المالك
2. وزّعوا التأمين المُسترد على الجميع
3. راجعوا كل المصاريف الإضافية وسوّوا الحسابات النهائية

## أخطاء شائعة تفسد حجز الشاليه الجماعي

- **نسيان تتبع التأمين**: يضيع وسط باقي المصاريف ولا أحد يتابع استرداده
- **القسمة بالتساوي رغم اختلاف عدد الليالي**: يشعر من حضر ليلة وحدة بالظلم
- **عدم تسجيل المصاريف الإضافية فوراً**: الفحم والطعام يُنسى ولا يُحتسب
- **الاعتماد على شخص واحد يحفظ كل الفواتير**: يصعب المراجعة لاحقاً

## كيف يساعدك Diviso في تنظيم حجز الشاليه؟

- ✅ تسجيل الإيجار والتأمين كبندين منفصلين واضحين
- ✅ تقسيم مخصص حسب عدد الليالي لكل شخص وليس بالتساوي فقط
- ✅ تصنيف المصاريف الإضافية (طعام، فحم، تنظيف) لكل رحلة
- ✅ حساب تلقائي لإعادة توزيع التأمين بعد استرداده
- ✅ سجل واضح يوضح من دفع ومن باقي عليه مبلغ

## أسئلة شائعة

### هل يدفع التأمين نفسه من حضر الشاليه أم يُحسب ضمن الإيجار؟
التأمين يُجمع مع الإيجار مقدماً كجزء من المبلغ المطلوب، لكنه يبقى منفصلاً محاسبياً لأنه يُرد لاحقاً، بعكس الإيجار الذي يُعتبر مصروفاً نهائياً.

### كيف أحسب نصيب شخص حضر ليلة واحدة فقط من أصل ليلتين؟
اقسم إجمالي الإيجار على مجموع "ليالي الشخص" (عدد الأشخاص × الليالي لكل واحد)، ثم اضرب الناتج في عدد الليالي التي حضرها كل فرد فعلياً.

### ماذا يحدث لو اقتُطع جزء من التأمين بسبب ضرر في الشاليه؟
حدّدوا أولاً إن كان الضرر بسبب شخص معين يتحمله وحده، أو ضرر عام يُقسّم على الجميع بنفس نسبة تقسيم الإيجار الأصلية.

## الخلاصة

استئجار الشاليه أو الاستراحة يفسده غالباً سوء تتبع التأمين واختلاف عدد الليالي بين الحاضرين، لا الإيجار نفسه. اجمعوا المبلغ مقدماً، سجّلوا كل بند بوضوح، ووزّعوا التأمين فور استرداده.

**جرب Diviso الآن ونظّم حجز الشاليه القادم بدون أي التباس في الحسابات.**
    `,
    contentEn: `
## Quick Answer

The fairest way to split the cost of renting a chalet or istirahah is to add the full rental price plus the refundable security deposit, then divide that by the number of actual attendees, adjusting the share for anyone who only stays one night instead of the full booking. The deposit should be redistributed among everyone once it's returned by the owner, and only counts as a real cost if part of it is withheld for damages.

## Why Splitting a Chalet Rental Is Different From Camping or a Hotel

Renting a chalet or istirahah has quirks that other group getaways don't:

- **A large upfront payment**: owners typically require the full amount, or a large portion of it, paid in advance to hold the date
- **A refundable security deposit**: an extra amount (commonly 200-500 SAR) returned after the property is confirmed undamaged
- **Uneven length of stay**: some people stay both nights, others come for just one
- **Shared extra costs**: charcoal, food, and pool activities add on top of the base rental price

## How to Calculate Each Person's Exact Share

### Example 1: Everyone Stays the Same Length
If the chalet costs 900 SAR per night and you book two nights = 1,800 SAR, plus a refundable deposit of 300 SAR, the total due upfront is 2,100 SAR. With a group of 6 people all staying both nights, each person's share is 2,100 ÷ 6 = 350 SAR.

Once the stay ends and the owner returns the full deposit, redistribute that 300 SAR among everyone (50 SAR each), bringing the actual final cost per person down to 300 SAR — just their share of the rental, minus the deposit.

### Example 2: Uneven Attendance
Say 4 people stay both nights and 2 people stay just one night, out of the same 1,800 SAR rental:
Calculate total "person-nights": (4 × 2) + (2 × 1) = 10 person-nights.
Cost per person-night = 1,800 ÷ 10 = 180 SAR.
Those staying both nights pay 360 SAR, and those staying one night pay just 180 SAR.

## How to Manage the Refundable Deposit Properly

- **Collect it together with the rental upfront** — don't leave it until the last minute
- **Log it as a separate line item** in your expense tracker so you know exactly how much should come back
- **Redistribute it immediately** once the owner returns it, within days of checkout
- **If part of it is withheld** for damage, determine who's responsible before splitting the deduction among everyone

## A Practical System for Booking a Chalet

### Before Booking
1. Agree on a rough per-person budget
2. Collect the money from everyone before paying the owner
3. Confirm exactly how many nights each person will stay

### During the Stay
1. Log any extra expense immediately (charcoal, food, cleaning)
2. Photograph the chalet's condition on arrival to protect the deposit

### After Checkout
1. Follow up on the deposit refund from the owner
2. Redistribute the returned deposit among everyone
3. Review all extra expenses and do the final settlement

## Common Mistakes That Ruin a Group Chalet Booking

- **Forgetting to track the deposit**: it gets lost among other expenses and nobody follows up on getting it back
- **Splitting equally despite different lengths of stay**: whoever stayed one night feels shortchanged
- **Not logging extras immediately**: charcoal and food get forgotten and never counted
- **Relying on one person to keep every receipt**: makes reviewing the bill later difficult

## How Diviso Helps Organize a Chalet Booking

- ✅ Logs the rental and the deposit as two clear, separate line items
- ✅ Custom splitting by number of nights per person, not just an equal split
- ✅ Categorizes extra expenses (food, charcoal, cleaning) per trip
- ✅ Automatically recalculates the redistribution once the deposit is refunded
- ✅ A clear record of who paid and who still owes

## Frequently Asked Questions

### Does the person who stays pay the deposit themselves, or is it counted with the rental?
The deposit is collected upfront together with the rental as part of the total due, but it stays accounted for separately since it's refundable later, unlike the rental which is a final cost.

### How do I calculate the share for someone who only stayed one night out of two?
Divide the total rental cost by the sum of "person-nights" (number of people × nights each stayed), then multiply that per-person-night rate by the number of nights each individual actually stayed.

### What happens if part of the deposit is withheld for damage?
First determine whether the damage was caused by one specific person, who bears it alone, or if it's general wear split among everyone using the same ratio as the original rental split.

## Conclusion

A chalet or istirahah rental usually gets messed up by poor deposit tracking and uneven lengths of stay, not the rental cost itself. Collect the money upfront, log every line item clearly, and redistribute the deposit as soon as it's refunded.

**Try Diviso now and organize your next chalet booking without any confusion over the money.**
    `
  },
  {
    slug: "split-padel-court-booking-costs",
    title: "كيف تقسم تكلفة حجز ملعب البادل أو كرة القدم الأسبوعي مع الشلة؟",
    titleEn: "How to Split the Cost of a Weekly Padel or Football Court Booking With Your Group",
    description: "دليل عملي لتقسيم تكلفة حجز ملعب البادل أو كرة القدم الأسبوعي بين أعضاء الشلة، مع طريقة عادلة للتعامل مع الغياب وحساب نصيب كل شخص بدقة.",
    descriptionEn: "A practical guide to splitting the weekly cost of a padel or football court booking among your group, including a fair way to handle no-shows and calculate everyone's share.",
    keywords: ["تقسيم تكلفة حجز الملعب", "حجز ملعب بادل أسبوعي", "تقسيم فلوس الملعب", "من يدفع إذا ما حضر", "تكلفة حجز كرة القدم", "تقسيم مصاريف الرياضة الجماعية"],
    keywordsEn: ["how to split padel court cost", "split football court booking cost", "weekly sports court expense splitter", "who pays if someone misses booking", "recurring court booking cost calculator", "group sports expense tracker app"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-08-27",
    content: `
## الإجابة المختصرة

أفضل طريقة لتقسيم تكلفة حجز ملعب البادل أو كرة القدم الأسبوعي هي قسمة سعر الساعة على عدد اللاعبين الثابتين في المجموعة، وليس على عدد من حضر فعلياً في كل مرة. الغائب يدفع نصيبه كاملاً لأنه "يحجز مكانه" في الفريق، إلا إذا وجد بديلاً يدفع عنه. هذا النظام يمنع خلافات "ليش أدفع وأنا ما جيت؟" ويخلي الحجز الأسبوعي مستمراً بدون توقف.

## ليش حجز الملعب الأسبوعي يحتاج نظام تقسيم خاص؟

حجز الملعب يختلف عن مصروف العشاء أو الرحلة لأنه **مصروف متكرر بحضور متغير**:

- **الحجز ثابت لكن الحضور متذبذب**: تحجزون كل خميس، لكن ما يحضر نفس العدد كل مرة
- **الملعب يُدفع كامل بغض النظر عن الحضور**: لو حجزتوا لـ10 وحضر 7، السعر ما يتغير
- **الغياب المفاجئ**: أحدهم يعتذر قبل ساعة، والحجز صار ملزماً
- **البدلاء**: أحياناً يجيب شخص غائب بديلاً عنه من برا المجموعة

## كيف تحسب نصيب كل شخص بدقة؟

### الطريقة الأساسية: القسمة على عدد اللاعبين الثابتين
لو تكلفة ساعة ملعب البادل 200 ريال، والمجموعة الثابتة 4 لاعبين، فنصيب كل واحد = 200 ÷ 4 = 50 ريال أسبوعياً، بغض النظر عمّن حضر فعلياً.

### مثال ملعب كرة القدم (خماسي)
تكلفة الساعة 250 ريال، والمجموعة 8 لاعبين ثابتين → نصيب كل واحد = 250 ÷ 8 ≈ 31.25 ريال أسبوعياً.

### إذا انضم لاعب إضافي لمرة واحدة
لو صديق زائر لعب معكم مرة واحدة، يمكن تحصيل نصيبه فقط لتلك الجلسة وتخفيف نصيب الباقين قليلاً لنفس الأسبوع، بدل تعديل النظام الثابت بالكامل.

## سياسات التعامل مع الغياب

### السياسة 1: الغائب يدفع كامل نصيبه (الأكثر شيوعاً)
لأن الحجز يُدفع للملعب سواء حضر أو لا، فمن العدل أن يدفع كل عضو ثابت نصيبه كل أسبوع، حتى لو غاب.

### السياسة 2: إعفاء بشرط الإشعار المسبق
لو أعلن الغائب قبل 24 ساعة على الأقل، يُعفى من نصيبه ويُعاد توزيعه على الحاضرين فقط.

### السياسة 3: البديل يدفع بدل الغائب
لو جاب الغائب شخص بديل، فالبديل يدفع النصيب وليس الغائب.

اختاروا سياسة واحدة واثبتوها من البداية لتجنب الجدال الأسبوعي.

## خطوات عملية لتنظيم حجز الملعب الأسبوعي

### الخطوة 1: حددوا المجموعة الثابتة
اتفقوا من البداية على عدد اللاعبين الأساسيين اللي يتقاسمون التكلفة كل أسبوع.

### الخطوة 2: سجّلوا الحجز كمصروف متكرر
بدل تسجيل المصروف يدوياً كل أسبوع، استخدم تطبيق مثل Diviso لتسجيل حجز الملعب كمصروف أسبوعي متكرر يُذكّر الجميع تلقائياً.

### الخطوة 3: اتفقوا على سياسة الغياب مسبقاً
سواء دفع كامل، إعفاء بإشعار، أو بديل يدفع — اكتبوها في وصف المجموعة حتى ما ينساها أحد.

### الخطوة 4: راجعوا الأرصدة شهرياً
تأكدوا إن كل الأعضاء دافعين نصيبهم أولاً بأول، ولا تخلّوا المتأخرات تتراكم لشهرين أو ثلاثة.

## أخطاء شائعة تفسد حجز الملعب الأسبوعي

- **القسمة على عدد الحاضرين فقط**: يخلي نصيب كل شخص يتغير كل أسبوع ويصير محيّر
- **عدم وجود سياسة غياب واضحة**: كل أسبوع نقاش جديد "أنا ما جيت ليش أدفع؟"
- **الاعتماد على شخص واحد يحصّل الفلوس يدوياً**: يتعب ويصير عرضة للنسيان
- **عدم تسجيل من دفع فعلاً**: يصعب معرفة المتأخرين بعد شهر

## كيف يساعدك Diviso في تنظيم حجز الملعب؟

- ✅ تسجيل حجز الملعب كمصروف أسبوعي متكرر تلقائياً
- ✅ حساب نصيب كل عضو ثابت بدقة دون الحاجة لإعادة القسمة يدوياً
- ✅ تتبع من دفع ومن لم يدفع بعد لكل أسبوع
- ✅ تذكيرات تلقائية قبل موعد التحصيل
- ✅ سجل واضح يوضح تاريخ كل حجز ومن شارك فيه

## أسئلة شائعة

### هل يدفع الغائب نفس مبلغ الحاضر في حجز الملعب الأسبوعي؟
نعم في أغلب المجموعات، لأن الملعب يُدفع بالكامل بغض النظر عن الحضور. الاستثناء الوحيد هو لو اتفقتم مسبقاً على إعفاء الغياب المُعلن قبل مدة كافية.

### كيف نحسب نصيب كل لاعب في حجز ملعب البادل؟
اقسم سعر الساعة الكامل على عدد اللاعبين الثابتين في المجموعة، وليس على عدد من حضر تلك الجلسة بالذات، إلا إذا اتفقتم على نظام إعفاء واضح.

### ماذا لو أحضر أحد اللاعبين ضيفاً معه لمرة واحدة؟
حصّلوا نصيب الضيف لتلك الجلسة فقط، ويمكن تخفيف نصيب باقي الأعضاء الثابتين قليلاً لنفس الأسبوع دون تغيير النظام الأساسي.

## الخلاصة

حجز الملعب الأسبوعي يستمر بدون مشاكل لما تتفقون على قاعدة واضحة لتقسيم التكلفة وسياسة ثابتة للغياب من أول يوم. سجّلوه كمصروف متكرر في تطبيق يتابع الأرصدة تلقائياً، وخلّوا كل تركيزكم على اللعب لا على الحسابات.

**جرب Diviso الآن ونظّم حجز ملعبكم الأسبوعي بدون صداع الحسابات.**
    `,
    contentEn: `
## Quick Answer

The fairest way to split a recurring weekly padel or football court booking is to divide the hourly cost by the number of regular players in the group, not by however many actually show up each week. Someone who's absent still pays their full share because they're holding a spot on the team, unless they send a substitute who pays instead. This system stops the recurring "why do I have to pay if I didn't come?" argument and keeps the weekly booking running smoothly.

## Why a Weekly Court Booking Needs Its Own Splitting System

Booking a court is different from a one-off dinner or trip expense because it's a **recurring cost with variable attendance**:

- **The booking is fixed, but attendance fluctuates**: you book every Thursday, but the same number of people rarely show up
- **The court gets paid in full regardless of attendance**: if you booked for 10 and only 7 show up, the price stays the same
- **Last-minute cancellations happen**: someone bails an hour before, but the booking is already committed
- **Substitutes**: sometimes an absent player brings in a replacement from outside the group

## How to Calculate Each Player's Exact Share

### The Basic Method: Divide by the Number of Regular Players
If an hour on a padel court costs 200 SAR and the regular group is 4 players, each person's share is 200 ÷ 4 = 50 SAR per week, regardless of who actually shows up.

### Football (Five-a-Side) Example
The court costs 250 SAR per hour with a group of 8 regular players → each person's share is 250 ÷ 8 ≈ 31.25 SAR per week.

### When an Extra Player Joins for One Session
If a visiting friend plays with you just once, you can collect their share only for that session and slightly reduce everyone else's share for that week, instead of overhauling the fixed system.

## Policies for Handling No-Shows

### Policy 1: The Absent Player Pays Their Full Share (Most Common)
Since the court is paid in full whether someone attends or not, it's fair for every regular member to pay their share every week, even when absent.

### Policy 2: Exemption With Advance Notice
If a player gives at least 24 hours' notice, they're exempted from that week's share, and the cost is redistributed only among those who attend.

### Policy 3: The Substitute Pays Instead of the Absent Player
If the absent player brings in a replacement, the substitute pays the share instead of the original player.

Pick one policy and set it in stone from day one to avoid a weekly argument.

## A Practical System for Running the Weekly Booking

### Step 1: Define the Regular Group
Agree upfront on the core group of players who share the cost every week.

### Step 2: Log the Booking as a Recurring Expense
Instead of manually re-adding the expense every week, use an app like Diviso to log the court booking as a recurring weekly expense that automatically reminds everyone.

### Step 3: Agree on the No-Show Policy in Advance
Whether it's full payment, notice-based exemption, or substitute-pays — write it into the group description so nobody forgets it.

### Step 4: Review Balances Monthly
Make sure every member is paying their share on time, and don't let unpaid balances pile up for two or three months.

## Common Mistakes That Ruin a Weekly Court Booking

- **Splitting only among those who showed up**: makes each person's share change every week and becomes confusing
- **No clear no-show policy**: a fresh argument every week — "I didn't come, why should I pay?"
- **Relying on one person to collect money manually**: exhausting and prone to being forgotten
- **Not tracking who actually paid**: hard to figure out who's behind after a month

## How Diviso Helps Organize Your Court Booking

- ✅ Logs the court booking as an automatic recurring weekly expense
- ✅ Calculates each regular member's share precisely without manual re-splitting
- ✅ Tracks who has and hasn't paid for each week
- ✅ Automatic reminders before the collection is due
- ✅ A clear record of every booking date and who was included

## Frequently Asked Questions

### Does an absent player pay the same amount as someone who showed up?
Yes, in most groups, because the court is paid in full regardless of attendance. The only exception is if the group has agreed in advance to exempt players who cancel with enough notice.

### How do I calculate each player's share for a padel court booking?
Divide the full hourly rate by the number of regular players in the group, not by however many attended that specific session, unless you've agreed on a clear exemption policy.

### What if a player brings a one-time guest to the session?
Collect the guest's share for that single session only, and you can slightly reduce the regular members' shares for that week without changing the core system.

## Conclusion

A weekly court booking runs smoothly once your group agrees on a clear cost-splitting rule and a fixed no-show policy from day one. Log it as a recurring expense in an app that tracks balances automatically, and keep your focus on the game instead of the math.

**Try Diviso now and run your weekly court booking without the payment headaches.**
    `
  },
  {
    slug: "split-streaming-subscription-costs",
    title: "كيف تقسم اشتراكات نتفلكس وسبوتيفاي مع العائلة والأصدقاء؟",
    titleEn: "How to Split Netflix, Spotify, and Streaming Subscription Costs With Friends and Family",
    description: "أفضل طريقة لتقسيم تكلفة اشتراكات نتفلكس وسبوتيفاي وشاهد VIP بين أفراد العائلة أو الأصدقاء، مع أمثلة حساب دقيقة لنصيب كل شخص وطرق لتجنب نسيان الدفع الشهري.",
    descriptionEn: "Learn the fairest way to split Netflix, Spotify, and other streaming subscription costs with family or friends, with exact per-person math and tips to never miss a monthly payment.",
    keywords: ["تقسيم اشتراك نتفلكس", "تقسيم اشتراكات مشتركة", "اشتراك عائلي مشترك", "تقسيم اشتراك سبوتيفاي", "حساب نصيب الاشتراك الشهري", "اشتراكات مشتركة مع الأصدقاء", "تقسيم اشتراك شاهد VIP"],
    keywordsEn: ["how to split netflix subscription cost", "split streaming subscriptions with friends", "shared family plan cost calculator", "split spotify family plan cost", "recurring subscription expense splitter", "how much does each person pay for shared netflix", "shared subscription tracker app"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-08-26",
    content: `
## الإجابة المختصرة

أفضل طريقة لتقسيم اشتراكات نتفلكس وسبوتيفاي وغيرها من الاشتراكات المشتركة هي قسمة تكلفة الاشتراك الشهري على عدد المستخدمين الفعليين، ثم تحصيل نصيب كل شخص في نفس تاريخ التجديد كل شهر عبر تطبيق يسجّل المصروف كمصروف متكرر تلقائياً. هذا يمنع نسيان الدفع، ويوقف الجدال المتكرر حول "مين دفع الشهر هذا؟".

## ليش تقسيم الاشتراكات صعب أكثر من مصاريف الطلعة العادية؟

المصروف العادي (عشاء، رحلة) يحصل مرة وينتهي. لكن الاشتراك المشترك يتكرر كل شهر، وهذا يخلق مشاكل خاصة:

- **النسيان الشهري**: الشخص المسؤول عن الدفع ينسى يطالب الباقين
- **تغيّر عدد المستخدمين**: شخص يخرج من المجموعة وما يحدّث أحد النصيب
- **اختلاف الاستخدام**: البعض يستخدم شاشتين والبعض شاشة وحدة
- **تراكم عدة اشتراكات**: نتفلكس + سبوتيفاي + شاهد = 3 حسابات منفصلة تحتاج تتبع

## أنواع الاشتراكات اللي يتم تقسيمها عادة

### 1. خدمات المشاهدة (نتفلكس، شاهد VIP، OSN+)
عادة تُشترى بخطة "عائلية" أو "بريميوم" تسمح بعدة شاشات في نفس الوقت.

### 2. خدمات الموسيقى (سبوتيفاي عائلي، أنغامي)
خطة العائلة تسمح لعدد محدد من الحسابات المنفصلة بسعر أقل من الاشتراك الفردي المكرر.

### 3. الاشتراكات الرياضية (نادي جيم، حجز ملعب أسبوعي)
مصروف شهري ثابت يُقسّم على عدد أعضاء المجموعة الثابتين.

### 4. التخزين السحابي والألعاب (iCloud+، Xbox Game Pass، PlayStation Plus)
خطط عائلية تُشارك بين عدة حسابات بسعر موحّد.

## كيف تحسب نصيب كل شخص بدقة؟

القاعدة بسيطة: **تكلفة الاشتراك الشهري ÷ عدد المستخدمين = نصيب الفرد**.

مثال: لو خطة نتفلكس العائلية تكلف 65 ريال شهرياً ويستخدمها 4 أشخاص (شاشات)، فنصيب كل واحد = 65 ÷ 4 = 16.25 ريال شهرياً.

مثال آخر: خطة سبوتيفاي العائلية تكلف تقريباً 35 ريال شهرياً وتُشارك بين 6 أشخاص، فنصيب كل واحد = 35 ÷ 6 ≈ 5.8 ريال شهرياً.

إذا كان الاستخدام غير متساوٍ (مثلاً شخص يستخدم شاشتين من أصل 4)، يمكن تعديل القسمة حسب عدد الشاشات المستخدمة بدلاً من القسمة المتساوية.

## خطوات عملية لتقسيم الاشتراكات بدون صداع

### الخطوة 1: اتفقوا على المسؤول عن الدفع
شخص واحد يدفع فاتورة الاشتراك كل شهر من بطاقته، والباقون يحوّلون له نصيبهم.

### الخطوة 2: سجّلوا الاشتراك كمصروف متكرر
بدل ما تسجّل المصروف يدوياً كل شهر، استخدم تطبيق مثل Diviso لتسجيل الاشتراك كمصروف متكرر يذكّر الجميع تلقائياً في نفس تاريخ التجديد.

### الخطوة 3: حدّدوا طريقة القسمة من البداية
متساوية بين الجميع، أو حسب عدد الشاشات/الحسابات الفعلية لكل شخص.

### الخطوة 4: راجعوا القائمة كل 3 أشهر
تأكدوا إن كل من يدفع لسا يستخدم الاشتراك، وأزيلوا أي شخص انسحب من المجموعة.

## أخطاء شائعة عند تقسيم الاشتراكات

- **الاعتماد على الذاكرة**: بعد شهرين الكل ينسى مين دفع ومين لأ
- **عدم تحديث القائمة**: شخص ترك الشلة لكن لسا مسجل في التقسيم
- **خلط عدة اشتراكات مع بعض**: نتفلكس وسبوتيفاي والجيم بدون فصل واضح لكل واحد
- **تأجيل التحصيل**: كل ما تأخرت المطالبة، زاد الإحراج

## كيف يساعدك Diviso في تتبع الاشتراكات المشتركة؟

- ✅ تسجيل الاشتراك كمصروف شهري متكرر بضغطة واحدة
- ✅ تذكير تلقائي لكل عضو في تاريخ التجديد
- ✅ حساب نصيب كل شخص تلقائياً حتى لو كان الاستخدام غير متساوٍ
- ✅ سجل واضح يوضح من دفع ومن عليه مبلغ
- ✅ مجموعة منفصلة لكل نوع اشتراك (ترفيه، رياضة، تخزين)

## أسئلة شائعة

### كم نصيبي إذا كنا 4 أشخاص في اشتراك نتفلكس بـ65 ريال؟
نصيبك الشهري = 65 ÷ 4 = 16.25 ريال، ما لم تتفقوا على قسمة غير متساوية حسب عدد الشاشات المستخدمة.

### هل يجب أن يدفع الجميع نفس المبلغ حتى لو استخدم أحدهم شاشتين؟
لا بالضرورة. يمكنكم قسمة التكلفة حسب عدد الشاشات أو الحسابات الفرعية التي يستخدمها كل شخص بدلاً من التقسيم المتساوي البحت.

### كيف أتجنب نسيان تحصيل نصيب الاشتراك كل شهر؟
سجّل الاشتراك كمصروف متكرر في تطبيق تقسيم مصاريف مثل Diviso، وسيُذكّر جميع الأعضاء تلقائياً في نفس تاريخ التجديد كل شهر.

## الخلاصة

الاشتراكات المشتركة توفر فلوس، لكنها تحتاج نظام واضح حتى لا تتحول إلى مصدر إزعاج شهري. اتفقوا على طريقة القسمة، سجّلوا الاشتراك كمصروف متكرر، وخلّوا التطبيق يذكّر الجميع بدل ما تصير أنت المسؤول عن المطالبة كل شهر.

**جرب Diviso الآن وسجّل اشتراكاتك المشتركة كمصاريف متكررة بدون نسيان.**
    `,
    contentEn: `
## Quick Answer

The fairest way to split Netflix, Spotify, and other shared subscriptions is to divide the monthly subscription cost by the number of actual users, then collect each person's share on the same renewal date every month using an app that logs the subscription as a recurring expense. This removes the guesswork and stops the monthly "wait, did I already pay for this?" awkwardness.

## Why Splitting Subscriptions Is Harder Than a One-Time Bill

A restaurant bill or a trip expense happens once and is done. A shared subscription repeats every single month, which creates its own set of problems:

- **Monthly forgetfulness**: the person who pays the bill forgets to collect from everyone else
- **Changing group size**: someone leaves the group, but nobody updates the split
- **Uneven usage**: some people use two screens, others use one
- **Multiple subscriptions stacking up**: Netflix + Spotify + a shared gym membership become three separate things to track

## Common Types of Subscriptions People Split

### 1. Streaming Video (Netflix, Shahid VIP, OSN+)
Usually bought as a "Family" or "Premium" plan that allows several simultaneous screens.

### 2. Music Streaming (Spotify Family, Anghami)
A family plan lets several separate accounts join at a lower combined cost than paying individually.

### 3. Fitness Memberships and Recurring Bookings
A gym membership or a weekly sports-court booking is a fixed monthly cost split across a set group.

### 4. Cloud Storage and Gaming (iCloud+, Xbox Game Pass, PlayStation Plus)
Family plans let multiple accounts share one subscription at a single combined price.

## How to Calculate Each Person's Exact Share

The formula is simple: **monthly subscription cost ÷ number of users = each person's share**.

Example: if a Netflix family plan costs 65 SAR per month and is shared by 4 people (screens), each person's share is 65 ÷ 4 = 16.25 SAR per month.

Another example: a Spotify family plan costing roughly 35 SAR per month split across 6 people works out to 35 ÷ 6 ≈ 5.8 SAR per person, per month.

If usage isn't equal (say, one person uses two of the four available screens), you can adjust the split proportionally by screens used instead of splitting it perfectly evenly.

## A Practical Step-by-Step System

### Step 1: Agree on Who Pays the Provider
One person's card is charged by Netflix or Spotify each month, and everyone else transfers their share to that person.

### Step 2: Log the Subscription as a Recurring Expense
Instead of manually re-adding the expense every month, use an app like Diviso to log the subscription once as a recurring expense that automatically reminds everyone on the same renewal date.

### Step 3: Decide the Split Method Upfront
Equal split among everyone, or proportional based on the number of screens or sub-accounts each person actually uses.

### Step 4: Review the Group Every Few Months
Confirm everyone still paying is still using the service, and remove anyone who has dropped out of the group.

## Common Mistakes When Splitting Subscriptions

- **Relying on memory**: after a couple of months, nobody remembers who paid and who didn't
- **Not updating the list**: someone leaves the friend group but stays listed in the split
- **Mixing multiple subscriptions together**: Netflix, Spotify, and gym costs blended with no clear per-service breakdown
- **Delaying collection**: the longer you wait to ask, the more awkward it becomes

## How Diviso Helps Track Shared Subscriptions

- ✅ Log a subscription as a recurring monthly expense in one tap
- ✅ Automatic reminders for every member on the renewal date
- ✅ Calculates each person's share automatically, even with uneven usage
- ✅ A clear record of who paid and who still owes
- ✅ Separate groups for each subscription type (entertainment, fitness, storage)

## Frequently Asked Questions

### How much do I owe if 4 people share a 65 SAR Netflix plan?
Your monthly share is 65 ÷ 4 = 16.25 SAR, unless you've agreed on an uneven split based on how many screens each person actually uses.

### Should everyone pay the same amount even if one person uses two screens?
Not necessarily. You can split the cost proportionally by the number of screens or sub-accounts each person uses instead of a strictly equal split.

### How do I stop forgetting to collect the subscription payment every month?
Log the subscription as a recurring expense in a splitting app like Diviso — it automatically reminds every member on the same renewal date each month, so no one has to chase payments manually.

## Conclusion

Shared subscriptions save money, but without a clear system they turn into a monthly annoyance. Agree on a split method, log the subscription as a recurring expense, and let the app handle the reminders instead of you being the one who has to ask for money every month.

**Try Diviso now and log your shared subscriptions as recurring expenses so nobody forgets to pay.**
    `
  },
  {
    slug: "travel-expenses-guide",
    title: "كيف تقسم مصاريف السفر مع الأصدقاء بذكاء",
    titleEn: "How to Split Travel Expenses with Friends Smartly",
    description: "دليل شامل لتقسيم مصاريف الرحلات والسفر بين الأصدقاء بدون مشاكل أو إحراج",
    descriptionEn: "A comprehensive guide to splitting travel expenses among friends without issues",
    keywords: ["تقسيم مصاريف السفر", "مصاريف الرحلات", "حساب المصاريف", "السفر مع الأصدقاء", "تقسيم الفاتورة"],
    keywordsEn: ["split travel expenses", "trip costs calculator", "travel with friends expenses", "expense sharing app", "how to split travel costs with friends", "group travel expense tracker", "travel budget splitter"],
    category: "guides",
    readTime: 8,
    publishDate: "2026-01-07",
    content: `
## مقدمة

السفر مع الأصدقاء من أجمل التجارب، لكن تقسيم المصاريف قد يكون مصدر إحراج وخلافات. في هذا الدليل، نشرح كيف تتجنب هذه المشاكل.

## لماذا تقسيم المصاريف مهم؟

- **تجنب الإحراج**: لا أحد يحب المواقف المحرجة عند الدفع
- **العدالة**: الجميع يدفع نصيبه العادل
- **الحفاظ على الصداقة**: المال قد يفسد العلاقات إذا لم يُدار بشكل صحيح

## 5 طرق لتقسيم مصاريف السفر

### 1. التقسيم المتساوي
أبسط طريقة - قسّم المجموع على عدد الأشخاص. مناسبة عندما تكون المصاريف متقاربة.

### 2. كل شخص يدفع ما استهلكه
مناسبة عندما تختلف الاستهلاكات بشكل كبير (مثلاً: غرفة مفردة vs مشتركة).

### 3. صندوق مشترك
يضع الجميع مبلغاً متساوياً في صندوق مشترك ويُصرف منه.

### 4. التناوب على الدفع
كل شخص يدفع وجبة أو نشاط معين بالتناوب.

### 5. استخدام تطبيق ذكي
الطريقة الأفضل - تطبيق يتتبع كل شيء تلقائياً.

## كيف يساعدك Diviso؟

- ✅ تسجيل المصاريف فوراً
- ✅ حساب تلقائي لنصيب كل شخص
- ✅ إشعارات للتذكير بالتسوية
- ✅ تقارير مفصلة
- ✅ دعم كامل للعربية والريال السعودي

## نصائح ذهبية

1. **اتفقوا مسبقاً** على طريقة التقسيم
2. **سجلوا كل مصروف** فور حدوثه
3. **سووا الحسابات يومياً** لتجنب التراكم
4. **استخدموا تطبيق موحد** يراه الجميع

## الخلاصة

تقسيم المصاريف لا يجب أن يكون معقداً. مع التخطيط المسبق والأداة المناسبة، ستستمتع برحلتك بدون قلق مالي.

**جرب Diviso مجاناً** وابدأ رحلتك القادمة بدون هموم مالية!
    `,
    contentEn: `
## Introduction

Traveling with friends is one of the best experiences, but splitting expenses can be a source of awkwardness and disputes. In this guide, we explain how to avoid these problems.

## Why is Expense Splitting Important?

- **Avoid embarrassment**: No one likes awkward payment situations
- **Fairness**: Everyone pays their fair share
- **Preserve friendships**: Money can ruin relationships if not managed properly

## 5 Ways to Split Travel Expenses

### 1. Equal Split
The simplest method - divide the total by the number of people. Suitable when expenses are similar.

### 2. Pay What You Consume
Suitable when consumption differs significantly (e.g., single room vs shared).

### 3. Shared Fund
Everyone puts an equal amount in a shared fund and spends from it.

### 4. Taking Turns
Each person pays for a meal or activity in turns.

### 5. Using a Smart App
The best method - an app that tracks everything automatically.

## How Diviso Helps

- ✅ Record expenses instantly
- ✅ Automatic calculation of each person's share
- ✅ Settlement reminder notifications
- ✅ Detailed reports
- ✅ Full support for Arabic and Saudi Riyal

## Golden Tips

1. **Agree in advance** on the splitting method
2. **Record every expense** as it happens
3. **Settle daily** to avoid accumulation
4. **Use a unified app** that everyone can see

## Conclusion

Splitting expenses doesn't have to be complicated. With advance planning and the right tool, you'll enjoy your trip without financial worries.

**Try Diviso for free** and start your next trip worry-free!
    `
  },
  {
    slug: "best-splitting-apps-saudi",
    title: "أفضل تطبيقات تقسيم الفاتورة في السعودية 2026",
    titleEn: "Best Bill Splitting Apps in Saudi Arabia 2026",
    description: "مقارنة شاملة بين أفضل تطبيقات تقسيم المصاريف المتاحة في المملكة العربية السعودية",
    descriptionEn: "Comprehensive comparison of the best expense splitting apps available in Saudi Arabia",
    keywords: ["تطبيقات تقسيم الفاتورة", "أفضل تطبيق حساب المصاريف", "تطبيقات السعودية", "Splitwise بديل"],
    keywordsEn: ["bill splitting apps comparison", "best expense calculator app 2026", "Splitwise alternative free", "best app to split bills with friends", "expense sharing app review"],
    category: "comparisons",
    readTime: 6,
    publishDate: "2026-01-05",
    content: `
## مقدمة

هل تبحث عن أفضل تطبيق لتقسيم المصاريف في السعودية؟ في هذا المقال نقارن بين أشهر التطبيقات المتاحة.

## معايير المقارنة

- دعم اللغة العربية
- دعم الريال السعودي
- سهولة الاستخدام
- الميزات المتاحة
- السعر

## التطبيقات المتاحة

### 1. Diviso ⭐ الأفضل

| الميزة | التقييم |
|--------|---------|
| دعم العربية | ✅ كامل |
| الريال السعودي | ✅ افتراضي |
| واجهة سهلة | ✅ ممتازة |
| مجاني | ✅ نعم |

**المميزات:**
- مصمم خصيصاً للسوق السعودي
- واجهة عربية 100%
- تكامل مع طرق الدفع المحلية
- إشعارات ذكية
- تقارير مفصلة

### 2. Splitwise

| الميزة | التقييم |
|--------|---------|
| دعم العربية | ❌ لا |
| الريال السعودي | ⚠️ جزئي |
| واجهة سهلة | ✅ جيدة |
| مجاني | ⚠️ محدود |

### 3. Tricount

| الميزة | التقييم |
|--------|---------|
| دعم العربية | ❌ لا |
| الريال السعودي | ✅ نعم |
| واجهة سهلة | ✅ جيدة |
| مجاني | ✅ نعم |

## لماذا Diviso الأفضل للسعودية؟

1. **اللغة**: التطبيق الوحيد بواجهة عربية كاملة
2. **العملة**: الريال السعودي افتراضياً
3. **الثقافة**: مصمم لفهم احتياجات المستخدم السعودي
4. **الدعم**: فريق دعم عربي

## الخلاصة

إذا كنت في السعودية، Diviso هو الخيار الأمثل لتقسيم المصاريف مع أصدقائك وعائلتك.

**حمّل Diviso الآن** وجرب الفرق!
    `,
    contentEn: `
## Introduction

Looking for the best expense splitting app in Saudi Arabia? In this article, we compare the most popular available apps.

## Comparison Criteria

- Arabic language support
- Saudi Riyal support
- Ease of use
- Available features
- Price

## Available Apps

### 1. Diviso ⭐ The Best

| Feature | Rating |
|---------|--------|
| Arabic Support | ✅ Full |
| Saudi Riyal | ✅ Default |
| Easy Interface | ✅ Excellent |
| Free | ✅ Yes |

**Features:**
- Designed specifically for the Saudi market
- 100% Arabic interface
- Integration with local payment methods
- Smart notifications
- Detailed reports

### 2. Splitwise

| Feature | Rating |
|---------|--------|
| Arabic Support | ❌ No |
| Saudi Riyal | ⚠️ Partial |
| Easy Interface | ✅ Good |
| Free | ⚠️ Limited |

### 3. Tricount

| Feature | Rating |
|---------|--------|
| Arabic Support | ❌ No |
| Saudi Riyal | ✅ Yes |
| Easy Interface | ✅ Good |
| Free | ✅ Yes |

## Why Diviso is Best for Saudi Arabia?

1. **Language**: The only app with a complete Arabic interface
2. **Currency**: Saudi Riyal by default
3. **Culture**: Designed to understand Saudi user needs
4. **Support**: Arabic support team

## Conclusion

If you're in Saudi Arabia, Diviso is the optimal choice for splitting expenses with friends and family.

**Download Diviso now** and experience the difference!
    `
  },
  {
    slug: "shared-housing-expenses",
    title: "دليل إدارة مصاريف السكن المشترك",
    titleEn: "Guide to Managing Shared Housing Expenses",
    description: "كيف تدير مصاريف السكن المشترك مع الشركاء بدون مشاكل - الإيجار والفواتير والمصاريف اليومية",
    descriptionEn: "How to manage shared housing expenses with roommates - rent, bills, and daily expenses",
    keywords: ["مصاريف السكن المشترك", "تقسيم الإيجار", "فواتير الشقة", "شركاء السكن"],
    keywordsEn: ["shared housing expenses app", "split rent with roommates", "apartment bills tracker", "roommate expense calculator", "how to split bills with roommates"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-01-03",
    content: `
## مقدمة

السكن المشترك خيار اقتصادي ممتاز، لكن إدارة المصاريف المشتركة قد تكون تحدياً. هذا الدليل يساعدك على تنظيم كل شيء.

## أنواع المصاريف في السكن المشترك

### 1. المصاريف الثابتة
- الإيجار الشهري
- فاتورة الكهرباء
- فاتورة الماء
- الإنترنت
- رسوم الصيانة

### 2. المصاريف المتغيرة
- مستلزمات التنظيف
- أدوات المطبخ المشتركة
- الطعام المشترك

## طرق تقسيم الإيجار

### التقسيم المتساوي
الأبسط والأكثر شيوعاً - كل شخص يدفع نفس المبلغ.

### حسب مساحة الغرفة
إذا كانت الغرف مختلفة الحجم:
- غرفة كبيرة = نسبة أعلى
- غرفة صغيرة = نسبة أقل

### حسب عدد المستخدمين
غرفة بشخصين = ضعف غرفة بشخص واحد.

## كيف تدير الفواتير؟

1. **حدد مسؤولاً** عن كل فاتورة
2. **استخدم تطبيق مشترك** لتتبع الدفعات
3. **حدد موعداً شهرياً** للتسوية
4. **احتفظ بسجل** لكل المعاملات

## نصائح لتجنب المشاكل

- ✅ اكتب اتفاقية واضحة من البداية
- ✅ استخدم تطبيق Diviso لتتبع كل شيء
- ✅ تواصل بشفافية عند أي مشكلة
- ✅ سوِّ الحسابات بانتظام

## كيف يساعدك Diviso؟

- إنشاء مجموعة للسكن المشترك
- تسجيل المصاريف المتكررة تلقائياً
- تذكيرات بمواعيد الدفع
- تقارير شهرية واضحة

## الخلاصة

السكن المشترك الناجح يحتاج تنظيماً جيداً. مع Diviso، لن تقلق أبداً بشأن من دفع ماذا.

**ابدأ الآن** وسهّل حياتك مع شركاء السكن!
    `,
    contentEn: `
## Introduction

Shared housing is an excellent economic choice, but managing shared expenses can be challenging. This guide helps you organize everything.

## Types of Shared Housing Expenses

### 1. Fixed Expenses
- Monthly rent
- Electricity bill
- Water bill
- Internet
- Maintenance fees

### 2. Variable Expenses
- Cleaning supplies
- Shared kitchen tools
- Shared food

## Ways to Split Rent

### Equal Split
The simplest and most common - everyone pays the same amount.

### By Room Size
If rooms are different sizes:
- Large room = higher percentage
- Small room = lower percentage

### By Number of Users
Room with two people = double a single-person room.

## How to Manage Bills?

1. **Assign a responsible person** for each bill
2. **Use a shared app** to track payments
3. **Set a monthly date** for settlement
4. **Keep a record** of all transactions

## Tips to Avoid Problems

- ✅ Write a clear agreement from the start
- ✅ Use Diviso app to track everything
- ✅ Communicate transparently about any issue
- ✅ Settle accounts regularly

## How Diviso Helps

- Create a shared housing group
- Automatically record recurring expenses
- Payment due reminders
- Clear monthly reports

## Conclusion

Successful shared housing needs good organization. With Diviso, you'll never worry about who paid what.

**Start now** and simplify your life with roommates!
    `
  },
  {
    slug: "camping-budget-guide",
    title: "دليل ميزانية رحلات الكشتة والتخييم",
    titleEn: "Camping and Desert Trip Budget Guide",
    description: "كيف تخطط ميزانية رحلة الكشتة وتقسم المصاريف مع المجموعة - دليل شامل للسعودية",
    descriptionEn: "How to plan your camping trip budget and split expenses with the group",
    keywords: ["ميزانية الكشتة", "مصاريف التخييم", "رحلات البر", "تخطيط الرحلات"],
    keywordsEn: ["camping budget planner", "camping trip expenses", "desert camping costs", "outdoor trip expense splitter", "group camping budget app"],
    category: "guides",
    readTime: 9,
    publishDate: "2026-01-01",
    content: `
## مقدمة

الكشتة من أجمل الأنشطة في السعودية، خاصة في فصل الشتاء. لكن التخطيط المالي الجيد يضمن رحلة ممتعة بدون مفاجآت.

## قائمة مصاريف الكشتة

### المعدات (تُشترى مرة واحدة)
- خيمة: 500 - 2000 ريال
- أكياس نوم: 100 - 300 ريال/قطعة
- كراسي وطاولات: 200 - 500 ريال
- أدوات الطبخ: 300 - 800 ريال
- إضاءة: 100 - 300 ريال

### مصاريف كل رحلة
- الوقود: 200 - 500 ريال
- الطعام والمشروبات: 50 - 100 ريال/شخص/يوم
- الفحم والحطب: 50 - 150 ريال
- الثلج: 30 - 50 ريال
- مستلزمات متنوعة: 100 ريال

## تقدير الميزانية الكاملة

### رحلة ليوم واحد (4 أشخاص)
| البند | التكلفة |
|-------|---------|
| الوقود | 200 ريال |
| الطعام | 200 ريال |
| الفحم | 50 ريال |
| متنوعات | 50 ريال |
| **المجموع** | **500 ريال** |
| **للشخص** | **125 ريال** |

### رحلة يومين (4 أشخاص)
| البند | التكلفة |
|-------|---------|
| الوقود | 350 ريال |
| الطعام | 400 ريال |
| الفحم | 100 ريال |
| متنوعات | 100 ريال |
| **المجموع** | **950 ريال** |
| **للشخص** | **238 ريال** |

## كيف تقسم المصاريف؟

### قبل الرحلة
1. حدد الميزانية المتوقعة
2. اجمع مبلغاً من كل شخص مقدماً
3. عيّن شخصاً مسؤولاً عن الصندوق

### أثناء الرحلة
1. سجل كل مصروف فور حدوثه
2. احتفظ بالفواتير
3. استخدم Diviso لتتبع كل شيء

### بعد الرحلة
1. راجع المصاريف الفعلية
2. احسب نصيب كل شخص
3. سوِّ الفروقات

## نصائح للتوفير

- 🔸 اشترِ المعدات في موسم التخفيضات
- 🔸 استأجر بدلاً من الشراء للرحلة الأولى
- 🔸 اشترِ الطعام بالجملة
- 🔸 شارك المعدات بين المجموعة
- 🔸 خطط للوجبات مسبقاً

## كيف يساعدك Diviso؟

- إنشاء مجموعة خاصة بالرحلة
- تصنيف المصاريف (طعام، وقود، معدات)
- حساب تلقائي لنصيب كل شخص
- تسجيل من دفع ماذا
- تسوية سهلة بعد الرحلة

## الخلاصة

التخطيط المالي الجيد = رحلة ممتعة. استخدم Diviso واستمتع بكشتتك بدون هموم مالية!

**حمّل Diviso الآن** وخطط لرحلتك القادمة!
    `,
    contentEn: `
## Introduction

Camping is one of the best activities in Saudi Arabia, especially in winter. Good financial planning ensures an enjoyable trip without surprises.

## Camping Expense List

### Equipment (One-time Purchase)
- Tent: 500 - 2000 SAR
- Sleeping bags: 100 - 300 SAR/piece
- Chairs and tables: 200 - 500 SAR
- Cooking tools: 300 - 800 SAR
- Lighting: 100 - 300 SAR

### Per Trip Expenses
- Fuel: 200 - 500 SAR
- Food and drinks: 50 - 100 SAR/person/day
- Charcoal and firewood: 50 - 150 SAR
- Ice: 30 - 50 SAR
- Miscellaneous: 100 SAR

## Full Budget Estimate

### One Day Trip (4 people)
| Item | Cost |
|------|------|
| Fuel | 200 SAR |
| Food | 200 SAR |
| Charcoal | 50 SAR |
| Misc | 50 SAR |
| **Total** | **500 SAR** |
| **Per Person** | **125 SAR** |

### Two Day Trip (4 people)
| Item | Cost |
|------|------|
| Fuel | 350 SAR |
| Food | 400 SAR |
| Charcoal | 100 SAR |
| Misc | 100 SAR |
| **Total** | **950 SAR** |
| **Per Person** | **238 SAR** |

## How to Split Expenses?

### Before the Trip
1. Set the expected budget
2. Collect an amount from each person in advance
3. Assign someone responsible for the fund

### During the Trip
1. Record every expense as it happens
2. Keep receipts
3. Use Diviso to track everything

### After the Trip
1. Review actual expenses
2. Calculate each person's share
3. Settle the differences

## Money-Saving Tips

- 🔸 Buy equipment during sale season
- 🔸 Rent instead of buy for the first trip
- 🔸 Buy food in bulk
- 🔸 Share equipment among the group
- 🔸 Plan meals in advance

## How Diviso Helps

- Create a trip-specific group
- Categorize expenses (food, fuel, equipment)
- Automatic calculation of each person's share
- Record who paid what
- Easy settlement after the trip

## Conclusion

Good financial planning = enjoyable trip. Use Diviso and enjoy your camping without financial worries!

**Download Diviso now** and plan your next trip!
    `
  },
  {
    slug: "restaurant-bill-etiquette",
    title: "إتيكيت تقسيم فاتورة المطعم مع الأصدقاء",
    titleEn: "Restaurant Bill Splitting Etiquette with Friends",
    description: "كيف تتجنب الإحراج عند تقسيم فاتورة المطعم مع الأصدقاء - قواعد الإتيكيت والنصائح العملية",
    descriptionEn: "How to avoid awkwardness when splitting restaurant bills with friends - etiquette rules and practical tips",
    keywords: ["تقسيم فاتورة المطعم", "إتيكيت الدفع", "الحساب في المطعم", "تقسيم الحساب"],
    keywordsEn: ["how to split restaurant bill with friends", "payment etiquette restaurant", "restaurant check splitting app", "bill splitting tips", "who pays the bill etiquette"],
    category: "tips",
    readTime: 5,
    publishDate: "2026-01-06",
    content: `
## مقدمة

لحظة وصول الفاتورة في المطعم قد تكون من أكثر اللحظات إحراجاً مع الأصدقاء. من يدفع؟ كيف نقسم؟ هل ندفع بالتساوي أم كل واحد يدفع طلبه؟

## المشكلة الشائعة

كم مرة حصلت معك هذه المواقف؟
- صمت محرج عند وصول الفاتورة
- شخص طلب أغلى طبق والباقي يدفعون معه بالتساوي
- أحدهم "نسي" محفظته
- خلافات حول من يدفع البقشيش

## 5 قواعد ذهبية للإتيكيت

### 1. اتفق مسبقاً
قبل الطلب، حدد طريقة الدفع:
- "كل واحد يدفع طلبه"
- "نقسم بالتساوي"
- "أنا عازمكم اليوم"

### 2. لا تطلب الأغلى إذا التقسيم بالتساوي
إذا اتفقتم على التقسيم المتساوي، راعِ الآخرين في اختياراتك.

### 3. الداعي يدفع
إذا دعوت أصدقاءك، توقع أن تدفع الفاتورة كاملة.

### 4. لا تحسب بالهللة
لا تكن الشخص الذي يحسب "أنا طلبي ب47 ريال وأنت ب52"، هذا يفسد الجو.

### 5. البقشيش من الجميع
البقشيش يُضاف قبل التقسيم، ليس بعده.

## متى تدفع الفاتورة كاملة؟

- 🎂 عيد ميلاد أحد الأصدقاء
- 🎉 مناسبة خاصة (ترقية، نجاح)
- 👋 وداع أو استقبال
- 🙏 شخص ساعدك بشيء كبير

## كيف يحل Diviso هذه المشكلة؟

- ✅ سجل الفاتورة بضغطة زر
- ✅ قسّم بالتساوي أو حسب الطلب
- ✅ احسب البقشيش تلقائياً
- ✅ أرسل طلب الدفع للأصدقاء
- ✅ تتبع من دفع ومن لم يدفع

## نصيحة أخيرة

لا تخلي المال يفسد صداقاتك. استخدم Diviso وخلي الحساب شفاف وواضح للجميع.

**جرب Diviso الآن** وقل وداعاً للإحراج!
    `,
    contentEn: `
## Introduction

The moment the bill arrives at a restaurant can be one of the most awkward moments with friends. Who pays? How do we split? Do we pay equally or each pays for their order?

## The Common Problem

How many times have these situations happened to you?
- Awkward silence when the bill arrives
- Someone ordered the most expensive dish and everyone pays equally
- Someone "forgot" their wallet
- Arguments about who pays the tip

## 5 Golden Etiquette Rules

### 1. Agree in Advance
Before ordering, decide the payment method:
- "Everyone pays for their order"
- "We split equally"
- "I'm treating today"

### 2. Don't Order the Most Expensive if Splitting Equally
If you agreed to split equally, consider others in your choices.

### 3. The Inviter Pays
If you invited your friends, expect to pay the full bill.

### 4. Don't Count Every Cent
Don't be the person who calculates "my order was 47 SAR and yours was 52", this ruins the mood.

### 5. Tip from Everyone
The tip is added before splitting, not after.

## When to Pay the Full Bill?

- 🎂 Friend's birthday
- 🎉 Special occasion (promotion, success)
- 👋 Farewell or welcome
- 🙏 Someone helped you with something big

## How Diviso Solves This Problem

- ✅ Record the bill with one click
- ✅ Split equally or by order
- ✅ Calculate tip automatically
- ✅ Send payment requests to friends
- ✅ Track who paid and who didn't

## Final Tip

Don't let money ruin your friendships. Use Diviso and keep the bill transparent and clear for everyone.

**Try Diviso now** and say goodbye to awkwardness!
    `
  },
  {
    slug: "wedding-costs-splitting",
    title: "تكاليف العرس والزواج - كيف تقسم المصاريف؟",
    titleEn: "Wedding Costs - How to Split Expenses?",
    description: "دليل شامل لتقسيم تكاليف الزواج بين العائلتين وتتبع مصاريف العرس في السعودية",
    descriptionEn: "Comprehensive guide to splitting wedding costs between families and tracking wedding expenses in Saudi Arabia",
    keywords: ["تكاليف الزواج", "مصاريف العرس", "ميزانية الزواج السعودية", "تخطيط العرس"],
    keywordsEn: ["wedding cost calculator", "wedding expense tracker", "split wedding costs between families", "wedding budget planner app", "wedding planning expenses"],
    category: "guides",
    readTime: 10,
    publishDate: "2026-01-04",
    content: `
## مقدمة

الزواج من أهم المناسبات في حياتنا، لكنه أيضاً من أكثرها تكلفة. التخطيط المالي الجيد يضمن بداية حياة زوجية مريحة.

## تكاليف الزواج في السعودية 2026

### قبل العرس
| البند | التكلفة التقديرية |
|-------|-------------------|
| المهر | 30,000 - 100,000 ريال |
| الشبكة (الذهب) | 15,000 - 50,000 ريال |
| أثاث المنزل | 50,000 - 150,000 ريال |
| الأجهزة الكهربائية | 20,000 - 40,000 ريال |

### حفل الزفاف
| البند | التكلفة التقديرية |
|-------|-------------------|
| قاعة الأفراح | 30,000 - 100,000 ريال |
| الضيافة | 50,000 - 150,000 ريال |
| التصوير والفيديو | 5,000 - 20,000 ريال |
| الزهور والديكور | 10,000 - 30,000 ريال |
| فرقة موسيقية/دي جي | 5,000 - 15,000 ريال |

### ملابس ومستلزمات
| البند | التكلفة التقديرية |
|-------|-------------------|
| فستان العروس | 5,000 - 30,000 ريال |
| بدلة العريس | 2,000 - 10,000 ريال |
| المكياج والشعر | 2,000 - 8,000 ريال |

## كيف تقسم التكاليف؟

### الطريقة التقليدية
- **أهل العريس**: المهر، الشبكة، قاعة الرجال، شهر العسل
- **أهل العروس**: قاعة النساء، فستان العروس، جهاز العروس

### الطريقة الحديثة
- تقسيم بالتساوي بين العائلتين
- أو حسب القدرة المالية لكل عائلة
- أو الزوجان يتحملان جزءاً من التكاليف

## نصائح للتوفير

1. **حدد ميزانية واضحة** من البداية
2. **قارن الأسعار** بين عدة موردين
3. **احجز مبكراً** للحصول على خصومات
4. **تجنب الموسم الذروة** (الإجازات والأعياد)
5. **ركز على الأساسيات** وتجنب الكماليات

## كيف يساعدك Diviso؟

- 📋 إنشاء ميزانية شاملة للعرس
- 👨‍👩‍👧‍👦 مجموعة خاصة لكل عائلة
- 💰 تتبع المصاريف الفعلية
- 📊 مقارنة الميزانية بالمصاريف
- 🎁 تسجيل الهدايا والمساهمات
- 📱 مشاركة التقارير مع العائلة

## خطوات عملية

### الشهر الأول
1. حدد الميزانية الإجمالية
2. قسّمها على البنود الرئيسية
3. أنشئ مجموعة Diviso للعرس

### الأشهر 2-6
1. سجل كل دفعة ومصروف
2. تابع الميزانية المتبقية
3. عدّل الخطة إذا لزم الأمر

### الشهر الأخير
1. راجع كل المصاريف
2. سوِّ الحسابات بين العائلتين
3. احتفظ بسجل للذكريات

## الخلاصة

التخطيط المالي الجيد للعرس = بداية مريحة للحياة الزوجية. لا تبدأ حياتك بديون!

**استخدم Diviso الآن** وخطط لعرسك بذكاء!
    `,
    contentEn: `
## Introduction

Marriage is one of the most important occasions in our lives, but it's also one of the most expensive. Good financial planning ensures a comfortable start to married life.

## Wedding Costs in Saudi Arabia 2026

### Before the Wedding
| Item | Estimated Cost |
|------|----------------|
| Mahr (Dowry) | 30,000 - 100,000 SAR |
| Shabka (Gold) | 15,000 - 50,000 SAR |
| Home Furniture | 50,000 - 150,000 SAR |
| Appliances | 20,000 - 40,000 SAR |

### Wedding Ceremony
| Item | Estimated Cost |
|------|----------------|
| Wedding Venue | 30,000 - 100,000 SAR |
| Catering | 50,000 - 150,000 SAR |
| Photography & Video | 5,000 - 20,000 SAR |
| Flowers & Decor | 10,000 - 30,000 SAR |
| Band/DJ | 5,000 - 15,000 SAR |

### Clothing & Accessories
| Item | Estimated Cost |
|------|----------------|
| Wedding Dress | 5,000 - 30,000 SAR |
| Groom's Suit | 2,000 - 10,000 SAR |
| Makeup & Hair | 2,000 - 8,000 SAR |

## How to Split Costs?

### Traditional Method
- **Groom's Family**: Mahr, Shabka, men's venue, honeymoon
- **Bride's Family**: Women's venue, wedding dress, trousseau

### Modern Method
- Split equally between families
- Or according to each family's financial ability
- Or the couple bears part of the costs

## Money-Saving Tips

1. **Set a clear budget** from the start
2. **Compare prices** from multiple vendors
3. **Book early** for discounts
4. **Avoid peak season** (holidays and Eids)
5. **Focus on essentials** and avoid luxuries

## How Diviso Helps

- 📋 Create a comprehensive wedding budget
- 👨‍👩‍👧‍👦 Separate group for each family
- 💰 Track actual expenses
- 📊 Compare budget vs expenses
- 🎁 Record gifts and contributions
- 📱 Share reports with family

## Practical Steps

### Month 1
1. Set the total budget
2. Divide it into main categories
3. Create a Diviso group for the wedding

### Months 2-6
1. Record every payment and expense
2. Track remaining budget
3. Adjust the plan if needed

### Final Month
1. Review all expenses
2. Settle accounts between families
3. Keep a record for memories

## Conclusion

Good financial planning for the wedding = comfortable start to married life. Don't start your life in debt!

**Use Diviso now** and plan your wedding smartly!
    `
  },
  {
    slug: "umrah-trip-budget",
    title: "كيف تدير ميزانية رحلة العمرة مع العائلة؟",
    titleEn: "How to Manage Your Family Umrah Trip Budget?",
    description: "دليل شامل لتخطيط ميزانية رحلة العمرة وتقسيم المصاريف بين أفراد العائلة",
    descriptionEn: "Comprehensive guide to planning Umrah trip budget and splitting expenses among family members",
    keywords: ["ميزانية العمرة", "تكاليف العمرة", "رحلة العمرة العائلية", "مصاريف العمرة"],
    keywordsEn: ["Umrah budget planner", "Umrah trip costs 2026", "family Umrah trip expenses", "Umrah expense calculator", "how much does Umrah cost"],
    category: "guides",
    readTime: 8,
    publishDate: "2026-01-02",
    content: `
## مقدمة

رحلة العمرة من أجمل الرحلات الروحانية، والتخطيط المالي الجيد يضمن لك التركيز على العبادة بدون قلق.

## تكاليف رحلة العمرة المتوقعة

### السفر
| البند | التكلفة التقديرية |
|-------|-------------------|
| تذاكر الطيران (من الرياض) | 800 - 1,500 ريال/شخص |
| السفر بالسيارة | 300 - 500 ريال (بنزين ذهاب وإياب) |
| باص أو حافلة | 200 - 400 ريال/شخص |

### الإقامة (لليلة الواحدة)
| الفئة | مكة | المدينة |
|-------|------|---------|
| اقتصادي | 200 - 400 ريال | 150 - 300 ريال |
| متوسط | 400 - 800 ريال | 300 - 600 ريال |
| فاخر | 800 - 2,000 ريال | 600 - 1,500 ريال |

### المصاريف اليومية
| البند | التكلفة |
|-------|---------|
| الطعام | 100 - 200 ريال/شخص/يوم |
| المواصلات الداخلية | 50 - 100 ريال/يوم |
| الهدايا والتسوق | 500 - 2,000 ريال |
| متفرقات | 50 - 100 ريال/يوم |

## مثال: ميزانية رحلة 5 أيام (عائلة 4 أشخاص)

| البند | التكلفة |
|-------|---------|
| السفر (سيارة) | 400 ريال |
| الفندق (4 ليالي × 500) | 2,000 ريال |
| الطعام (5 أيام × 400) | 2,000 ريال |
| المواصلات الداخلية | 300 ريال |
| الهدايا والتسوق | 1,000 ريال |
| متفرقات | 300 ريال |
| **المجموع** | **6,000 ريال** |
| **للشخص** | **1,500 ريال** |

## كيف تقسم المصاريف بين العائلة؟

### إذا كانت عائلة واحدة
- الأب والأم يتحملان التكاليف
- أو يساهم الأبناء العاملون

### إذا كانت عائلات متعددة
- **الطريقة 1**: كل عائلة تدفع مصاريفها
- **الطريقة 2**: تقسيم بالتساوي على عدد الأشخاص
- **الطريقة 3**: حسب القدرة المالية

## نصائح للتوفير

1. 📅 **احجز مبكراً** - الأسعار ترتفع في المواسم
2. 🏨 **اختر فندق بعيد قليلاً** - أرخص وتمشي للحرم
3. 🍽️ **كل في المطاعم الشعبية** - ألذ وأرخص
4. 🚗 **اذهب بالسيارة** - أوفر للعائلات الكبيرة
5. 🛍️ **حدد ميزانية الهدايا** - لا تفرط في التسوق

## كيف يساعدك Diviso؟

- 👨‍👩‍👧‍👦 إنشاء مجموعة للعائلة
- 💵 تسجيل كل مصروف فوراً
- 📊 تصنيف المصاريف (سكن، طعام، تسوق)
- 📱 مشاركة التقارير مع الجميع
- ⚖️ حساب نصيب كل شخص بدقة
- 💳 تسوية سهلة بعد الرحلة

## خطة عملية

### قبل الرحلة
1. حدد الميزانية الكاملة
2. اجمع المبلغ من المشاركين
3. احجز الفندق والسفر

### أثناء الرحلة
1. سجل كل مصروف في Diviso
2. تابع الميزانية المتبقية
3. التقط صور الفواتير

### بعد الرحلة
1. راجع كل المصاريف
2. احسب نصيب كل شخص
3. سوِّ الحسابات

## الخلاصة

رحلة العمرة يجب أن تكون تجربة روحانية، لا قلق مالي. خطط جيداً واستمتع بعبادتك.

**حمّل Diviso الآن** وخطط لعمرتك بسلام!
    `,
    contentEn: `
## Introduction

The Umrah trip is one of the most beautiful spiritual journeys, and good financial planning ensures you focus on worship without worry.

## Expected Umrah Trip Costs

### Travel
| Item | Estimated Cost |
|------|----------------|
| Flights (from Riyadh) | 800 - 1,500 SAR/person |
| By Car | 300 - 500 SAR (fuel round trip) |
| Bus | 200 - 400 SAR/person |

### Accommodation (per night)
| Category | Makkah | Madinah |
|----------|--------|---------|
| Budget | 200 - 400 SAR | 150 - 300 SAR |
| Mid-range | 400 - 800 SAR | 300 - 600 SAR |
| Luxury | 800 - 2,000 SAR | 600 - 1,500 SAR |

### Daily Expenses
| Item | Cost |
|------|------|
| Food | 100 - 200 SAR/person/day |
| Local Transport | 50 - 100 SAR/day |
| Gifts & Shopping | 500 - 2,000 SAR |
| Miscellaneous | 50 - 100 SAR/day |

## Example: 5-Day Trip Budget (Family of 4)

| Item | Cost |
|------|------|
| Travel (car) | 400 SAR |
| Hotel (4 nights × 500) | 2,000 SAR |
| Food (5 days × 400) | 2,000 SAR |
| Local Transport | 300 SAR |
| Gifts & Shopping | 1,000 SAR |
| Miscellaneous | 300 SAR |
| **Total** | **6,000 SAR** |
| **Per Person** | **1,500 SAR** |

## How to Split Expenses Among Family?

### If One Family
- Parents cover the costs
- Or working children contribute

### If Multiple Families
- **Method 1**: Each family pays their expenses
- **Method 2**: Split equally by number of people
- **Method 3**: According to financial ability

## Money-Saving Tips

1. 📅 **Book early** - prices rise in seasons
2. 🏨 **Choose a hotel slightly farther** - cheaper and you walk to Haram
3. 🍽️ **Eat at local restaurants** - tastier and cheaper
4. 🚗 **Go by car** - cheaper for large families
5. 🛍️ **Set a gift budget** - don't overspend shopping

## How Diviso Helps

- 👨‍👩‍👧‍👦 Create a family group
- 💵 Record every expense instantly
- 📊 Categorize expenses (accommodation, food, shopping)
- 📱 Share reports with everyone
- ⚖️ Calculate each person's share accurately
- 💳 Easy settlement after the trip

## Practical Plan

### Before the Trip
1. Set the total budget
2. Collect the amount from participants
3. Book hotel and travel

### During the Trip
1. Record every expense in Diviso
2. Track remaining budget
3. Take photos of receipts

### After the Trip
1. Review all expenses
2. Calculate each person's share
3. Settle accounts

## Conclusion

The Umrah trip should be a spiritual experience, not financial stress. Plan well and enjoy your worship.

**Download Diviso now** and plan your Umrah peacefully!
    `
  },
  {
    slug: "weekly-hangouts-expenses",
    title: "دليل مصاريف الطلعات والتجمعات الأسبوعية",
    titleEn: "Weekly Hangouts and Gatherings Expense Guide",
    description: "كيف تدير مصاريف طلعات الشلة الأسبوعية وتتجنب مشاكل 'من يدفع اليوم؟'",
    descriptionEn: "How to manage weekly friend hangout expenses and avoid 'who pays today?' problems",
    keywords: ["مصاريف الطلعات", "تقسيم حساب الشلة", "مصاريف التجمعات", "طلعات الأصدقاء"],
    keywordsEn: ["hangout expenses tracker", "friend group bill splitter", "group gathering costs app", "split dinner with friends", "who pays for dinner app"],
    category: "tips",
    readTime: 6,
    publishDate: "2025-12-28",
    content: `
## مقدمة

الطلعات الأسبوعية مع الشلة من أجمل الأوقات، لكن سؤال "من يدفع اليوم؟" قد يفسد المتعة. خلنا نحل هذه المشكلة!

## المشاكل الشائعة

- 😬 "أنا دفعت المرة الماضية!"
- 🤔 "مين اللي ما دفع أبداً؟"
- 😤 "فلان دايماً يطلب الأغلى"
- 💸 "الحساب راح ضخم ومحد يبي يدفع"

## أنظمة تقسيم الطلعات

### 1. نظام التناوب
كل أسبوع شخص مختلف يدفع الحساب كامل.

**المميزات:**
- ✅ بسيط وواضح
- ✅ لا حسابات معقدة

**العيوب:**
- ❌ غير عادل إذا اختلفت الطلبات
- ❌ مشكلة إذا غاب أحدهم

### 2. كل واحد يدفع طلبه
الأكثر عدالة، كل شخص يدفع ما طلبه.

**المميزات:**
- ✅ عادل 100%
- ✅ لا خلافات

**العيوب:**
- ❌ يحتاج حساب كل مرة
- ❌ قد يكون بخيل شوي

### 3. التقسيم بالتساوي
المجموع ÷ عدد الأشخاص = نصيب كل واحد.

**المميزات:**
- ✅ سريع وسهل
- ✅ يعزز روح الجماعة

**العيوب:**
- ❌ غير عادل إذا اختلفت الطلبات كثيراً

### 4. الصندوق المشترك (الأفضل!)
كل شخص يحول مبلغ ثابت شهرياً، والطلعات تُصرف منه.

**المميزات:**
- ✅ لا حسابات كل مرة
- ✅ ميزانية محددة
- ✅ يشجع على طلعات أكثر

## كيف يساعدك Diviso؟

### إنشاء مجموعة الشلة
1. أنشئ مجموعة باسم الشلة
2. أضف جميع الأصدقاء
3. حدد العملة (ريال سعودي)

### تسجيل المصاريف
1. بعد كل طلعة، سجل المصروف
2. حدد من دفع
3. اختر طريقة التقسيم

### تتبع الأرصدة
- شوف من عليه فلوس
- شوف من له فلوس
- سوِّ الحسابات بضغطة

## نصائح ذهبية

1. 🗓️ **حدد يوم ثابت** للطلعة (مثلاً: كل خميس)
2. 📍 **اختر أماكن متنوعة** بأسعار مختلفة
3. 📱 **سجل فوراً** لا تأجل
4. 💬 **تواصل بشفافية** إذا كان المبلغ كبير
5. ⚖️ **سوِّ شهرياً** لا تخلي الحسابات تتراكم

## مثال عملي

### الشلة: 5 أصدقاء
### الطلعة: مطعم + قهوة

| البند | المبلغ | من دفع |
|-------|--------|--------|
| عشاء المطعم | 350 ريال | أحمد |
| القهوة | 120 ريال | خالد |
| **المجموع** | **470 ريال** | - |
| **نصيب كل واحد** | **94 ريال** | - |

### التسوية:
- أحمد يستحق: 350 - 94 = 256 ريال
- خالد يستحق: 120 - 94 = 26 ريال
- الباقين يدفعون: 94 ريال لكل واحد

## الخلاصة

الصداقة أهم من المال. استخدم Diviso وخل طلعاتكم ممتعة بدون هموم مالية!

**جرب Diviso الآن** وسهّل حياتك مع الشلة!
    `,
    contentEn: `
## Introduction

Weekly hangouts with friends are some of the best times, but the question "who pays today?" can ruin the fun. Let's solve this problem!

## Common Problems

- 😬 "I paid last time!"
- 🤔 "Who never pays?"
- 😤 "That guy always orders the most expensive"
- 💸 "The bill got huge and no one wants to pay"

## Hangout Splitting Systems

### 1. Rotation System
Each week a different person pays the full bill.

**Pros:**
- ✅ Simple and clear
- ✅ No complex calculations

**Cons:**
- ❌ Unfair if orders differ
- ❌ Problem if someone is absent

### 2. Everyone Pays Their Own
The most fair, each person pays what they ordered.

**Pros:**
- ✅ 100% fair
- ✅ No disputes

**Cons:**
- ❌ Needs calculation every time
- ❌ Can seem stingy

### 3. Equal Split
Total ÷ number of people = each person's share.

**Pros:**
- ✅ Quick and easy
- ✅ Promotes group spirit

**Cons:**
- ❌ Unfair if orders differ significantly

### 4. Shared Fund (Best!)
Everyone transfers a fixed amount monthly, hangouts are paid from it.

**Pros:**
- ✅ No calculations each time
- ✅ Fixed budget
- ✅ Encourages more hangouts

## How Diviso Helps

### Creating the Friend Group
1. Create a group with your crew's name
2. Add all friends
3. Set currency (Saudi Riyal)

### Recording Expenses
1. After each hangout, record the expense
2. Specify who paid
3. Choose splitting method

### Tracking Balances
- See who owes money
- See who is owed money
- Settle with one click

## Golden Tips

1. 🗓️ **Set a fixed day** for hangouts (e.g., every Thursday)
2. 📍 **Choose varied places** with different prices
3. 📱 **Record immediately** don't delay
4. 💬 **Communicate transparently** if the amount is large
5. ⚖️ **Settle monthly** don't let accounts pile up

## Practical Example

### The Crew: 5 friends
### The Hangout: Restaurant + Coffee

| Item | Amount | Who Paid |
|------|--------|----------|
| Restaurant dinner | 350 SAR | Ahmed |
| Coffee | 120 SAR | Khaled |
| **Total** | **470 SAR** | - |
| **Each person's share** | **94 SAR** | - |

### Settlement:
- Ahmed is owed: 350 - 94 = 256 SAR
- Khaled is owed: 120 - 94 = 26 SAR
- Others pay: 94 SAR each

## Conclusion

Friendship is more important than money. Use Diviso and make your hangouts enjoyable without financial worries!

**Try Diviso now** and simplify your life with friends!
    `
  },
  {
    slug: "manage-existing-debts",
    title: "عندك ديون مع أصدقائك؟ كيف تسجلها في Diviso",
    titleEn: "Have Debts with Friends? How to Record Them in Diviso",
    description: "تعرف على ميزة الأرصدة السابقة في Diviso لتسجيل الديون القديمة بين الأصدقاء وبدء صفحة جديدة منظمة",
    descriptionEn: "Learn about Diviso's Legacy Balances feature to record old debts between friends and start a fresh organized page",
    keywords: ["أرصدة سابقة", "ديون الأصدقاء", "تسجيل ديون قديمة", "إدارة الديون", "تسوية الحسابات"],
    keywordsEn: ["legacy balances app", "record old debts between friends", "debt management app", "settle old accounts", "track who owes you money"],
    category: "guides",
    readTime: 6,
    publishDate: "2026-03-03",
    content: `
## المشكلة: ديون قديمة بدون سجل

كلنا مررنا بهالموقف — أصدقاء يتبادلون الدفع في الطلعات والرحلات بدون تسجيل، وبعد فترة ما أحد يتذكر المبالغ بالضبط. النتيجة؟ إحراج، خلافات، أو حتى خسارة صداقات.

## الحل: ميزة الأرصدة السابقة في Diviso

Diviso يتيح لك تسجيل أي دين قديم بين الأصدقاء حتى لو حصل قبل ما تستخدم التطبيق.

### كيف تضيف رصيد سابق؟

1. **ادخل المجموعة** أو أنشئ مجموعة جديدة
2. **روح لتبويب التسويات**
3. **اضغط "إضافة رصيد سابق"**
4. **حدد الدائن والمدين والمبلغ**
5. **أضف ملاحظة** (اختياري) — مثلاً: "فلوس عشا الأسبوع الماضي"

الرصيد يُضاف فوراً لحسابات المجموعة ويظهر كبطاقة خاصة في الدردشة.

## ميزات إضافية تساعدك

### إنهاء الرحلة وإغلاق المجموعة

بعد ما تنتهي من تسجيل كل شيء، المشرف يقدر:
- **ينهي الرحلة** — تتوقف إضافة المصاريف ويبقى فقط التسوية والدردشة
- **يغلق المجموعة نهائياً** — تصير أرشيف

### تأكيد التسويات المزدوج

لما عضو يسجل إنه دفع لشخص آخر، المستلم يتلقى إشعار لتأكيد الاستلام. كذا ما في مجال للخلاف.

### طلب السداد عبر واتساب

من شاشة التسويات، اضغط "طلب سداد" وبيفتح واتساب برسالة جاهزة فيها المبلغ ورابط المجموعة.

## أمثلة عملية

### مثال 1: شلة السفر
محمد دفع عن أحمد 300 ريال في رحلة سابقة. يفتح Diviso، يضيف رصيد سابق: أحمد يدين لمحمد 300 ريال. خلاص، مسجل رسمياً.

### مثال 2: شركاء السكن
سارة وفاطمة ساكنين مع بعض من 6 شهور. سارة دافعة فواتير كثير. تسجل الفرق كرصيد سابق وتبدأ من اليوم بسجل نظيف.

## الخلاصة

لا تخلي الديون القديمة تأثر على علاقاتك. سجلها في Diviso، سوِّها بضغطة زر، وابدأ صفحة جديدة.

**جرب Diviso الآن** وسجل أرصدتك السابقة!
    `,
    contentEn: `
## The Problem: Old Debts Without Records

We've all been there — friends paying for each other during outings and trips without keeping track, and after a while nobody remembers the exact amounts. The result? Awkwardness, disputes, or even lost friendships.

## The Solution: Legacy Balances in Diviso

Diviso lets you record any old debt between friends, even if it happened before you started using the app.

### How to Add a Legacy Balance

1. **Enter the group** or create a new one
2. **Go to the Settlements tab**
3. **Tap "Add Previous Balance"**
4. **Select the creditor, debtor, and amount**
5. **Add a note** (optional) — e.g., "Last week's dinner money"

The balance is added immediately to group accounts and appears as a special card in chat.

## Additional Features That Help

### Finishing Trips and Closing Groups

After recording everything, the admin can:
- **Finish the trip** — stops expense additions, only settlements and chat remain
- **Permanently close the group** — becomes an archive

### Dual Settlement Confirmation

When a member records that they paid someone, the recipient gets a notification to confirm receipt. This eliminates any room for disputes.

### WhatsApp Payment Request

From the Settlements screen, tap "Request Payment" and WhatsApp opens with a pre-formatted message containing the amount and group link.

## Practical Examples

### Example 1: Travel Group
Mohammed paid 300 SAR for Ahmed on a previous trip. He opens Diviso, adds a legacy balance: Ahmed owes Mohammed 300 SAR. Done, officially recorded.

### Example 2: Roommates
Sara and Fatima have been roommates for 6 months. Sara paid many bills. She records the difference as a legacy balance and starts fresh from today.

## Conclusion

Don't let old debts affect your relationships. Record them in Diviso, settle with one tap, and start a new page.

**Try Diviso now** and record your legacy balances!
    `
  },
  {
    slug: "split-restaurant-bill",
    title: "تقسيم حساب المطعم: 7 طرق ذكية تنهي الإحراج نهائياً",
    titleEn: "Splitting the Restaurant Bill: 7 Smart Ways to End Awkwardness",
    description: "دليلك الشامل لتقسيم حساب المطعم مع الأصدقاء بدون إحراج. اكتشف أفضل الطرق والتطبيقات لتقسيم الفاتورة بعدل.",
    descriptionEn: "Your complete guide to splitting restaurant bills with friends without awkwardness. Discover the best methods and apps.",
    keywords: ["تقسيم حساب المطعم", "تقسيم الفاتورة", "حساب المطعم بين الأصدقاء", "تقسيم فاتورة المطعم", "من يدفع الحساب", "حساب المطعم"],
    keywordsEn: ["how to split restaurant bill with friends app", "splitting the check fairly", "restaurant bill calculator app", "who pays the bill etiquette", "bill splitting app for restaurants"],
    category: "guides",
    readTime: 7,
    publishDate: "2026-03-10",
    content: `
## المشكلة اللي يعرفها الكل

وصل الحساب... وبدأ الصمت المحرج. مين يدفع؟ نقسم بالتساوي ولا كل واحد يدفع اللي طلبه؟ هذا الموقف يتكرر يومياً في مطاعم السعودية.

## لماذا تقسيم حساب المطعم صعب؟

- **اختلاف الطلبات**: واحد طلب ستيك بـ 200 وواحد طلب سلطة بـ 35
- **الإحراج الاجتماعي**: ما أحد يبغى يطلع بخيل
- **عدم وجود فكة**: خاصة مع الدفع الإلكتروني
- **المجاملة الزائدة**: "لا لا أنا أدفع" ثم ما أحد يدفع

## 7 طرق ذكية لتقسيم الحساب

### 1. التقسيم المتساوي البسيط
قسّم المبلغ ÷ عدد الأشخاص. مناسب لما الطلبات متقاربة.

### 2. كل شخص يدفع اللي طلبه
الأعدل لكن يحتاج حساب دقيق. هنا يجي دور التطبيقات الذكية.

### 3. نظام الدور (التناوب)
كل مرة واحد يدفع. عدل على المدى الطويل مع نفس المجموعة.

### 4. التقسيم حسب النسبة
اللي طلب أكثر يدفع نسبة أعلى. Diviso يحسبها تلقائياً.

### 5. صندوق المجموعة
كل شخص يحول مبلغ ثابت شهرياً لصندوق الطلعات.

### 6. شخص يدفع والباقي يحولون
أسهل طريقة: واحد يدفع الكل ويسجلها في Diviso، والتطبيق يحسب نصيب كل شخص.

### 7. التقسيم الذكي بالتطبيق
سجل المصروف في Diviso واختر طريقة التقسيم: متساوي، بالنسبة، أو مخصص.

## كيف Diviso يحل المشكلة نهائياً؟

- ✅ سجل المصروف بثانيتين
- ✅ اختر طريقة التقسيم المناسبة
- ✅ كل شخص يشوف نصيبه فوراً
- ✅ تذكيرات أوتوماتيكية للتسوية
- ✅ بالعربي وبالريال السعودي

## نصيحة ذهبية

اتفقوا على طريقة التقسيم **قبل** ما تطلبون. كذا ما أحد يحس بالإحراج.

## الخلاصة

تقسيم حساب المطعم ما يحتاج يكون محرج. مع Diviso، سجل وقسم وسوِّ الحساب بثواني.

**جرب Diviso مجاناً** — خلك ذكي وقسّم بذكاء!
    `,
    contentEn: `
## The Problem Everyone Knows

The bill arrives... and the awkward silence begins. Who pays? Split equally or each pays what they ordered? This happens daily in restaurants worldwide.

## Why is Splitting Restaurant Bills Hard?

- **Different orders**: One person orders a 200 SAR steak, another orders a 35 SAR salad
- **Social pressure**: Nobody wants to look cheap
- **No change**: Especially with digital payments
- **Over-politeness**: "No no, I'll pay" then nobody pays

## 7 Smart Ways to Split the Bill

### 1. Simple Equal Split
Divide total ÷ number of people. Good when orders are similar.

### 2. Pay What You Ordered
Fairest but requires precise calculation. Smart apps shine here.

### 3. Rotation System
Each person pays for a full meal in turns. Fair long-term with the same group.

### 4. Proportional Split
Whoever ordered more pays a higher percentage. Diviso calculates automatically.

### 5. Group Fund
Everyone contributes a fixed monthly amount for group outings.

### 6. One Pays, Others Transfer
Easiest: one person pays everything, logs it in Diviso, and the app calculates each share.

### 7. Smart App Splitting
Log the expense in Diviso and choose: equal, proportional, or custom split.

## How Diviso Solves This Permanently

- ✅ Log expenses in 2 seconds
- ✅ Choose the right splitting method
- ✅ Everyone sees their share instantly
- ✅ Automatic settlement reminders
- ✅ Full Arabic & Saudi Riyal support

## Golden Tip

Agree on the splitting method **before** ordering. No awkwardness that way.

## Conclusion

Splitting restaurant bills doesn't have to be awkward. With Diviso, log, split, and settle in seconds.

**Try Diviso free** — be smart, split smart!
    `
  },
  {
    slug: "trip-expenses-app",
    title: "أفضل تطبيق مصاريف الرحلة 2026: نظّم رحلتك بدون فوضى",
    titleEn: "Best Trip Expenses App 2026: Organize Your Trip Without Chaos",
    description: "تبحث عن تطبيق مصاريف الرحلة؟ اكتشف كيف تنظم مصاريف رحلتك مع الأصدقاء وتتابع كل ريال بسهولة.",
    descriptionEn: "Looking for a trip expenses app? Discover how to organize your travel expenses with friends and track every riyal easily.",
    keywords: ["تطبيق مصاريف الرحلة", "تطبيق مصاريف السفر", "حساب مصاريف الرحلة", "تقسيم مصاريف الرحلة", "ميزانية الرحلة", "مصاريف السفر مع الأصدقاء"],
    keywordsEn: ["best trip expenses app 2026", "travel expense tracker for groups", "trip cost calculator app", "split travel costs with friends", "travel budget tracker app free"],
    category: "guides",
    readTime: 8,
    publishDate: "2026-03-08",
    content: `
## كل رحلة تبدأ بميزانية

سواء كانت رحلة عمرة، سفر لدبي، أو كشتة مع الشباب — تنظيم المصاريف من البداية يخليك تستمتع بدون قلق.

## ليش تحتاج تطبيق مصاريف الرحلة؟

### المشاكل بدون تطبيق:
- **النسيان**: "مين دفع البنزين أمس؟"
- **الحسابات الخاطئة**: "أنا دفعت أكثر!" 
- **الإحراج بعد الرحلة**: المطالبة بالفلوس تحرج
- **ضياع الفواتير**: ما تقدر تتذكر كل شيء

### الحل مع التطبيق:
- ✅ كل مصروف مسجل لحظياً
- ✅ الكل يشوف الحسابات
- ✅ التسوية واضحة ودقيقة
- ✅ ما فيه مجال للنسيان

## مقارنة تطبيقات مصاريف الرحلة

### Diviso 🏆
- **اللغة**: عربي كامل
- **العملة**: ريال سعودي + 50 عملة
- **المميز**: مصمم للسعودية، واجهة عربية، دعم فوري
- **السعر**: مجاني

### Splitwise
- **اللغة**: إنجليزي فقط
- **العملة**: دولار افتراضياً
- **المميز**: شهرة عالمية
- **السعر**: مدفوع للميزات الكاملة

### Excel / الملاحظات
- **اللغة**: حسب إعداداتك
- **المميز**: مرونة كاملة
- **المشكلة**: يحتاج وقت ومجهود كبير

## كيف تستخدم Diviso في رحلتك؟

### قبل الرحلة
1. أنشئ مجموعة بالتطبيق
2. أضف أعضاء الرحلة عبر رابط أو QR
3. حدد العملة وطريقة التقسيم

### أثناء الرحلة
1. أي شخص يدفع يسجل المصروف فوراً
2. الكل يشوف التحديثات لحظياً
3. التطبيق يحسب الأرصدة تلقائياً

### بعد الرحلة
1. راجع ملخص المصاريف
2. شوف من يدين لمن
3. سوِّ الحسابات بضغطة واحدة

## 5 نصائح لرحلة بدون مشاكل مالية

1. **افتح المجموعة قبل الرحلة** — لا تنتظر
2. **سجل كل مصروف فوراً** — ما تنسى بعدين
3. **صوروا الفواتير** — دليل للجميع
4. **اتفقوا على طريقة التقسيم** — متساوي ولا بالاستهلاك
5. **سووا الحسابات خلال الرحلة** — لا تراكمون

## الخلاصة

تطبيق مصاريف الرحلة الصح يحول رحلتك من فوضى مالية إلى تنظيم تام. Diviso صُمم لهذا بالضبط.

**حمّل Diviso** وابدأ رحلتك القادمة صح!
    `,
    contentEn: `
## Every Trip Starts With a Budget

Whether it's Umrah, a Dubai trip, or camping with friends — organizing expenses from the start lets you enjoy worry-free.

## Why You Need a Trip Expenses App

### Problems Without an App:
- **Forgetting**: "Who paid for gas yesterday?"
- **Wrong calculations**: "I paid more!"
- **Post-trip awkwardness**: Asking for money is uncomfortable
- **Lost receipts**: Can't remember everything

### Solution With an App:
- ✅ Every expense logged instantly
- ✅ Everyone sees the accounts
- ✅ Settlement is clear and accurate
- ✅ No room for forgetting

## Comparing Trip Expense Apps

### Diviso 🏆
- **Language**: Full Arabic
- **Currency**: Saudi Riyal + 50 currencies
- **Highlight**: Designed for Saudi Arabia, Arabic interface, instant support
- **Price**: Free

### Splitwise
- **Language**: English only
- **Currency**: USD default
- **Highlight**: Global popularity
- **Price**: Paid for full features

### Excel / Notes
- **Language**: Depends on your settings
- **Highlight**: Full flexibility
- **Problem**: Takes too much time and effort

## How to Use Diviso on Your Trip

### Before the Trip
1. Create a group in the app
2. Add trip members via link or QR
3. Set currency and splitting method

### During the Trip
1. Whoever pays logs the expense instantly
2. Everyone sees live updates
3. App calculates balances automatically

### After the Trip
1. Review expense summary
2. See who owes whom
3. Settle accounts with one tap

## 5 Tips for a Financially Smooth Trip

1. **Open the group before the trip** — don't wait
2. **Log every expense immediately** — you'll forget later
3. **Photo receipts** — proof for everyone
4. **Agree on splitting method** — equal or by consumption
5. **Settle during the trip** — don't accumulate

## Conclusion

The right trip expenses app transforms your trip from financial chaos to total organization. Diviso was built for exactly this.

**Download Diviso** and start your next trip right!
    `
  },
  {
    slug: "monthly-expense-calculator",
    title: "كيف أحسب مصاريفي الشهرية؟ دليل عملي خطوة بخطوة",
    titleEn: "How to Calculate Monthly Expenses: A Step-by-Step Guide",
    description: "تعلم كيف تحسب مصاريفك الشهرية وتنظم ميزانيتك بطريقة بسيطة. دليل شامل مع أدوات مجانية لتتبع النفقات.",
    descriptionEn: "Learn how to calculate your monthly expenses and organize your budget simply. Comprehensive guide with free tracking tools.",
    keywords: ["كيف احسب مصاريفي الشهرية", "حساب المصاريف", "ميزانية شهرية", "تتبع المصاريف", "إدارة المصاريف الشخصية", "تطبيق حساب مصاريف"],
    keywordsEn: ["how to calculate monthly expenses", "monthly budget calculator", "expense tracking app free", "personal finance tracker", "budget calculator for beginners"],
    category: "tips",
    readTime: 9,
    publishDate: "2026-03-05",
    content: `
## هل تحس فلوسك تضيع بدون ما تدري؟

أغلب الناس ما يعرفون وين تروح رواتبهم. الخطوة الأولى للسيطرة المالية هي **معرفة مصاريفك الفعلية**.

## خطوات حساب مصاريفك الشهرية

### الخطوة 1: اجمع كل مصادر الدخل
- الراتب الأساسي
- دخل إضافي
- بدلات وحوافز

### الخطوة 2: صنّف مصاريفك
**مصاريف ثابتة (ما تتغير):**
- إيجار / قسط المنزل
- فواتير الجوال والإنترنت
- تأمين السيارة
- اشتراكات (نتفلكس، صالة رياضية)

**مصاريف متغيرة (تتغير كل شهر):**
- البقالة والأكل
- البنزين والمواصلات
- الترفيه والطلعات
- الملابس والتسوق

**مصاريف مشتركة (مع آخرين):**
- إيجار السكن المشترك
- مصاريف الرحلات
- العشاء مع الأصدقاء
- هدايا المناسبات

### الخطوة 3: تتبع لمدة شهر كامل
سجل **كل** مصروف مهما كان صغير. القهوة اليومية بـ 15 ريال = 450 ريال شهرياً!

### الخطوة 4: حلل النتائج
- وين تصرف أكثر شيء؟
- هل فيه مصاريف ممكن تقللها؟
- كم تحتاج تدخر؟

## قاعدة 50/30/20 للميزانية

- **50%** للاحتياجات (إيجار، فواتير، أكل)
- **30%** للرغبات (ترفيه، تسوق، طلعات)
- **20%** للادخار والاستثمار

### مثال براتب 10,000 ريال:
| الفئة | المبلغ |
|-------|--------|
| احتياجات | 5,000 ريال |
| رغبات | 3,000 ريال |
| ادخار | 2,000 ريال |

## أين يدخل Diviso؟

المصاريف المشتركة (الثلث اللي مع ناس) هي الأصعب في التتبع. Diviso يساعدك:

- ✅ تتبع كل مصروف مشترك
- ✅ تعرف بالضبط كم تصرف مع الأصدقاء
- ✅ تسوي حسابات واضحة
- ✅ تقارير شهرية تبين أنماط صرفك

## أدوات مفيدة لحساب المصاريف

1. **Diviso** — للمصاريف المشتركة والجماعية
2. **جداول Excel** — للميزانية الشخصية الشاملة
3. **تطبيق البنك** — لمراجعة العمليات

## 5 عادات تغير حياتك المالية

1. **سجل مصاريفك يومياً** — خذ 30 ثانية بس
2. **راجع ميزانيتك أسبوعياً** — تأكد إنك ماشي صح
3. **حدد سقف للإنفاق** — خاصة الترفيه
4. **ادخر أول الراتب** — مو آخره
5. **شارك أهدافك** — المحاسبة الجماعية تساعد

## الخلاصة

حساب مصاريفك الشهرية مو صعب — يحتاج بس التزام بسيط. ابدأ اليوم وشوف الفرق خلال شهر.

**حمّل Diviso** وابدأ تتبع مصاريفك المشتركة!
    `,
    contentEn: `
## Do You Feel Like Your Money Disappears?

Most people don't know where their salary goes. The first step to financial control is **knowing your actual expenses**.

## Steps to Calculate Your Monthly Expenses

### Step 1: Gather All Income Sources
- Base salary
- Side income
- Allowances and bonuses

### Step 2: Categorize Your Expenses
**Fixed (don't change):**
- Rent / mortgage
- Phone and internet bills
- Car insurance
- Subscriptions (Netflix, gym)

**Variable (change monthly):**
- Groceries and food
- Gas and transportation
- Entertainment and outings
- Shopping and clothes

**Shared (with others):**
- Shared housing rent
- Trip expenses
- Dinner with friends
- Occasion gifts

### Step 3: Track for One Full Month
Record **every** expense no matter how small. Daily coffee at 15 SAR = 450 SAR monthly!

### Step 4: Analyze Results
- Where do you spend the most?
- Are there expenses you can reduce?
- How much should you save?

## The 50/30/20 Budget Rule

- **50%** for needs (rent, bills, food)
- **30%** for wants (entertainment, shopping, outings)
- **20%** for savings and investment

### Example with 10,000 SAR salary:
| Category | Amount |
|----------|--------|
| Needs | 5,000 SAR |
| Wants | 3,000 SAR |
| Savings | 2,000 SAR |

## Where Does Diviso Fit?

Shared expenses (the third that involves others) are hardest to track. Diviso helps you:

- ✅ Track every shared expense
- ✅ Know exactly how much you spend with friends
- ✅ Clear settlements
- ✅ Monthly reports showing spending patterns

## Useful Expense Tracking Tools

1. **Diviso** — for shared and group expenses
2. **Excel spreadsheets** — for comprehensive personal budgeting
3. **Bank app** — for reviewing transactions

## 5 Habits That Change Your Financial Life

1. **Log expenses daily** — takes just 30 seconds
2. **Review budget weekly** — ensure you're on track
3. **Set spending limits** — especially entertainment
4. **Save at paycheck start** — not the end
5. **Share your goals** — group accountability helps

## Conclusion

Calculating monthly expenses isn't hard — it just needs simple commitment. Start today and see the difference in a month.

**Download Diviso** and start tracking your shared expenses!
    `
  },
  {
    slug: "best-money-splitting-app-2026",
    title: "أفضل تطبيق تقسيم فلوس 2026: مقارنة شاملة",
    titleEn: "Best Money Splitting App 2026: Comprehensive Comparison",
    description: "مقارنة بين أفضل تطبيقات تقسيم الفلوس والمصاريف في 2026. اكتشف أي تطبيق يناسبك ويناسب أصدقائك.",
    descriptionEn: "Comparison of the best money splitting apps in 2026. Discover which app suits you and your friends.",
    keywords: ["أفضل تطبيق تقسيم فلوس", "تطبيق تقسيم المصاريف", "أفضل تطبيق حساب المصاريف", "بديل Splitwise عربي", "تطبيق تقسيم الحساب", "تقسيم الفلوس بين الأصدقاء"],
    keywordsEn: ["best money splitting app 2026", "best expense splitting app", "Splitwise alternative free 2026", "bill splitting app comparison", "best app to split expenses with friends"],
    category: "comparisons",
    readTime: 10,
    publishDate: "2026-03-01",
    content: `
## لماذا تحتاج تطبيق تقسيم فلوس؟

كل ما طلعت مع الشباب أو سافرت مع العائلة، تقسيم المصاريف يصير مشكلة. تطبيق واحد يحل كل هالفوضى.

## المعايير اللي قيّمنا عليها

1. **دعم العربية** — أساسي للمستخدم السعودي
2. **سهولة الاستخدام** — مو كل الناس تقنيين
3. **المزايا** — تقسيم ذكي، تقارير، تذكيرات
4. **السعر** — مجاني ولا مدفوع؟
5. **الخصوصية** — بياناتك آمنة؟

## المقارنة الشاملة

### 1. Diviso ⭐⭐⭐⭐⭐ الأفضل عربياً

**المميزات:**
- واجهة عربية 100% مع دعم RTL كامل
- ريال سعودي + 50 عملة أخرى
- تقسيم ذكي (متساوي، نسبي، مخصص)
- مجموعات غير محدودة في النسخة المجانية
- إشعارات ذكية للتسوية
- تقارير مفصلة بالرسوم البيانية
- دعوة الأصدقاء برابط أو QR
- يعمل بدون إنترنت (PWA)

**العيوب:**
- جديد نسبياً في السوق
- تطبيق ويب (PWA) وليس تطبيق أصلي بعد

**السعر:** مجاني مع خطة Pro بميزات إضافية

### 2. Splitwise ⭐⭐⭐⭐

**المميزات:**
- الأشهر عالمياً
- تاريخ طويل ومستقر
- تكامل مع PayPal وVenmo

**العيوب:**
- لا يدعم العربية
- الريال السعودي مو افتراضي
- النسخة المجانية محدودة جداً
- الإعلانات مزعجة

**السعر:** $4.99/شهر للنسخة الكاملة

### 3. Tricount ⭐⭐⭐

**المميزات:**
- بسيط ومباشر
- مجاني بالكامل
- بدون تسجيل

**العيوب:**
- لا يدعم العربية
- ميزات محدودة
- بدون إشعارات ذكية

**السعر:** مجاني

### 4. ملاحظات الجوال / Excel ⭐⭐

**المميزات:**
- مرونة كاملة
- ما يحتاج تطبيق إضافي

**العيوب:**
- يحتاج وقت ومجهود كبير
- خطأ بشري في الحسابات
- مو مشترك — شخص واحد يشوفه
- ما فيه تذكيرات

## جدول المقارنة السريع

| الميزة | Diviso | Splitwise | Tricount |
|--------|--------|-----------|----------|
| العربية | ✅ | ❌ | ❌ |
| مجاني | ✅ | ⚠️ | ✅ |
| الريال SAR | ✅ | ⚠️ | ✅ |
| تقسيم ذكي | ✅ | ✅ | ⚠️ |
| تذكيرات | ✅ | ✅ | ❌ |
| تقارير | ✅ | ✅ | ⚠️ |
| بدون نت | ✅ | ❌ | ❌ |

## التوصية النهائية

**إذا كنت في السعودية أو الخليج**: Diviso هو الخيار الأمثل — عربي، مجاني، ومصمم لاحتياجاتك.

**إذا كنت تسافر مع أجانب**: Splitwise خيار جيد لأنهم يعرفونه.

**إذا تبغى البساطة**: Tricount يكفي للاستخدام البسيط.

## الخلاصة

أفضل تطبيق تقسيم فلوس هو اللي يستخدمه كل أعضاء المجموعة. Diviso يسهّل هالشيء بواجهته العربية وسهولة دعوة الأصدقاء.

**جرب Diviso اليوم** — مجاناً وبدون تسجيل معقد!
    `,
    contentEn: `
## Why Do You Need a Money Splitting App?

Every time you go out with friends or travel with family, splitting expenses becomes a problem. One app solves all this chaos.

## Our Evaluation Criteria

1. **Arabic support** — essential for Saudi users
2. **Ease of use** — not everyone is tech-savvy
3. **Features** — smart splitting, reports, reminders
4. **Price** — free or paid?
5. **Privacy** — is your data safe?

## Comprehensive Comparison

### 1. Diviso ⭐⭐⭐⭐⭐ Best for Arabic Users

**Pros:**
- 100% Arabic interface with full RTL support
- Saudi Riyal + 50 other currencies
- Smart splitting (equal, proportional, custom)
- Unlimited groups in free version
- Smart settlement notifications
- Detailed reports with charts
- Invite friends via link or QR
- Works offline (PWA)

**Cons:**
- Relatively new in the market
- Web app (PWA) not native app yet

**Price:** Free with Pro plan for extra features

### 2. Splitwise ⭐⭐⭐⭐

**Pros:**
- Most popular globally
- Long stable history
- PayPal and Venmo integration

**Cons:**
- No Arabic support
- SAR not default currency
- Very limited free version
- Annoying ads

**Price:** $4.99/month for full version

### 3. Tricount ⭐⭐⭐

**Pros:**
- Simple and direct
- Completely free
- No registration required

**Cons:**
- No Arabic support
- Limited features
- No smart notifications

**Price:** Free

### 4. Phone Notes / Excel ⭐⭐

**Pros:**
- Full flexibility
- No extra app needed

**Cons:**
- Takes lots of time and effort
- Human calculation errors
- Not shared — only one person sees it
- No reminders

## Quick Comparison Table

| Feature | Diviso | Splitwise | Tricount |
|---------|--------|-----------|----------|
| Arabic | ✅ | ❌ | ❌ |
| Free | ✅ | ⚠️ | ✅ |
| SAR | ✅ | ⚠️ | ✅ |
| Smart Split | ✅ | ✅ | ⚠️ |
| Reminders | ✅ | ✅ | ❌ |
| Reports | ✅ | ✅ | ⚠️ |
| Offline | ✅ | ❌ | ❌ |

## Final Recommendation

**If you're in Saudi Arabia or the Gulf**: Diviso is the best choice — Arabic, free, designed for your needs.

**If traveling with international friends**: Splitwise is good since they know it.

**If you want simplicity**: Tricount is enough for basic use.

## Conclusion

The best money splitting app is the one all group members actually use. Diviso makes this easy with its Arabic interface and simple friend invitations.

**Try Diviso today** — free and no complicated registration!
    `
  },
  {
    slug: "ramadan-group-expenses",
    title: "مصاريف رمضان مع الأصدقاء: كيف تنظمها بدون صداع",
    titleEn: "Ramadan Group Expenses: How to Organize Without Headaches",
    description: "دليل تنظيم مصاريف رمضان الجماعية: الإفطارات، العزومات، الهدايا، والصدقات. نظّم كل شيء مع أصدقائك بسهولة.",
    descriptionEn: "Guide to organizing group Ramadan expenses: iftar, gatherings, gifts, and charity. Organize everything with friends easily.",
    keywords: ["مصاريف رمضان", "تقسيم مصاريف رمضان", "إفطار جماعي", "عزومات رمضان", "مصاريف رمضان مع الأصدقاء", "ميزانية رمضان"],
    keywordsEn: ["Ramadan group expense manager", "split Ramadan costs with friends", "group iftar expenses tracker", "Ramadan budget planner", "Ramadan gathering expenses app"],
    category: "tips",
    readTime: 7,
    publishDate: "2026-02-25",
    content: `
## رمضان = مصاريف جماعية كثيرة

رمضان شهر الكرم والتجمعات. بس المصاريف الجماعية تتراكم بسرعة: إفطارات، عزومات، هدايا، وصدقات مشتركة.

## أنواع المصاريف الجماعية في رمضان

### 1. إفطارات المطاعم
الشباب يتجمعون على إفطار كل يوم أو يومين. الحساب يتراكم!

### 2. العزومات المنزلية
كل واحد يعزم مرة. بس المصاريف مو متساوية — عزومة بحري غير عزومة بسيطة.

### 3. القرقيعان والهدايا
تجهيزات القرقيعان للأطفال، هدايا العيد — تحتاج تنسيق.

### 4. الصدقات الجماعية
إفطار صائم، سلال رمضانية — المجموعة تساهم سوا.

### 5. تجهيزات العيد
ملابس، حلويات، زينة — بعضها مشترك.

## كيف تنظم مصاريف رمضان؟

### أسبوع قبل رمضان
1. أنشئ مجموعة "رمضان" في Diviso
2. أضف كل الأصدقاء
3. اتفقوا على الميزانية التقريبية
4. حددوا جدول العزومات

### خلال رمضان
1. سجل كل مصروف فوراً
2. صنّف المصاريف (إفطار، هدايا، صدقة)
3. تابع الأرصدة أسبوعياً
4. سوّ حسابات مرحلية

### بعد العيد
1. راجع إجمالي المصاريف
2. سوِّ الحسابات النهائية
3. خطط لرمضان الجاي

## نصائح ذهبية لرمضان اقتصادي

- 🌙 **حددوا سقف** للإفطارات الخارجية
- 🌙 **تناوبوا** على العزومات — كل واحد يوم
- 🌙 **اشتروا بالجملة** — أرخص بكثير
- 🌙 **استخدموا Diviso** — لا تضيّعون وقت رمضان بالحسابات
- 🌙 **خصصوا ميزانية للصدقة** — ما تضغط على المصاريف الأخرى

## كيف Diviso يخلي رمضانك أسهل؟

- ✅ مجموعة خاصة لرمضان
- ✅ تصنيف المصاريف (إفطار/هدايا/صدقة)
- ✅ متابعة لحظية — الكل يشوف
- ✅ تسوية سهلة بعد العيد
- ✅ تقرير شامل لمصاريف الشهر

## الخلاصة

رمضان شهر العبادة والكرم، مو شهر القلق المالي. مع التنظيم الصح وتطبيق Diviso، استمتع بالشهر الكريم وخلِّ التطبيق يحسب.

**سجل في Diviso مجاناً** واستعد لرمضان!
    `,
    contentEn: `
## Ramadan = Lots of Group Expenses

Ramadan is the month of generosity and gatherings. But group expenses pile up fast: iftars, dinner invitations, gifts, and shared charity.

## Types of Group Expenses in Ramadan

### 1. Restaurant Iftars
Friends gather for iftar every day or two. The bill accumulates!

### 2. Home Dinner Invitations
Everyone hosts once. But expenses aren't equal — a seafood dinner isn't a simple one.

### 3. Gifts and Celebrations
Children's celebration preparations, Eid gifts — need coordination.

### 4. Group Charity
Feeding fasting people, Ramadan food baskets — the group contributes together.

### 5. Eid Preparations
Clothes, sweets, decorations — some are shared.

## How to Organize Ramadan Expenses

### Week Before Ramadan
1. Create a "Ramadan" group in Diviso
2. Add all friends
3. Agree on approximate budget
4. Set dinner hosting schedule

### During Ramadan
1. Log every expense immediately
2. Categorize (iftar, gifts, charity)
3. Review balances weekly
4. Do interim settlements

### After Eid
1. Review total expenses
2. Final settlements
3. Plan for next Ramadan

## Golden Tips for an Economical Ramadan

- 🌙 **Set a cap** for eating out
- 🌙 **Take turns** hosting — one person per day
- 🌙 **Buy in bulk** — much cheaper
- 🌙 **Use Diviso** — don't waste Ramadan time on calculations
- 🌙 **Allocate charity budget** — so it doesn't pressure other expenses

## How Diviso Makes Your Ramadan Easier

- ✅ Dedicated Ramadan group
- ✅ Expense categorization (iftar/gifts/charity)
- ✅ Real-time tracking — everyone sees
- ✅ Easy settlement after Eid
- ✅ Comprehensive monthly expense report

## Conclusion

Ramadan is a month of worship and generosity, not financial stress. With proper organization and Diviso, enjoy the holy month and let the app calculate.

**Sign up for Diviso free** and get ready for Ramadan!
    `
  },
  // ===== NEW SEO-TARGETED ENGLISH ARTICLES =====
  {
    slug: "how-to-split-expenses-with-friends",
    title: "كيف تقسم المصاريف مع أصدقائك بعدالة",
    titleEn: "How to Split Expenses with Friends — The Complete Guide",
    description: "دليل شامل لتقسيم المصاريف بين الأصدقاء بدون مشاكل",
    descriptionEn: "Learn proven methods to split expenses with friends fairly. From dinners to trips, here's how to avoid awkwardness and keep friendships strong.",
    keywords: ["تقسيم مصاريف", "مصاريف الأصدقاء", "تقسيم الحساب"],
    keywordsEn: ["how to split expenses with friends", "split expenses fairly", "expense sharing tips", "divide costs with friends", "fair expense splitting methods", "share bills with friends app"],
    category: "guides",
    readTime: 10,
    publishDate: "2026-03-13",
    content: `
## مقدمة

تقسيم المصاريف مع الأصدقاء مهم للحفاظ على العلاقات. إليك أفضل الطرق.

## طرق التقسيم

### 1. التقسيم المتساوي
الطريقة الأسهل — قسّم على الجميع بالتساوي.

### 2. حسب الاستهلاك
كل شخص يدفع ما استهلكه بالضبط.

### 3. استخدم تطبيق ذكي
Diviso يحسب تلقائياً ويتابع الأرصدة.

## الخلاصة

استخدم Diviso لتقسيم المصاريف بسهولة وبدون إحراج.
    `,
    contentEn: `
## Introduction

Splitting expenses with friends is one of those things that sounds simple but can quickly become complicated — and even damage relationships if handled poorly. Whether you're sharing a dinner bill, splitting costs on a group vacation, or managing ongoing expenses with roommates, having a clear system makes all the difference.

This guide covers everything you need to know about splitting expenses fairly, avoiding common pitfalls, and using the right tools to make the process painless.

## Why Splitting Expenses Gets Awkward

Money is emotional. Even among close friends, conversations about who owes what can feel uncomfortable. Here are the most common reasons expense splitting goes wrong:

- **Unequal spending**: One person orders the expensive dish, another just has a salad
- **The "I'll pay you back" trap**: Verbal promises that are forgotten
- **Mental math errors**: Manual calculations that don't add up
- **Tracking fatigue**: Losing track of who paid for what over multiple days
- **Avoidance**: Nobody wants to be "that person" who brings up money

## 5 Proven Methods to Split Expenses Fairly

### 1. Equal Split
The simplest approach: divide the total equally. This works best when everyone's spending is roughly similar — like splitting a pizza or a shared Uber.

**Best for**: Group dinners with similar orders, shared transportation, group activity tickets.

### 2. Pay for What You Ordered
Each person pays exactly what they consumed. This is the fairest method when spending varies significantly.

**Best for**: Restaurant meals with different price points, trips where some people do more expensive activities.

### 3. Rotating Payment
Take turns paying for the group. Over time, it evens out — and it's the simplest to execute in the moment.

**Best for**: Regular friend groups that meet weekly, recurring coffee runs, lunch groups.

### 4. Proportional Split
Split based on income or ability to pay. This is common among friend groups with different financial situations.

**Best for**: Mixed-income friend groups, couples with salary differences.

### 5. Use an Expense Splitting App
The modern solution: everyone logs expenses in an app, and the app calculates who owes whom. No mental math, no forgotten payments, no awkwardness.

**Best for**: Any group that wants transparency and accuracy. Especially useful for trips and ongoing shared expenses.

## How Diviso Makes Expense Splitting Effortless

[Diviso](/split-expenses) is designed specifically for group expense management. Here's how it works:

1. **Create a group** — Add your friends by name, phone, or invite link
2. **Log expenses as they happen** — "Ahmed paid $120 for dinner" takes 5 seconds to add
3. **See real-time balances** — Everyone knows exactly who owes what at any moment
4. **Settle up with minimal transfers** — Diviso's algorithm minimizes the number of payments needed

Unlike spreadsheets or group chats, Diviso gives everyone visibility and removes the burden of tracking from any single person.

## Common Mistakes to Avoid

- **Don't wait until the end**: Track expenses as they happen, not from memory later
- **Don't assume equal is always fair**: Different people have different consumption — use the right method
- **Don't rely on memory**: Use an app or at least a shared note
- **Don't avoid the conversation**: The longer you wait, the more awkward it gets
- **Don't over-complicate it**: Sometimes an equal split is good enough

## Tips for Different Scenarios

### Group Trips
Create a dedicated trip group in Diviso. Assign one person per major expense (hotel, car rental, restaurants) and log everything in real-time. At the end of the trip, settle up with one round of transfers.

### Roommates
Set up recurring expenses for rent and utilities. Log shared groceries and household items as they happen. Review balances monthly.

### Regular Friend Meetups
Use a persistent group that carries balances forward. Over time, the rotating payments and shared expenses balance out naturally.

## Conclusion

The key to splitting expenses without awkwardness is transparency and consistency. Pick a method that works for your group, use a tool like [Diviso](/split-expenses) to track everything, and settle up regularly.

**[Try Diviso free](/auth?mode=signup)** — split your next expense in under 30 seconds.
    `
  },
  {
    slug: "best-apps-to-split-bills",
    title: "أفضل تطبيقات تقسيم الفاتورة",
    titleEn: "Best Apps to Split Bills in 2026 — Honest Comparison",
    description: "مقارنة شاملة بين أفضل تطبيقات تقسيم الفواتير",
    descriptionEn: "We compared the top bill splitting apps of 2026 — features, pricing, and user experience. Here's which one actually works best.",
    keywords: ["تطبيقات تقسيم الفاتورة", "أفضل تطبيق تقسيم"],
    keywordsEn: ["best apps to split bills", "bill splitting app comparison", "best expense splitting app 2026", "splitwise vs diviso", "top bill splitter apps", "free bill splitting app"],
    category: "comparisons",
    readTime: 12,
    publishDate: "2026-03-13",
    content: `
## مقدمة

مقارنة بين أفضل تطبيقات تقسيم الفواتير المتاحة.

## التطبيقات

### 1. Diviso
تطبيق مجاني وسريع لتقسيم المصاريف مع دعم عملات متعددة.

### 2. Splitwise
تطبيق شهير لكن بعض الميزات خلف الدفع.

## الخلاصة

Diviso يقدم أفضل تجربة مجانية لتقسيم الفواتير.
    `,
    contentEn: `
## Introduction

Looking for the best app to split bills with friends? With dozens of options on the market, it's hard to know which one actually delivers. We tested the most popular bill splitting apps in 2026 and compared them on features, ease of use, pricing, and overall experience.

Here's what we found.

## What Makes a Great Bill Splitting App?

Before diving into specific apps, here's what matters most:

- **Speed of entry**: How fast can you log an expense?
- **Split flexibility**: Equal, custom, percentage — does it support your needs?
- **Group management**: Can you handle multiple groups easily?
- **Multi-currency**: Essential for international travel
- **Settlement tracking**: Does it show who owes whom clearly?
- **Free vs. paid**: Which features require a subscription?

## The Top Bill Splitting Apps of 2026

### 1. Diviso — Best Overall
**Rating: 4.8/5**

[Diviso](/split-expenses) stands out with its clean design, fast expense entry, and genuinely free core experience. It handles unlimited groups and expenses without a paywall, supports multiple currencies, and offers smart settlement optimization.

**Pros:**
- ✅ Free unlimited groups and expenses
- ✅ Multi-currency support included free
- ✅ Clean, modern interface
- ✅ Real-time balance updates
- ✅ Smart settlement minimization

**Cons:**
- ❌ Newer app — smaller user base than Splitwise
- ❌ No native app yet (PWA works great though)

**Best for**: Anyone who wants a fast, free, and feature-rich splitting experience.

### 2. Splitwise
**Rating: 4.2/5**

The pioneer of expense splitting. Splitwise has a large user base and solid functionality, but many essential features now require a Pro subscription ($4.99/month).

**Pros:**
- ✅ Large user base
- ✅ Available on iOS (App Store) and web — Android coming soon
- ✅ Good group management

**Cons:**
- ❌ Itemized splits require Pro
- ❌ Multi-currency requires Pro
- ❌ Interface feels dated
- ❌ Ads in free version

**Best for**: Users already invested in the Splitwise ecosystem.

### 3. Tricount
**Rating: 4.0/5**

A simple option for basic expense splitting. Good for occasional use but lacks advanced features.

**Pros:**
- ✅ Very simple interface
- ✅ Works offline

**Cons:**
- ❌ Limited customization
- ❌ No smart settlements
- ❌ Basic reporting

**Best for**: Occasional, simple splits with small groups.

### 4. Settle Up
**Rating: 3.8/5**

Open-source expense sharing app with decent features but less polish.

**Pros:**
- ✅ Open source
- ✅ Multi-currency support

**Cons:**
- ❌ Dated interface
- ❌ Fewer users
- ❌ Slower development

**Best for**: Users who prioritize open-source software.

## Feature Comparison Table

| Feature | Diviso | Splitwise | Tricount | Settle Up |
|---------|--------|-----------|----------|-----------|
| Free unlimited groups | ✅ | ✅ | ✅ | ✅ |
| Free multi-currency | ✅ | ❌ (Pro) | ✅ | ✅ |
| Smart settlements | ✅ | ✅ | ❌ | ✅ |
| Expense categories | ✅ | ❌ (Pro) | ❌ | ✅ |
| Receipt scanning | ✅ | ❌ (Pro) | ❌ | ❌ |
| Clean modern UI | ✅ | ❌ | ✅ | ❌ |
| Real-time sync | ✅ | ✅ | ✅ | ✅ |
| No ads | ✅ | ❌ | ✅ | ✅ |

## Our Verdict

For most users, **[Diviso](/split-expenses)** offers the best balance of features, usability, and value. It does everything Splitwise does — and more — without charging for essential features. If you're starting fresh or considering switching from another app, Diviso is the clear choice in 2026.

**[Try Diviso free](/auth?mode=signup)** — no credit card required.
    `
  },
  {
    slug: "how-to-track-group-expenses",
    title: "كيف تتبع مصاريف المجموعة بسهولة",
    titleEn: "How to Track Group Expenses Easily — Step-by-Step Guide",
    description: "دليل خطوة بخطوة لتتبع المصاريف الجماعية",
    descriptionEn: "Tracking group expenses doesn't have to be complicated. Learn the step-by-step process to manage shared costs with any group — friends, roommates, or travel buddies.",
    keywords: ["تتبع مصاريف المجموعة", "مصاريف مشتركة"],
    keywordsEn: ["how to track group expenses", "group expense tracker", "track shared expenses", "manage group costs", "group money management", "shared expense tracking app"],
    category: "guides",
    readTime: 9,
    publishDate: "2026-03-13",
    content: `
## مقدمة

تتبع مصاريف المجموعة لا يجب أن يكون معقداً. إليك الطريقة.

## الخطوات

1. أنشئ مجموعة في Diviso
2. أضف المصاريف فوراً
3. راجع الأرصدة بانتظام
4. سوّي الحسابات

## الخلاصة

Diviso يجعل تتبع المصاريف سهلاً وشفافاً.
    `,
    contentEn: `
## Introduction

Whether you're managing a group trip budget, splitting household expenses with roommates, or tracking costs for a sports team — group expense tracking is a universal need. And while it should be simple, most people either avoid it entirely or cobble together a messy spreadsheet that nobody updates.

This guide shows you exactly how to track group expenses effectively using modern tools.

## Why Group Expense Tracking Matters

Without proper tracking:

- **Money gets lost**: Small expenses add up and are easily forgotten
- **People overpay**: The most generous person ends up subsidizing the group
- **Conflicts arise**: "I thought you paid for that" conversations ruin relationships
- **Settling up is chaos**: End-of-trip settlements become guesswork

## The 5-Step System for Tracking Group Expenses

### Step 1: Choose Your Tool
Forget spreadsheets. Use a purpose-built app like [Diviso](/group-expense-tracker) that everyone in the group can access. Key requirements:

- Everyone can add expenses (not just one person)
- Real-time balance visibility
- Support for different split types
- Works on all devices

### Step 2: Create Your Group
Set up a group with all members. In Diviso, this takes about 30 seconds:

1. Open the app
2. Tap "Create Group"
3. Name it (e.g., "Bali Trip 2026" or "Apartment 4B")
4. Invite members via link or phone

### Step 3: Log Expenses as They Happen
This is the critical habit. Every time someone pays for something shared, log it immediately. Don't save it for later — you'll forget details.

In Diviso:
- Tap the "+" button
- Enter amount and description
- Select who paid and who benefits
- Done in under 10 seconds

### Step 4: Review Balances Regularly
Check group balances at natural checkpoints:

- **Trips**: At the end of each day
- **Roommates**: At the end of each week or month
- **Events**: Before the event ends

This catches any missing expenses early.

### Step 5: Settle Up Efficiently
When it's time to settle, use the app's smart settlement feature. Instead of everyone paying everyone, the algorithm calculates the minimum number of transfers needed.

Example: In a group of 5, instead of 10 possible transfers, Diviso might reduce it to just 3.

## Best Practices for Group Expense Tracking

- **Designate a "tracker champion"**: One person who reminds others to log expenses
- **Use categories**: Tag expenses (food, transport, accommodation) for better visibility
- **Set spending expectations early**: Agree on budget ranges before the trip or month
- **Settle regularly**: Don't let balances build up for months
- **Take photos of receipts**: Helpful for large purchases and disputes

## Common Group Expense Tracking Mistakes

1. **Waiting to log expenses**: Memory fades fast — log immediately
2. **One person doing all the tracking**: This creates resentment
3. **Ignoring small expenses**: They add up significantly
4. **Not using categories**: You lose insight into spending patterns
5. **Avoiding settlement conversations**: The longer you wait, the harder it gets

## How Diviso Makes Group Tracking Simple

[Diviso](/group-expense-tracker) is built specifically for group expense management:

- **Instant expense logging** — 5-second entries from your phone
- **Real-time balances** — Everyone sees who owes what, always
- **Smart settlements** — Minimum transfers to settle all debts
- **Multi-currency** — Perfect for international groups
- **Expense categories** — See where the money goes

## Conclusion

Group expense tracking doesn't have to be a chore. With the right tool and a simple system, you can keep finances transparent, avoid conflicts, and settle up with minimal friction.

**[Start tracking with Diviso](/auth?mode=signup)** — it's free and takes 30 seconds to set up.
    `
  },
  {
    slug: "best-splitwise-alternatives",
    title: "أفضل بدائل Splitwise",
    titleEn: "Best Splitwise Alternatives in 2026 — Free & Paid Options",
    description: "أفضل البدائل لتطبيق Splitwise مع مقارنة شاملة",
    descriptionEn: "Looking for Splitwise alternatives? We compared the best options — free and paid — to help you find the right expense splitting app for your needs.",
    keywords: ["بدائل Splitwise", "بديل سبليتوايز"],
    keywordsEn: ["best splitwise alternatives", "splitwise alternative free", "apps like splitwise", "splitwise competitor", "splitwise replacement 2026", "better than splitwise"],
    category: "comparisons",
    readTime: 11,
    publishDate: "2026-03-13",
    content: `
## مقدمة

Splitwise تطبيق شهير لكن هناك بدائل أفضل. إليك المقارنة.

## أفضل البدائل

### 1. Diviso
بديل مجاني مع ميزات أكثر وتجربة أنظف.

## الخلاصة

Diviso هو أفضل بديل لـ Splitwise في 2026.
    `,
    contentEn: `
## Introduction

Splitwise has been the go-to expense splitting app for years, and for good reason — it popularized the concept of group expense tracking. But as the app has matured, users increasingly cite frustrations: essential features locked behind a $4.99/month paywall, a cluttered interface, and slow performance.

If you've been thinking about switching, you're not alone. Here are the best Splitwise alternatives in 2026.

## Why People Switch from Splitwise

The most common reasons users look for alternatives:

- **Paywall creep**: Features like itemized splits, multi-currency, and expense search now require Splitwise Pro
- **Interface clutter**: The UI hasn't been modernized and feels overwhelming
- **Ad experience**: Free users see ads that disrupt the experience
- **Performance**: The app can feel sluggish, especially with many groups
- **Limited customization**: Split types and categories are restricted in the free tier

## The Best Splitwise Alternatives

### 1. Diviso — Best Overall Alternative
**Why switch**: Everything Splitwise does, but free, faster, and cleaner.

[Diviso](/splitwise-alternative) was built by people who loved the concept of Splitwise but wanted a better execution. Here's what makes it stand out:

- **Free multi-currency support** — Splitwise charges for this
- **Free expense categories** — Organize spending without paying
- **Modern, clean interface** — Designed for speed and clarity
- **Smart settlement optimization** — Fewer transfers to settle up
- **No disruptive ads** — Clean experience throughout
- **Real-time syncing** — Everyone sees updates instantly

**Price**: Free (optional premium for power features)
**Best for**: Anyone who wants a full-featured expense splitter without a subscription.

### 2. Tricount
**Why consider**: Ultra-simple interface for basic needs.

Tricount strips expense splitting down to the basics. If you only need occasional, simple splits, it gets the job done.

- Simple UI with minimal learning curve
- Works offline
- Limited customization and features

**Price**: Free with optional Pro
**Best for**: Very casual users who split expenses rarely.

### 3. Settle Up
**Why consider**: Open-source and privacy-focused.

Settle Up is an open-source alternative that appeals to privacy-conscious users.

- Open-source codebase
- Multi-currency support
- Dated interface and slower updates

**Price**: Free
**Best for**: Users who prioritize open-source software.

### 4. Tab
**Why consider**: Quick restaurant bill splitting.

Tab focuses specifically on splitting restaurant bills by scanning receipts and assigning items.

- Receipt scanning
- Item-level assignment
- Limited to restaurant scenarios

**Price**: Free
**Best for**: Only splitting restaurant checks.

## Comparison: Diviso vs. Splitwise

| Feature | Diviso | Splitwise Free | Splitwise Pro ($4.99/mo) |
|---------|--------|----------------|--------------------------|
| Unlimited groups | ✅ | ✅ | ✅ |
| Multi-currency | ✅ Free | ❌ | ✅ |
| Expense categories | ✅ Free | ❌ | ✅ |
| Smart settlements | ✅ | ✅ | ✅ |
| Ad-free | ✅ | ❌ | ✅ |
| Expense search | ✅ Free | ❌ | ✅ |
| Modern UI | ✅ | ❌ | ❌ |
| Receipt photos | ✅ | ❌ | ✅ |

## How to Switch from Splitwise to Diviso

Making the switch is straightforward:

1. **[Sign up for Diviso](/auth?mode=signup)** — Free, takes 30 seconds
2. **Create your groups** — Recreate your active Splitwise groups
3. **Invite members** — Send invite links to your group members
4. **Start logging** — Begin tracking new expenses in Diviso
5. **Settle old Splitwise balances** — Clear your Splitwise history separately

## Conclusion

Splitwise deserves credit for pioneering the expense-splitting category, but in 2026, better options exist. [Diviso](/splitwise-alternative) offers a more modern, faster, and genuinely free alternative that doesn't gate essential features behind a subscription.

**[Try Diviso free](/auth?mode=signup)** — the best Splitwise alternative for 2026.
    `
  },
  {
    slug: "how-to-split-travel-expenses",
    title: "كيف تقسم مصاريف السفر بدون إحراج",
    titleEn: "How to Split Travel Expenses Without Awkwardness",
    description: "دليل لتقسيم مصاريف السفر الجماعي بدون مشاكل",
    descriptionEn: "Group trips are amazing — until it's time to settle expenses. Here's how to split travel costs fairly, avoid conflicts, and keep the good vibes going.",
    keywords: ["تقسيم مصاريف السفر", "سفر جماعي"],
    keywordsEn: ["how to split travel expenses", "split travel costs", "group trip expense splitting", "travel expense tracker", "divide travel costs with friends", "vacation expense splitting app"],
    category: "guides",
    readTime: 10,
    publishDate: "2026-03-13",
    content: `
## مقدمة

مصاريف السفر الجماعي تحتاج تنظيم. إليك الطريقة المثالية.

## النصائح

1. اتفقوا على الميزانية مسبقاً
2. سجّلوا كل مصروف فوراً
3. استخدموا Diviso للتتبع

## الخلاصة

Diviso يجعل تقسيم مصاريف السفر سهلاً ومريحاً.
    `,
    contentEn: `
## Introduction

Group travel is one of life's greatest joys — new places, shared experiences, and memories that last forever. But there's one thing that can sour even the best trip: money. Specifically, the messy, awkward, often-avoided process of splitting travel expenses.

This guide will show you exactly how to handle travel expenses so the only thing you remember about the trip is the adventure.

## Why Travel Expense Splitting Goes Wrong

Travel expenses are uniquely challenging because:

- **Expenses pile up fast**: Flights, hotels, meals, activities, taxis, tips, souvenirs
- **Different people pay for different things**: One person books the hotel, another pays for dinners
- **Currencies change**: International trips add exchange rate complexity
- **Not everyone participates in everything**: Some skip activities, some leave early
- **Nobody wants to be the accountant**: Tracking expenses feels like a chore

## The Pre-Trip Setup (5 Minutes That Save Hours)

### 1. Set Expectations
Before the trip, have a quick group conversation about:
- Rough budget range per person
- What's shared vs. personal
- How you'll split (equally? by consumption?)
- When you'll settle up

### 2. Create a Trip Group
Open [Diviso](/travel-expense-splitter) and create a group for the trip. Add all travelers. This takes 30 seconds and saves hours of post-trip accounting.

### 3. Assign Roles
Designate who's booking what:
- Person A: Hotels
- Person B: Car rental
- Person C: Activity tickets
- Everyone: Meals

This prevents duplicate bookings and ensures all major expenses are covered.

## During the Trip: The 10-Second Rule

Every time someone pays for something shared, log it in Diviso within 10 seconds. This is the single most important habit:

1. Open the app
2. Enter amount and description
3. Select who's included
4. Done

At the end of each day, do a quick check: "Did we log everything today?" This catches any missed expenses while the memory is fresh.

## Handling Common Travel Expense Scenarios

### Scenario 1: Different Hotel Rooms
Person A has a single room ($150/night), Persons B and C share a double ($100/night).

**Solution**: Log each room separately. A's expense is personal. B and C split their room equally.

### Scenario 2: Group Dinners with Different Orders
Everyone eats at the same restaurant but orders at different price points.

**Solution**: Either split equally (if the difference is small) or log per-person amounts. In Diviso, you can assign custom amounts to each participant.

### Scenario 3: Some People Skip an Activity
4 out of 6 people go snorkeling ($50/person).

**Solution**: When logging, only include the 4 people who participated.

### Scenario 4: International Currency
Your trip spans multiple countries with different currencies.

**Solution**: Log expenses in the local currency. [Diviso](/travel-expense-splitter) handles conversion automatically with up-to-date exchange rates.

### Scenario 5: Tips and Small Cash Expenses
Taxis, tips, market purchases — all cash.

**Solution**: Log them immediately via phone. Even $5 expenses add up over a week-long trip.

## The Post-Trip Settlement

At the end of the trip:

1. **Review all expenses** — Check the timeline in Diviso for completeness
2. **Verify balances** — Everyone should confirm their balance looks right
3. **Use smart settlements** — Diviso calculates the minimum transfers needed
4. **Transfer the money** — Bank transfer, Venmo, whatever works for your group
5. **Mark as settled** — Close the balances in the app

This process takes 10 minutes instead of the usual hours of spreadsheet wrangling.

## Pro Tips from Experienced Group Travelers

- 🎒 **Log immediately**: The 10-second rule prevents 90% of expense tracking problems
- 💱 **Don't convert manually**: Let the app handle exchange rates
- 🧾 **Photo receipts**: For big expenses, snap a photo as backup
- 📊 **Review daily**: A 2-minute daily check catches everything
- 🤝 **Be generous**: Don't nickel-and-dime on small amounts — it's not worth the friction
- 📱 **Everyone uses the app**: Make sure all group members have access

## Why Diviso Is the Best Travel Expense Splitter

[Diviso](/travel-expense-splitter) was designed with group travel in mind:

- **Multi-currency support** — Log expenses in any currency
- **Offline mode** — Works without WiFi
- **Smart settlements** — Minimum transfers to settle all debts
- **Trip timeline** — See every expense chronologically
- **Category tracking** — Breakdown by flights, hotels, food, activities
- **Real-time syncing** — Everyone sees expenses as they're added

## Conclusion

Splitting travel expenses doesn't have to be awkward or stressful. With the right preparation, a simple logging habit, and a good app, you can handle the money side of group travel in minutes instead of hours.

**[Try Diviso for your next trip](/auth?mode=signup)** — it's free and takes 30 seconds to set up.
    `
  },
];

export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category: string): BlogArticle[] => {
  return blogArticles.filter(article => article.category === category);
};
