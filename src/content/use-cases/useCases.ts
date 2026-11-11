import { Plane, Home, Users, PartyPopper, Mountain, HandCoins } from 'lucide-react';

export interface UseCaseStep {
  title: string;
  description: string;
}

export interface UseCaseFAQ {
  question: string;
  answer: string;
}

export interface UseCase {
  slug: string;
  title: string;
  titleEn: string;
  question: string;
  questionEn: string;
  intro: string;
  introEn: string;
  problems: string[];
  problemsEn: string[];
  solutions: string[];
  solutionsEn: string[];
  steps: UseCaseStep[];
  stepsEn: UseCaseStep[];
  faqs: UseCaseFAQ[];
  faqsEn: UseCaseFAQ[];
  keywords: string[];
  keywordsEn: string[];
  icon: string;
}

export const useCases: UseCase[] = [
  {
    slug: 'travel',
    icon: 'Plane',
    title: 'مصاريف السفر مع الأصدقاء',
    titleEn: 'Travel Expenses with Friends',
    question: 'كيف تقسم مصاريف السفر بين الأصدقاء بدون إحراج؟',
    questionEn: 'How to split travel expenses between friends without awkwardness?',
    intro: 'Diviso يساعد على تقسيم مصاريف السفر تلقائيًا بين المسافرين. يُستخدم لتتبع من دفع ماذا ومعرفة المبالغ المستحقة لكل شخص.',
    introEn: 'Diviso helps automatically split travel expenses between travelers. It is used to track who paid what and know the amounts owed to each person.',
    problems: [
      'تعدد الدافعين خلال الرحلة',
      'نسيان المصاريف الصغيرة',
      'صعوبة حساب المبالغ النهائية',
      'خلافات بعد انتهاء الرحلة'
    ],
    problemsEn: [
      'Multiple payers during the trip',
      'Forgetting small expenses',
      'Difficulty calculating final amounts',
      'Disputes after the trip ends'
    ],
    solutions: [
      'إضافة المصروف فور حدوثه',
      'تقسيم تلقائي بين جميع المسافرين',
      'معرفة الرصيد لكل شخص بوضوح',
      'تسوية سهلة في نهاية الرحلة'
    ],
    solutionsEn: [
      'Add expenses as they happen',
      'Automatic split between all travelers',
      'Know each person\'s balance clearly',
      'Easy settlement at trip end'
    ],
    steps: [
      { title: 'أنشئ مجموعة', description: 'أنشئ مجموعة جديدة باسم رحلتك' },
      { title: 'أضف الأعضاء', description: 'أضف جميع المسافرين للمجموعة' },
      { title: 'سجل المصروف', description: 'سجل كل مصروف مع تحديد من دفع' },
      { title: 'شاهد النتيجة', description: 'تعرف على من يدين لمن' }
    ],
    stepsEn: [
      { title: 'Create a group', description: 'Create a new group with your trip name' },
      { title: 'Add members', description: 'Add all travelers to the group' },
      { title: 'Record expense', description: 'Record each expense with who paid' },
      { title: 'See the result', description: 'Know who owes whom' }
    ],
    faqs: [
      { question: 'ماذا لو دفع شخص واحد كل المصاريف؟', answer: 'سيظهر الرصيد المستحق له من كل عضو تلقائيًا.' },
      { question: 'ما أفضل طريقة لتقسيم تكاليف الرحلة الجماعية؟', answer: 'أفضل طريقة هي استخدام تطبيق يسجل كل مصروف فور حدوثه ويقسمه تلقائياً بين المسافرين. Diviso يتيح لكل شخص إضافة المصاريف ويحسب الفرق بدقة.' },
      { question: 'كيف نعرف مين دفع أكثر في الرحلة؟', answer: 'كل مصروف يُسجّل مع اسم الدافع تلقائياً. التطبيق يعرض رصيد كل شخص: كم له وكم عليه، ومين يحوّل لمين.' },
      { question: 'هل في تطبيق يحسب مصاريف السفر تلقائياً؟', answer: 'نعم، Diviso يحسب مصاريف السفر تلقائياً. تضيف المصروف ويقسمه التطبيق بين الأعضاء ويعرض من يدين لمن.' },
      { question: 'كيف نتجنب الخلافات المالية بعد السفر؟', answer: 'سجّل كل مصروف أثناء الرحلة بدلاً من الانتظار للنهاية. السجل الواضح يمنع النسيان والخلافات.' }
    ],
    faqsEn: [
      { question: 'What if one person paid all expenses?', answer: 'The amount owed to them from each member will be shown automatically.' },
      { question: 'What is the best way to split group trip costs?', answer: 'The best way is to use an app that records each expense as it happens and splits it automatically. Diviso lets everyone add expenses and calculates the difference accurately.' },
      { question: 'How do we know who paid more on the trip?', answer: 'Each expense is recorded with the payer\'s name automatically. The app shows each person\'s balance: what they are owed, what they owe, and who pays whom.' },
      { question: 'Is there an app that calculates travel expenses automatically?', answer: 'Yes, Diviso calculates travel expenses automatically. Add the expense and the app splits it between members and shows who owes whom.' },
      { question: 'How to avoid financial disputes after traveling?', answer: 'Record each expense during the trip instead of waiting until the end. The clear record prevents forgetting and disputes.' }
    ],
    keywords: ['تقسيم مصاريف السفر', 'مصاريف الرحلات', 'حساب تكاليف السفر', 'تقسيم فاتورة السفر', 'كيف نقسم مصاريف السفر', 'تطبيق مصاريف السفر'],
    keywordsEn: ['split travel expenses', 'trip expenses', 'travel cost calculator', 'travel bill splitting', 'how to split travel costs', 'travel expense app']
  },
  {
    slug: 'shared-housing',
    icon: 'Home',
    title: 'مصاريف السكن المشترك',
    titleEn: 'Shared Housing Expenses',
    question: 'كيف تنظم مصاريف السكن المشترك بين الشركاء؟',
    questionEn: 'How to organize shared housing expenses between roommates?',
    intro: 'Diviso يُستخدم لتنظيم مصاريف السكن المشترك شهريًا. يساعد على تتبع الإيجار والفواتير والمشتريات المشتركة بين الشركاء.',
    introEn: 'Diviso is used to organize shared housing expenses monthly. It helps track rent, bills, and shared purchases between roommates.',
    problems: [
      'نسيان من دفع فاتورة الكهرباء',
      'خلط المصاريف الشخصية بالمشتركة',
      'صعوبة تتبع المشتريات المنزلية',
      'عدم وضوح من يدين لمن'
    ],
    problemsEn: [
      'Forgetting who paid the electricity bill',
      'Mixing personal and shared expenses',
      'Difficulty tracking household purchases',
      'Unclear who owes whom'
    ],
    solutions: [
      'تقسيم بالتساوي أو بالنسبة',
      'أرصدة واضحة: كم لك وكم عليك',
      'تسوية دورية سهلة'
    ],
    solutionsEn: [
      'Split equally or by percentage',
      'Clear balances: what you\'re owed and what you owe',
      'Easy periodic settlement'
    ],
    steps: [
      { title: 'أنشئ مجموعة السكن', description: 'أنشئ مجموعة لشركاء السكن' },
      { title: 'أضف شركاءك', description: 'أضف جميع ساكني الشقة' },
      { title: 'سجل المصاريف', description: 'سجل الإيجار والفواتير والمشتريات' },
      { title: 'تابع الرصيد', description: 'اعرف رصيد كل شخص نهاية الشهر' }
    ],
    stepsEn: [
      { title: 'Create housing group', description: 'Create a group for roommates' },
      { title: 'Add roommates', description: 'Add all apartment residents' },
      { title: 'Record expenses', description: 'Record rent, bills, and purchases' },
      { title: 'Track balance', description: 'Know each person\'s balance at month end' }
    ],
    faqs: [
      { question: 'هل يمكن تقسيم الإيجار بنسب مختلفة؟', answer: 'نعم، يمكنك تحديد نسبة مخصصة لكل عضو حسب حجم الغرفة.' },
      { question: 'هل يمكن استثناء عضو من مصروف معين؟', answer: 'نعم، عند إضافة المصروف اختر الأعضاء المشاركين فقط.' },
      { question: 'كيف نحسب فواتير الكهرباء والماء بين الساكنين؟', answer: 'أضف فاتورة الكهرباء أو الماء كمصروف وحدد طريقة التقسيم. يمكنك تقسيمها بالتساوي أو بالنسبة.' },
      { question: 'ما الحل لو أحد الساكنين ما يدفع؟', answer: 'السجل الواضح في Diviso يُظهر المبالغ المستحقة بدقة.' },
      { question: 'هل يوجد تطبيق لإدارة مصاريف الشقة؟', answer: 'Diviso مصمم لإدارة مصاريف السكن المشترك. يتتبع الإيجار والفواتير والمشتريات ويحسب حصة كل ساكن تلقائياً.' },
      { question: 'كيف نضمن العدالة في المصاريف المشتركة؟', answer: 'تسجيل المصاريف أول بأول والتقسيم التلقائي يضمن العدالة. كل شخص يشوف ما دفعه وما عليه بوضوح تام.' }
    ],
    faqsEn: [
      { question: 'Can rent be split in different ratios?', answer: 'Yes, you can set a custom ratio for each member based on room size.' },
      { question: 'Can I exclude a member from a specific expense?', answer: 'Yes, when adding the expense, choose only participating members.' },
      { question: 'How to calculate electricity and water bills between roommates?', answer: 'Add the electricity or water bill as an expense and choose the split method. You can split equally or by percentage.' },
      { question: 'What if one of the roommates doesn\'t pay?', answer: 'The clear record in Diviso shows amounts owed accurately.' },
      { question: 'Is there an app to manage apartment expenses?', answer: 'Diviso is designed to manage shared housing expenses. It tracks rent, bills, and purchases and calculates each roommate\'s share automatically.' },
      { question: 'How to ensure fairness in shared expenses?', answer: 'Recording expenses as they happen and automatic splitting ensures fairness. Everyone sees clearly what they paid and what they owe.' }
    ],
    keywords: ['مصاريف السكن المشترك', 'تقسيم الإيجار', 'شركاء السكن', 'فواتير الشقة', 'تطبيق مصاريف الشقة', 'حساب فواتير السكن'],
    keywordsEn: ['shared housing expenses', 'split rent', 'roommate expenses', 'apartment bills', 'apartment expense app', 'housing bills calculator']
  },
  {
    slug: 'friends-expenses',
    icon: 'Users',
    title: 'مصاريف الطلعات والمطاعم',
    titleEn: 'Friends Outings & Restaurant Bills',
    question: 'كيف تقسم فاتورة المطعم بين الأصدقاء بسهولة؟',
    questionEn: 'How to easily split restaurant bills between friends?',
    intro: 'Diviso يُستخدم لتقسيم فواتير المطاعم والطلعات مع الأصدقاء. يساعد على تجنب الإحراج وحساب المبالغ بدقة.',
    introEn: 'Diviso is used to split restaurant bills and outings with friends. It helps avoid awkwardness and calculate amounts accurately.',
    problems: [
      'إحراج طلب المال من الأصدقاء',
      'نسيان من دفع المرة السابقة',
      'صعوبة تقسيم الفاتورة حسب الطلبات',
      'تراكم الديون الصغيرة'
    ],
    problemsEn: [
      'Awkwardness asking friends for money',
      'Forgetting who paid last time',
      'Difficulty splitting bill by orders',
      'Accumulation of small debts'
    ],
    solutions: [
      'تسجيل سريع للفاتورة',
      'تقسيم بالتساوي أو بالنسبة',
      'سجل واضح لكل الطلعات',
      'تسجيل الدفع وتأكيد الاستلام'
    ],
    solutionsEn: [
      'Quick bill recording',
      'Split equally or by percentage',
      'Clear record of all outings',
      'Record a payment and confirm receipt'
    ],
    steps: [
      { title: 'أنشئ مجموعة الشلة', description: 'أنشئ مجموعة لأصدقائك المقربين' },
      { title: 'أضف الأصدقاء', description: 'أضف أصدقاءك للمجموعة' },
      { title: 'سجل الفاتورة', description: 'سجل فاتورة المطعم فور الدفع' },
      { title: 'اعرف الرصيد', description: 'تعرف على من يدين لك ومن تدين له' }
    ],
    stepsEn: [
      { title: 'Create friend group', description: 'Create a group for your close friends' },
      { title: 'Add friends', description: 'Add your friends to the group' },
      { title: 'Record the bill', description: 'Record the restaurant bill after payment' },
      { title: 'Know the balance', description: 'Know who owes you and who you owe' }
    ],
    faqs: [
      { question: 'كيف أتعامل مع من لم يأكل؟', answer: 'استثنِه من المصروف عند الإضافة.' },
      { question: 'هل لازم واحد يدفع والباقي يحول؟', answer: 'لا، يمكن لأي شخص دفع أي مصروف وتسجيله في Diviso. التطبيق يحسب الفرق ويُظهر من يدين لمن في النهاية.' },
      { question: 'ما أفضل طريقة لتقسيم مصاريف الطلعة؟', answer: 'سجّل كل فاتورة فور الدفع مع تحديد الدافع. التطبيق يحسب التقسيم تلقائياً ويُظهر المبلغ المستحق من كل شخص.' },
      { question: 'كيف نعرف مين عليه كم بعد الطلعة؟', answer: 'شاشة الرصيد في Diviso تعرض بوضوح من يدين لمن وكم المبلغ.' },
      { question: 'كيف نقسم الحساب بدون إحراج؟', answer: 'Diviso يتولى الحساب تلقائياً. لا حاجة لطلب الفلوس شخصياً، كل شخص يشوف رصيده.' }
    ],
    faqsEn: [
      { question: 'How to handle someone who didn\'t eat?', answer: 'Exclude them from the expense when adding.' },
      { question: 'Does one person have to pay and others transfer?', answer: 'No, anyone can pay any expense and record it in Diviso. The app calculates the difference and shows who owes whom in the end.' },
      { question: 'What is the best way to split outing expenses?', answer: 'Record each bill immediately after payment with the payer specified. The app calculates the split automatically and shows how much each person owes.' },
      { question: 'How do we know who owes how much after the outing?', answer: 'The balance screen in Diviso clearly shows who owes whom and how much.' },
      { question: 'How to split the bill without embarrassment?', answer: 'Diviso handles the calculation automatically. No need to ask for money personally, everyone sees their balance.' }
    ],
    keywords: ['تقسيم فاتورة المطعم', 'مصاريف الطلعات', 'حساب الشلة', 'تقسيم الحساب', 'كيف نقسم الحساب', 'تطبيق تقسيم الفاتورة'],
    keywordsEn: ['split restaurant bill', 'outing expenses', 'friend group expenses', 'bill splitting', 'how to split bill', 'bill splitting app']
  },
  {
    slug: 'events',
    icon: 'PartyPopper',
    title: 'تقسيم تكاليف الفعاليات',
    titleEn: 'Event Costs Splitting',
    question: 'كيف تقسم تكاليف حفلة أو فعالية بين المنظمين؟',
    questionEn: 'How to split party or event costs between organizers?',
    intro: 'Diviso يُستخدم لتنظيم تكاليف الفعاليات والحفلات. يساعد المنظمين على تتبع المصاريف وتقسيمها بعدالة.',
    introEn: 'Diviso is used to organize event and party costs. It helps organizers track expenses and split them fairly.',
    problems: [
      'تعدد بنود المصاريف',
      'اختلاف مساهمات المنظمين',
      'صعوبة تتبع المشتريات',
      'نسيان تفاصيل المصاريف'
    ],
    problemsEn: [
      'Multiple expense items',
      'Different organizer contributions',
      'Difficulty tracking purchases',
      'Forgetting expense details'
    ],
    solutions: [
      'تتبع مساهمة كل منظم',
      'حساب تلقائي للمبالغ',
      'سجل كامل للفعالية'
    ],
    solutionsEn: [
      'Track each organizer\'s contribution',
      'Automatic amount calculation',
      'Complete event record'
    ],
    steps: [
      { title: 'أنشئ مجموعة الفعالية', description: 'أنشئ مجموعة باسم الفعالية' },
      { title: 'أضف المنظمين', description: 'أضف جميع المساهمين في التنظيم' },
      { title: 'سجل التكاليف', description: 'سجل كل مصروف مع تحديد من دفع' },
      { title: 'راجع الحساب النهائي', description: 'اعرف حصة كل منظم بعد الفعالية' }
    ],
    stepsEn: [
      { title: 'Create event group', description: 'Create a group with the event name' },
      { title: 'Add organizers', description: 'Add all contributors to organizing' },
      { title: 'Record costs', description: 'Record each expense with who paid' },
      { title: 'Review final account', description: 'Know each organizer\'s share after the event' }
    ],
    faqs: [
      { question: 'هل يمكن تحديد حصص مختلفة للمنظمين؟', answer: 'نعم، يمكنك تعيين نسب مخصصة لكل عضو.' },
      { question: 'ما أفضل حل لإدارة مصاريف الأنشطة الجماعية؟', answer: 'استخدم مجموعة مشتركة في Diviso لكل نشاط.' },
      { question: 'كيف نتابع المصاريف في مجموعة كبيرة؟', answer: 'كل مصروف يُسجّل مع الدافع والمشاركين، والتطبيق يتتبع كل شيء تلقائياً.' },
      { question: 'هل في طريقة سهلة لتقسيم التكاليف؟', answer: 'نعم، أضف المصروف واختر التقسيم بالتساوي أو بنسب مخصصة. التطبيق يحسب حصة كل شخص.' },
      { question: 'كيف نغلق الحسابات بدون نقاشات؟', answer: 'السجل الكامل للمصاريف يُظهر كل التفاصيل بوضوح، وكل شخص يشوف ما دفعه وما عليه.' }
    ],
    faqsEn: [
      { question: 'Can organizers have different shares?', answer: 'Yes, you can assign custom ratios to each member.' },
      { question: 'What is the best solution for managing group activity expenses?', answer: 'Use a shared group in Diviso for each activity.' },
      { question: 'How to track expenses in a large group?', answer: 'Each expense is recorded with the payer and participants, and the app tracks everything automatically.' },
      { question: 'Is there an easy way to split costs?', answer: 'Yes, add the expense and choose equal split or custom ratios. The app calculates each person\'s share.' },
      { question: 'How to close accounts without arguments?', answer: 'The complete expense record shows all details clearly, and everyone sees what they paid and what they owe.' }
    ],
    keywords: ['تقسيم تكاليف الفعاليات', 'مصاريف الحفلات', 'تنظيم الفعاليات', 'ميزانية الفعالية', 'إدارة مصاريف الأنشطة', 'تقسيم التكاليف'],
    keywordsEn: ['event cost splitting', 'party expenses', 'event organizing', 'event budget', 'activity expense management', 'cost splitting']
  },
  {
    slug: 'group-trips',
    icon: 'Mountain',
    title: 'رحلات المجموعات والكشتات',
    titleEn: 'Group Trips & Camping',
    question: 'كيف تنظم ميزانية الكشتة أو رحلة المجموعة؟',
    questionEn: 'How to organize camping or group trip budget?',
    intro: 'Diviso يُستخدم لتنظيم ميزانية الكشتات ورحلات المجموعات. يساعد على تقسيم تكاليف المعدات والطعام والنقل بعدالة.',
    introEn: 'Diviso is used to organize camping and group trip budgets. It helps fairly split equipment, food, and transportation costs.',
    problems: [
      'تكاليف متنوعة (معدات، طعام، وقود)',
      'أعداد كبيرة من المشاركين',
      'مصاريف قبل وأثناء الرحلة',
      'صعوبة التسوية النهائية'
    ],
    problemsEn: [
      'Various costs (equipment, food, fuel)',
      'Large number of participants',
      'Expenses before and during the trip',
      'Difficulty with final settlement'
    ],
    solutions: [
      'تتبع المصاريف من البداية',
      'تسوية واضحة وعادلة'
    ],
    solutionsEn: [
      'Track expenses from the start',
      'Clear and fair settlement'
    ],
    steps: [
      { title: 'أنشئ مجموعة الكشتة', description: 'أنشئ مجموعة لرحلتك القادمة' },
      { title: 'أضف المشاركين', description: 'أضف جميع المشاركين في الرحلة' },
      { title: 'سجل كل المصاريف', description: 'سجل المعدات والطعام والوقود' },
      { title: 'اعرف الحساب النهائي', description: 'تعرف على المبالغ المستحقة لكل شخص' }
    ],
    stepsEn: [
      { title: 'Create camping group', description: 'Create a group for your upcoming trip' },
      { title: 'Add participants', description: 'Add all trip participants' },
      { title: 'Record all expenses', description: 'Record equipment, food, and fuel' },
      { title: 'Know the final account', description: 'Know amounts owed to each person' }
    ],
    faqs: [
      { question: 'ماذا لو لم يشارك البعض في نشاط معين؟', answer: 'استثنِهم من ذلك المصروف فقط.' },
      { question: 'كيف أتعامل مع من جلب معداته الخاصة؟', answer: 'لا تدرجه في مصاريف المعدات المشتركة.' }
    ],
    faqsEn: [
      { question: 'What if some don\'t participate in a specific activity?', answer: 'Exclude them from that expense only.' },
      { question: 'How to handle someone who brought their own equipment?', answer: 'Don\'t include them in shared equipment expenses.' }
    ],
    keywords: ['ميزانية الكشتة', 'مصاريف الرحلات الجماعية', 'تقسيم تكاليف الرحلة', 'حساب الكشتة'],
    keywordsEn: ['camping budget', 'group trip expenses', 'trip cost splitting', 'camping expenses']
  },
  {
    slug: 'awkward-money-situations',
    icon: 'HandCoins',
    title: 'التعامل مع مواقف الفلوس المحرجة',
    titleEn: 'Handling Awkward Money Situations',
    question: 'كيف تطلب فلوسك من صديقك بدون ما تخرب العلاقة؟',
    questionEn: 'How to ask your friend for money back without ruining the relationship?',
    intro: 'Diviso يحل مشكلة طلب الفلوس من الأصدقاء عن طريق نظام تلقائي يُظهر من يدين لمن بدون ما تحتاج تطلب بنفسك. كل شخص يشوف رصيده بوضوح في التطبيق.',
    introEn: 'Diviso solves the problem of asking friends for money through an automatic system that shows who owes whom without needing to ask directly. Everyone sees their balance clearly in the app.',
    problems: [
      'إحراج طلب الفلوس مباشرة من صديق',
      'نسيان المبالغ الصغيرة المتراكمة',
      'تأثير الديون على العلاقات الشخصية',
      'عدم وجود إثبات واضح للمصاريف',
      'الخوف من إفساد الصداقة بسبب المال'
    ],
    problemsEn: [
      'Awkwardness of directly asking a friend for money',
      'Forgetting small accumulated amounts',
      'Impact of debts on personal relationships',
      'No clear proof of expenses',
      'Fear of ruining friendship over money'
    ],
    solutions: [
      'التطبيق يُظهر الرصيد تلقائياً لكل شخص',
      'سجل واضح ومفصل لكل المصاريف',
      'لا حاجة لطلب المال شخصياً'
    ],
    solutionsEn: [
      'App shows balance automatically to everyone',
      'Clear and detailed record of all expenses',
      'No need to ask for money personally'
    ],
    steps: [
      { title: 'أنشئ مجموعة مشتركة', description: 'أنشئ مجموعة تضم أصدقائك أو زملائك' },
      { title: 'سجل المصاريف', description: 'كل شخص يسجل المصاريف اللي دفعها' },
      { title: 'شاهد الأرصدة', description: 'التطبيق يحسب ويعرض من يدين لمن تلقائياً' },
      { title: 'سجّل الدفع', description: 'سجّل الدفعة والطرف الآخر يؤكد الاستلام' }
    ],
    stepsEn: [
      { title: 'Create a shared group', description: 'Create a group with your friends or colleagues' },
      { title: 'Record expenses', description: 'Everyone records the expenses they paid' },
      { title: 'View balances', description: 'App calculates and shows who owes whom automatically' },
      { title: 'Record payment', description: 'Record the payment and the other person confirms receipt' }
    ],
    faqs: [
      { question: 'ماذا لو رفض صديقي الدفع؟', answer: 'السجل الواضح للمصاريف يساعد على توضيح الموقف، ويمكنك التفاوض على تقسيط المبلغ.' },
      { question: 'هل يمكن تقسيم المبلغ على دفعات؟', answer: 'نعم، يمكنك تسوية جزء من المبلغ وترك الباقي للوقت المناسب.' },
      { question: 'كيف أتجنب المواقف المحرجة من البداية؟', answer: 'استخدم Diviso من أول مصروف مشترك، والتطبيق يتولى الباقي تلقائياً.' }
    ],
    faqsEn: [
      { question: 'What if my friend refuses to pay?', answer: 'The clear expense record helps clarify the situation, and you can negotiate installment payments.' },
      { question: 'Can the amount be split into installments?', answer: 'Yes, you can settle part of the amount and leave the rest for later.' },
      { question: 'How to avoid awkward situations from the start?', answer: 'Use Diviso from the first shared expense, and the app handles the rest automatically.' }
    ],
    keywords: ['طلب الفلوس من صديق', 'مواقف الفلوس المحرجة', 'تجنب الإحراج مع الأصدقاء', 'تسوية الديون بين الأصدقاء', 'كيف أطلب فلوسي'],
    keywordsEn: ['asking friend for money', 'awkward money situations', 'avoiding money embarrassment', 'settling debts between friends', 'how to ask for money back']
  },
  {
    slug: 'existing-group-debts',
    icon: 'HandCoins',
    title: 'ديون قديمة بين الأصدقاء — كيف تبدأون صفحة جديدة',
    titleEn: 'Old Debts Between Friends — Starting Fresh',
    question: 'عندكم ديون قديمة بين الأصدقاء؟ كيف تسوّونها وتبدأون بحسابات واضحة؟',
    questionEn: 'Have old debts between friends? How to settle them and start with clear balances?',
    intro: 'اتفقوا على الديون القديمة بين الأصدقاء وسوّوها قبل ما تبدأون مجموعة جديدة. بعدها Diviso يوضح الأرصدة: كم لك وكم عليك، ومين يحوّل لمين، وكل دفعة تتسجل والمستلم يأكد استلامها.',
    introEn: 'Agree on old debts between friends and settle them before you start a new group. From then on, Diviso shows clear balances — how much you\'re owed, how much you owe, and who pays whom — and every payment is recorded and confirmed by the receiver.',
    problems: [
      'ديون متراكمة غير موثقة بين الأصدقاء',
      'نسيان المبالغ الحقيقية المستحقة',
      'خلافات بسبب عدم وجود سجل واضح',
      'صعوبة تتبع من يدين لمن بعد فترة طويلة',
      'إحراج عند محاولة تذكير الآخرين بديون قديمة'
    ],
    problemsEn: [
      'Undocumented accumulated debts between friends',
      'Forgetting the actual amounts owed',
      'Disputes due to lack of clear records',
      'Difficulty tracking who owes whom after a long time',
      'Awkwardness when reminding others of old debts'
    ],
    solutions: [
      'اتفقوا على الديون القديمة وسوّوها قبل بداية المجموعة',
      'أرصدة واضحة: كم لك وكم عليك، ومين يحوّل لمين',
      'تسجيل الدفع وتأكيد الاستلام',
      'كل مصروف جديد يتسجل مع مين دفع ومين يشارك فيه'
    ],
    solutionsEn: [
      'Agree on old debts and settle them before starting the group',
      'Clear balances: how much you\'re owed, how much you owe, and who pays whom',
      'Record a payment and confirm receipt',
      'Every new expense recorded with who paid and who shares it'
    ],
    steps: [
      { title: 'أنشئ المجموعة', description: 'أنشئ مجموعة وادعُ الأصدقاء برابط واحد' },
      { title: 'سوّوا الديون القديمة', description: 'اتفقوا على المبالغ القديمة وسدّدوها قبل ما تبدأون' },
      { title: 'سجّلوا المصاريف الجديدة', description: 'كل مصروف مع مين دفع ومين يشارك، والأرصدة توضح مين يحوّل لمين' },
      { title: 'ابدأ التسوية', description: 'سجّل الدفعات وأكّد الاستلام' }
    ],
    stepsEn: [
      { title: 'Create the group', description: 'Create a group and invite friends with one link' },
      { title: 'Settle old debts', description: 'Agree on the old amounts and pay them off before you start' },
      { title: 'Record new expenses', description: 'Add each expense with who paid and who shares it; balances show who pays whom' },
      { title: 'Start settling', description: 'Record payments and confirm receipt' }
    ],
    faqs: [
      { question: 'كيف نتعامل مع الديون القديمة قبل ما نبدأ؟', answer: 'اجلسوا واتفقوا على المبالغ، وسوّوها بالطريقة اللي تناسبكم قبل ما تبدأون المجموعة. بعدها كل مصروف جديد يتسجل في Diviso بوضوح.' },
      { question: 'كيف نعرف مين عليه كم بعد ما نبدأ؟', answer: 'الأرصدة في Diviso توضح كم لك وكم عليك، ومين يحوّل لمين.' },
      { question: 'كيف نتأكد إن الدفعة وصلت؟', answer: 'سجّل الدفع في Diviso، والمستلم يأكد الاستلام.' }
    ],
    faqsEn: [
      { question: 'How should we handle old debts before we start?', answer: 'Sit down, agree on the amounts, and settle them however suits you before starting the group. After that, every new expense is recorded clearly in Diviso.' },
      { question: 'How do we know who owes how much once we start?', answer: 'Balances in Diviso show how much you\'re owed, how much you owe, and who pays whom.' },
      { question: 'How do we confirm a payment was received?', answer: 'Record the payment in Diviso, and the receiver confirms receipt.' }
    ],
    keywords: ['ديون قديمة', 'تسوية الديون القديمة', 'ديون الأصدقاء', 'تسوية ديون الأصدقاء', 'مين يحوّل لمين', 'تسجيل الدفع'],
    keywordsEn: ['old debts', 'settle old debts', 'friend debts', 'settle debts between friends', 'who owes whom', 'record payment']
  }
];

export const getUseCaseBySlug = (slug: string): UseCase | undefined => {
  return useCases.find(uc => uc.slug === slug);
};

export const getOtherUseCases = (currentSlug: string): UseCase[] => {
  return useCases.filter(uc => uc.slug !== currentSlug);
};
