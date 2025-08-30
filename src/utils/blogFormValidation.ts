import { ERROR } from "@/types/enums/MessageUnum";

/**
 * Validates a blog form and updates an errors object.
 *
 * @param data - Form input data containing at least `title` and `description`.
 * @param DATA_Error - Object holding the initial error messages for each field.
 * @returns Updated errors object with validation results.
 */

export const BlogFormValidation = (data: any, DATA_Error: any): any => {

    // Initialize errors object with existing error messages
    const errors = {
        title: DATA_Error?.title,
        description: DATA_Error?.description,
    };

    // Validate title: required field
    if (!data.title) {
        errors.title = ERROR.REQUIRED_FIELD;
    } else {
        errors.title = "";
    }

    // Validate description: required field
    if (!data.description) {
        errors.description = ERROR.REQUIRED_FIELD;
    } else {
        errors.description = "";
    }
};

/**
 * Validates a blog form and returns a direct response indicating if it's valid.
 *
 * @param data - Form input data containing at least `title` and `description`.
 * @returns An object with:
 *   - `isValid`: Boolean indicating overall form validity.
 *   - `response`: Error message if validation fails, otherwise an empty string.
 */

export const BlogFormValidationResponse = ( data: any ): { isValid: boolean; response: string } => {
    let isValid = true;
    let response = "";

    // Check title: must not be empty
    if (!data.title) {
        response = "title field must be filled.";
        isValid = false;
        return { isValid, response };
    }

    // Check description: must not be empty
    if (!data.description) {
        response = "description field must be filled.";
        isValid = false;
        return { isValid, response };
    }

    return { isValid, response };
};