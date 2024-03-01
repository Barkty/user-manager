export const OPEN_ROUTES = [
    { method: "GET", path: "/" },
    { method: "GET", path: "/api"},
    { method: "POST", path: "/api/worker"},
    { method: "POST", path: "/api/auth/signin"},
]

export const RESOURCE_ERROR_MESSAGE = (resource) => `Error fetching ${resource}. Please try again later.`