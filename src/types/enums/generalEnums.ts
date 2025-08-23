export enum UserRole {
    CLIENT = "Client",                // Regular client or customer
    ADMIN = "Admin",                  // Administrator with full permissions
    OWNER = "Owner",                  // Property owner
    ALL = "all"                      // Represents all roles
}

/**
 * Enum representing types of actions logged in the system
 */
export enum LogsActions  {
    NEW_REGISTER = 'new user registered',                    // New user registration
    NEW_REGISTER_GOOGLE = 'new google user registered',      // New user registered via Google
}
