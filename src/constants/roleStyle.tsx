import { UserRole } from "@/types/enums/generalEnums";

 export const roleStyles: Record<UserRole, { labelClass: string }> = {
    [UserRole.ADMIN]: {
      labelClass: 'bg-Secondary-200 text-Secondary-800',
    },

    [UserRole.OWNER]: {
      labelClass: ' bg-Success-200 text-Success-800',
    },
    [UserRole.CLIENT]: {
        labelClass: 'hidden', 
    },
    [UserRole.ALL]: {
        labelClass: 'hidden',
    },
  };