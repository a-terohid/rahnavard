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