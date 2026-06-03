# خطة إعادة بناء نظام Action Menu / FAB

## الهدف
استبدال منطق `getFabActions` المبعثر داخل `BottomNav` بنظام **Actions Registry** مركزي، مع `AppLayout` موحد يمنع تكرار `BottomNav`، ودعم Drawer على الموبايل / Popover على الديسكتوب — بدون تغيير منطق أعمال الصفحات أو الهوية البصرية.

---

## 1) طبقة المنطق المركزية — `src/actions/`

### `types.ts`
```ts
export type ActionIntent = 'navigate' | 'modal' | 'rpc';
export type ActionContextKey = 'dashboard' | 'my-groups' | 'group-details'
  | 'expenses' | 'plans' | 'plan-details' | 'default';

export interface ActionGuard {
  id: string;
  check: (ctx: ActionRuntimeContext) => boolean | Promise<boolean>;
}

export interface ActionDescriptor {
  id: string;                    // 'add_expense', 'create_group'...
  labelKey: string;              // i18n key in common.fab.*
  icon: LucideIcon;
  intent: ActionIntent;
  target: string | ((ctx) => string); // route or modal id
  guards?: ActionGuard[];
  visibleWhen?: (ctx) => boolean;
  analytics?: { event: string };
}

export interface ActionRuntimeContext {
  pathname: string;
  params: Record<string,string>;
  user?: { id: string } | null;
}
```

### `registry.ts`
- Singleton `Map<string, ActionDescriptor>` مع `registerAction()` و `getAction(id)` و `getActions(ids[])`.
- يُملأ عند تحميل ملفات الـ contexts.

### `contexts/dashboardActions.ts`, `groupActions.ts`, `expensesActions.ts`, `plansActions.ts`
- كل ملف يستدعي `registerAction({...})` لتسجيل أكشناته (add_expense, create_group, create_plan, settlement, invite_member, join_by_link…).

### `guards.ts`
- `requireAuth`, `requireGroupMember`, `requireQuota` — حالياً نوعّن البنية فقط ونمرر `() => true` كوظائف placeholder لربطها لاحقاً بـ `useAuthGate`/`useQuotaHandler` دون تغيير المنطق.

---

## 2) طبقة العرض — `src/components/actions/`

### `ActionMenuProvider.tsx`
- React Context يحمل: `currentActions: ActionDescriptor[]`, `setActions(ids)`, `open/close`, `isOpen`.
- يوفّر hook: `useRegisterPageActions(contextKey, ids[])` — يستدعي `setActions` في `useEffect` وينظّف عند unmount → fallback إلى default.

### `FloatingActionMenu.tsx`
- يقرأ من Context.
- موبايل (`useIsMobile`): يفتح `Drawer` من الأسفل (نفس شكل الـ Drawer الحالي داخل BottomNav).
- ديسكتوب: `Popover` مرتبط بزر `+` على الـ BottomNav أو بزر عائم زاوية اليمين-السفلى مع نفس الستايل.

### `QuickActionsPanel.tsx`
- مكوّن إنلاين (Card grid أو List) يستهلك نفس Registry — يحلّ محل `QuickActions/SimpleQuickActions/MinimalQuickActions`.
- variants: `grid` (لـ QuickActions), `list` (لـ SimpleQuickActions), `inline` (لـ MinimalQuickActions).

### `ActionItem.tsx`
- صف موحّد (icon + label) يستخدم في الـ Drawer والـ Popover والـ Panel.

---

## 3) Layout موحّد — `src/layouts/AppLayout.tsx`
```tsx
<ActionMenuProvider>
  <Outlet />
  <BottomNav />            {/* بدون أي منطق fab */}
  <FloatingActionMenu />   {/* يدير الـ Drawer/Popover */}
  <Toaster />
</ActionMenuProvider>
```
- يُلفّ به في `App.tsx` كل المسارات المخصّصة للمستخدم المسجل.
- يمنع تكرار `BottomNav` لأن الصفحات لن تستورده.

---

## 4) تنظيف `BottomNav.tsx`
- إزالة `getFabActions`, `fabActions.map`, `Drawer`, `drawerOpen`.
- يبقى فقط: tab bar (Home/Groups) + زر `+` يستدعي `useActionMenu().toggle()`.
- لا يستورد أي action route مباشرة.

---

## 5) إزالة BottomNav المكرر من الصفحات
سأبحث وأزيل `<BottomNav />` و `import BottomNav` من كل الصفحات (~25). القائمة المتوقعة:
Dashboard, OptimizedDashboard, MyGroups, GroupSettings, CreateGroup, AddExpense, MyExpenses, BalanceDrilldown, Plans, CreatePlan, PlanDetails, TripPlanner, DiceDecisionPage, ReferralCenter, CreditStore, Pricing, PricingProtected, Settings, Notifications, MyTickets, Changelog, FinancialPlan, FoundingProgram, Onboarding (إن وُجد), Welcome.
- الصفحات العامة (LandingPage, Blog, FAQ…) ستبقى خارج `AppLayout` كما هي.

---

## 6) تسجيل الأكشنات داخل الصفحات
في أعلى كل صفحة رئيسية:
```ts
useRegisterPageActions('dashboard', ['add_expense','create_group','create_plan']);
useRegisterPageActions('my-groups', ['create_group','join_by_link','create_plan']);
useRegisterPageActions('group-details', ['add_expense','settlement','invite_member']);
useRegisterPageActions('expenses', ['add_expense']);
useRegisterPageActions('plans', ['create_plan']);
useRegisterPageActions('plan-details', ['add_expense','invite_member']);
```
الصفحات بدون تسجيل ترث الـ default: `['add_expense','create_group','create_plan']`.

---

## 7) z-index Tokens في `index.css`
```css
:root {
  --z-bottomnav: 40;
  --z-fam-trigger: 45;
  --z-drawer-overlay: 50;
  --z-drawer-content: 55;
  --z-dialog: 60;
  --z-popover-in-dialog: 70;
  --z-toast: 80;
}
```
- استبدال `z-50` داخل `BottomNav`, `drawer.tsx` بالـ tokens.

---

## 8) توحيد QuickActions
- `QuickActions.tsx` → wrapper حول `<QuickActionsPanel variant="grid" ids={[...]} />`.
- `SimpleQuickActions.tsx` → `variant="list"`.
- `MinimalQuickActions.tsx` → `variant="inline" ids={['add_expense','create_group']}`.
- نُبقي الملفات القديمة كـ re-export للتوافق الخلفي حتى لا نكسر الاستيرادات الحالية.

---

## القيود
- لا تغيير على الـ UI/الهوية البصرية.
- لا تغيير على routes أو منطق business في الصفحات.
- نفس i18n keys (`common.fab.*`).

---

## النتيجة المتوقعة بعد التنفيذ (تقرير سيُرفق)
1. قائمة الملفات الجديدة (10 ملفات تقريباً).
2. قائمة الصفحات التي أُزيلت منها `BottomNav` المكررة.
3. جدول الأكشنات النهائي لكل context.
4. تأكيد عدم وجود أخطاء build.

هل أبدأ التنفيذ؟
