import { UserRole } from "./enums/generalEnums";

/**
 * Interface for input component props
 */
export interface inputComponent_input {
    changeHandler: Function;       // Handler function for input changes
    value: string | number;        // Current value of the input
    label: string;                 // Label text for the input
    type: string;                  // Input type (e.g., text, number, email)
    name: string;                  // Name attribute for the input
    placeholder: string;           // Placeholder text inside the input
    textarea: boolean;             // If true, input is rendered as a textarea
    error?: string;                // Optional error message for validation
    style?: string;                // Optional CSS class or style string
}


export interface resetpassword_props {
    email: string;                 // User's email address
    token: string;                 // Password reset token
    error: string;                 // Error message, if any
    expire: string;                // Expiration time for the reset token
}


/**
 * Interface for dashboard layout properties
 */
export interface DashboardLoyout_prop {
    children: React.ReactNode;     // Nested child components or elements
    fullName: string;              // Full name of the current user
    role: UserRole;                // Role of the current user
}

/**
 * Interface for image modal component props
 */
export interface ImageModalProps_interface {
    show: boolean;                   // Whether the modal is visible
    title?: string;                  // Optional modal title text
    imagePriview?: string;           // URL of the preview image
    image?: File | null;             // Original image file object
    setImage?: (file: File | null) => void;       // Setter for image file
    setImagePreview?: (previewUrl: string | null) => void; // Setter for preview URL
    setShow?: (value: boolean) => void;           // Setter to show/hide modal
}


/**
 * Interface for password reset date info
 */
export interface resetDate_interface {
    userEmail: string;             // Email of the user requesting reset
    token: string;                 // Reset token string
    expire: string;                // Token expiration time
}