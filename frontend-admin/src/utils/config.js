// API configuration for IZIMorocco Admin
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const MEDIA_URL = (type="image") => type==="image" ? import.meta.env.VITE_MEDIA_URL : import.meta.env.VITE_VIDEO_URL;
