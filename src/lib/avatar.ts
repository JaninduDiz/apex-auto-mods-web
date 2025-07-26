export const DEFAULT_AVATAR_URL = "/user-profile.png";

/**
 * Get the avatar URL with fallback to default
 * @param avatarUrl - The user's avatar URL
 * @returns The avatar URL or default if not provided
 */
export function getAvatarUrl(avatarUrl?: string | null): string {
  return avatarUrl || DEFAULT_AVATAR_URL;
}
