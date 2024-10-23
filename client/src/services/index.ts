
/**
 * An object containing the API endpoints for the e-commerce application.
 * 
 * @constant
 * @type {Object}
 * @property {string} LOGIN - The endpoint for user login.
 * @property {string} REGISTER - The endpoint for user registration.
 * @property {string} PRODUCTS - The endpoint for fetching products.
 */
export const API_URL = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PRODUCTS: "/products",
    USER_SESSION: "/auth/me",
};
