import { ReactNode } from "react";
import { UserRole } from "./enums/generalEnums";

/**
     * Interface representing a dashboard navigation item
 */

export interface DashboardItem_interface {
    name: string;              // Display name of the dashboard item
    href: string;              // URL or route path for the item
    accessibility: UserRole[]; // Array of user roles that can access this item
    icon: ReactNode;           // Icon component or element to represent the item visually
    children: DashboardItem_interface[]; // Nested child dashboard items (submenu)
}