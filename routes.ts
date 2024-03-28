/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/login"];

/**
 * The default redirect path after user logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/:timetableId";
