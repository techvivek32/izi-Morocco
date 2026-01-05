import { MEDIA_URL } from "../../../utils/config";

// Helper to extract filename if MEDIA_URL prefixed
export const extractFilename = (url) => {
  if (typeof url !== "string") return url;
  if (!url.includes("/")) return url;

  // Handle Cloudinary URLs - extract the relative path after /upload/vXXXXXXXXXX/
  if (url.includes("cloudinary.com")) {
    const match = url.match(/\/upload\/v\d+\/(.+)$/);
    if (match) return match[1]; // Returns "uploads/d7uaynsnefuqb5zzqi4c"
  }

  // Handle MEDIA_URL prefixed paths
  if (url.includes(MEDIA_URL()) || url.includes(MEDIA_URL("video"))) {
    return url
      .replace(MEDIA_URL(), "")
      .replace(MEDIA_URL("video"), "")
      .replace(/^\//, "");
  }

  return url;
};
