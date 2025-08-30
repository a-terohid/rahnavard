import { LogsActions } from "@/types/enums/generalEnums";
import { LogsFilter_interfasce } from "@/types/StatesTypes";

// Type guard: checks if the sort value is valid
export const isValidSort = (val: string | null): val is LogsFilter_interfasce["sort"] =>
  val === "sort" || val === "desc" || val === "asc";



// Type guard: checks if the action value is valid
 export const isValidAction = (val: string | null): val is LogsFilter_interfasce["action"] =>
    val === "action" || val === "all" || Object.values(LogsActions).includes(val as LogsActions);