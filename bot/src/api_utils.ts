import type { Route } from "@sapphire/plugin-api";

export function ensureAuth(request: Route.Request): boolean {
    if (!request.auth) {
        return false;
    }

    const secondsTillExpiry = request.auth.expires - Date.now();
    if (secondsTillExpiry < 0) {
        return false;
    }

    // Refresh the auth somehow

    return true;
}