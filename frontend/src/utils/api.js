export const API_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:8000";

export const apiUrl = (path) => {
  if (typeof path !== "string") {
    return path;
  }
  return path.startsWith("http") ? path : `${API_ORIGIN}${path}`;
};
