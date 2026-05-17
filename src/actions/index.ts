// Side-effect imports — register all actions into the global registry.
import "./contexts/dashboardActions";
import "./contexts/groupActions";
import "./contexts/expensesActions";
import "./contexts/plansActions";
import "./contexts/extraActions";

export * from "./types";
export * from "./registry";
export * as guards from "./guards";
