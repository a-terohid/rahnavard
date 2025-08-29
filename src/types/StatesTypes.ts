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


/**
 * Interface representing login form data
 */
export interface loginData_interface {
    email: string;               // User's email address
    password: string;            // User's password
}

/**
 * Interface representing validation errors for login form
 */
export interface loginDataError_interface {
    email_error: string;         // Error message for the email field
    password_error: string;      // Error message for the password field
}


/**
 * Interface representing data for forgot password request
 */
export interface forgotPassword_interface {
    email: string;               // Email address to send reset instructions
}

/**
 * Interface representing validation errors for forgot password form
 */
export interface forgotPasswordError_interface {
    email_error: string;         // Error message for the email field
}

/**
 * Interface representing data for setting a new password
 */
export interface setPassword_interface {
    password: string;            // New password
    confirmPassword: string;     // Confirmation of the new password
}

/**
 * Interface representing validation errors for setting password
 */
export interface setPasswordError_interface {
    password_error: string;           // Error message for the password field
    confirmPassword_error: string;    // Error message for the confirm password field
}


/**
 * Interface representing editable user profile data
 */
export interface editProfile_interface {
    name: string;                // User's first name
    last_name: string;           // User's last name
    phone_number: string;        // User's phone number
}

/**
 * Interface representing validation errors for editing user profile
 */
export interface editProfileError_interface {
    name_error: string;              // Error message for the name field
    last_name_error: string;         // Error message for the last name field
    phone_number_error: string;      // Error message for the phone number field
}