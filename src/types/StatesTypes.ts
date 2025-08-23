/**
 * Interface representing data for user registration
 */
export interface registerData_interface {
    name: string;                // User's first name
    last_name: string;           // User's last name
    email: string;               // User's email address
    password: string;            // User's chosen password
    confirmPassword: string;     // Password confirmation for validation
}

/**
 * Interface representing validation errors for registration fields
 */
export interface registerDataError_interface {
    name_error: string;              // Error message for the name field
    last_name_error: string;         // Error message for the last name field
    email_error: string;             // Error message for the email field
    password_error: string;          // Error message for the password field
    confirmPassword_error: string;   // Error message for the confirm password field
}