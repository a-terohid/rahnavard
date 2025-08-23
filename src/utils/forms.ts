import { 
    loginData_interface,
    loginDataError_interface,
    registerData_interface, 
    registerDataError_interface, 
} from '@/types/StatesTypes';
import { ERROR } from "@/types/enums/MessageUnum";

// Function to validate registration form data and return an object containing error messages.
export const RegisterFormsValidation = (
    data: registerData_interface, 
    date_error: registerDataError_interface
): registerDataError_interface => {

    // Destructuring input fields
    const { name, last_name, email, password, confirmPassword } = data;

    // Initializing an error object with previous errors
    let errors: registerDataError_interface = {
        name_error: date_error.name_error,
        last_name_error: date_error.last_name_error,
        email_error: date_error.email_error,
        password_error: date_error.password_error,
        confirmPassword_error: date_error.confirmPassword_error
    };

    // Name validation
    if (!name) {
        errors.name_error = ERROR.REQUIRED_FIELD;
    } else if (name.length < 3) {
        errors.name_error = ERROR.NAME_ATLEAST;
    } else {
        errors.name_error = "";
    }

    // Last name validation
    if (!last_name) {
        errors.last_name_error = ERROR.REQUIRED_FIELD;
    } else if (last_name.length < 3) {
        errors.last_name_error = ERROR.LASTNAME_ATLEAST;
    } else {
        errors.last_name_error = "";
    }

    // Email validation
    if (!email) {
        errors.email_error = ERROR.REQUIRED_FIELD;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email_error = ERROR.INVALID_DATA;
    } else {
        errors.email_error = "";
    }

    // Password validation
    if (!password) {
        errors.password_error = ERROR.REQUIRED_FIELD;
    } else if (password.length < 6) {
        errors.password_error = ERROR.PASSWORD_ATLEAST;
    } else {
        errors.password_error = "";
    }

    // Confirm password validation
    if (!confirmPassword) {
        errors.confirmPassword_error = ERROR.REQUIRED_FIELD;
    } else if (confirmPassword !== password) {
        errors.confirmPassword_error = ERROR.PASSWORD_DONT_MACH;
    } else {
        errors.confirmPassword_error = "";
    }

    return errors;
};



// Function to validate login form data and return an object containing error messages.
export const LoginFormsValidation = (
    data: loginData_interface , 
    date_error: loginDataError_interface
): loginDataError_interface => {

    // Destructuring input fields
    const { email, password } = data;

    // Initializing an error object with previous errors
    let errors: loginDataError_interface = {
        email_error: date_error.email_error,
        password_error: date_error.password_error,
    };

    // Email validation
    if (!email) {
        errors.email_error = ERROR.REQUIRED_FIELD;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email_error = ERROR.INVALID_DATA;
    } else {
        errors.email_error = "";
    }

    // Password validation
    if (!password) {
        errors.password_error = ERROR.REQUIRED_FIELD;
    } else if (password.length < 6) {
        errors.password_error = ERROR.PASSWORD_ATLEAST;
    } else {
        errors.password_error = "";
    }

    return errors;
};