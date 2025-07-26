export const DEFAULT_AVATAR_URL =
  "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";

/**
 * Get the avatar URL with fallback to default
 * @param avatarUrl - The user's avatar URL
 * @returns The avatar URL or default if not provided
 */
export function getAvatarUrl(avatarUrl?: string | null): string {
  return avatarUrl || DEFAULT_AVATAR_URL;
}
